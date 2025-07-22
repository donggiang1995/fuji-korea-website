#!/usr/bin/env tsx

import { AdminAuthService } from "../server/adminAuth";

async function setupAdmin() {
  try {
    console.log("Setting up admin user...");
    
    // Create default admin user
    const admin = await AdminAuthService.createAdminUser(
      "admin",
      "admin@fuji-global-korea.com",
      "admin123",
      "super_admin"
    );

    console.log("✓ Admin user created successfully:");
    console.log(`  Username: ${admin.username}`);
    console.log(`  Email: ${admin.email}`);
    console.log(`  Role: ${admin.role}`);
    console.log("\nDefault login credentials:");
    console.log("  Username: admin");
    console.log("  Password: admin123");
    console.log("\n⚠️  Please change the default password after first login!");
    
  } catch (error: any) {
    if (error.message?.includes('unique')) {
      console.log("❌ Admin user already exists!");
      console.log("Default login credentials:");
      console.log("  Username: admin");
      console.log("  Password: admin123");
    } else {
      console.error("❌ Failed to create admin user:", error.message);
    }
  }
}

setupAdmin();