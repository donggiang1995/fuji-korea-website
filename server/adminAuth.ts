import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { db } from "./db";
import { adminUsers, adminSessions } from "@shared/schema";
import { eq, gt } from "drizzle-orm";
import type { AdminUser, AdminSession } from "@shared/schema";

export class AdminAuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  // Verify password
  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  // Create admin user (for initial setup)
  static async createAdminUser(username: string, email: string, password: string, role: string = 'admin'): Promise<AdminUser> {
    const hashedPassword = await this.hashPassword(password);
    
    const [adminUser] = await db
      .insert(adminUsers)
      .values({
        username,
        email,
        password: hashedPassword,
        role,
      })
      .returning();

    return adminUser;
  }

  // Login admin user
  static async loginAdmin(username: string, password: string): Promise<{ admin: AdminUser; sessionId: string } | null> {
    // Find admin user
    const [admin] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, username));

    if (!admin) {
      return null;
    }

    // Verify password
    const isValidPassword = await this.verifyPassword(password, admin.password);
    if (!isValidPassword) {
      return null;
    }

    // Update last login
    await db
      .update(adminUsers)
      .set({ lastLogin: new Date() })
      .where(eq(adminUsers.id, admin.id));

    // Create session
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours

    await db
      .insert(adminSessions)
      .values({
        id: sessionId,
        userId: admin.id,
        expiresAt,
      });

    return { admin, sessionId };
  }

  // Validate session
  static async validateSession(sessionId: string): Promise<AdminUser | null> {
    const [session] = await db
      .select({
        session: adminSessions,
        admin: adminUsers,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminSessions.userId, adminUsers.id))
      .where(eq(adminSessions.id, sessionId));

    if (!session || session.session.expiresAt < new Date()) {
      return null;
    }

    return session.admin;
  }

  // Logout (delete session)
  static async logout(sessionId: string): Promise<void> {
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.id, sessionId));
  }

  // Cleanup expired sessions
  static async cleanupExpiredSessions(): Promise<void> {
    const now = new Date();
    await db
      .delete(adminSessions)
      .where(eq(adminSessions.expiresAt, now));
  }

  // Invalidate all sessions for a user (used when changing password)
  static async invalidateAllSessions(userId: number): Promise<boolean> {
    const result = await db
      .delete(adminSessions)
      .where(eq(adminSessions.userId, userId));

    return result.rowCount ? result.rowCount > 0 : false;
  }
}

// Middleware to check admin authentication
export async function requireAdminAuth(req: any, res: any, next: any) {
  const sessionId = req.headers.authorization?.replace('Bearer ', '') || req.cookies?.adminSession;

  if (!sessionId) {
    return res.status(401).json({ message: 'Admin authentication required' });
  }

  const admin = await AdminAuthService.validateSession(sessionId);
  if (!admin) {
    return res.status(401).json({ message: 'Invalid or expired session' });
  }

  req.admin = admin;
  next();
}