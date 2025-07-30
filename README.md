# 🏢 FUJI Global Korea - Corporate Website

## 🌟 Overview
Professional bilingual (Korean/English) corporate website for FUJI Global Korea, a leading elevator technology company. Built with modern web technologies and featuring comprehensive admin management system.

## ✨ Features
- **Bilingual Support**: Korean/English language switching
- **Product Catalog**: Interactive product showcase with detailed specifications
- **Serial Number Search**: Real-time elevator serial number lookup system
- **Admin Panel**: Complete content management system with authentication
- **Excel Integration**: Bulk import/export of serial numbers via Excel files
- **Responsive Design**: Mobile-first responsive design for all devices
- **Modern UI**: Glass morphism effects and industrial design language

## 🚀 Tech Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM (Development) / MySQL (Production)
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite
- **Deployment**: GitHub Actions → Spaceship Hosting

## 🔧 Quick Start for New Replit Account

### 1. Import Project
```bash
# Replit → Create → Import from GitHub
# Repository: https://github.com/username/fuji-korea-website
```

### 2. Setup Environment
Add to Replit Secrets:
```
DATABASE_URL=your-database-connection-string
```

### 3. Install & Run
```bash
npm install
npm run dev
```

### 4. Edit & Deploy
```bash
# Make your changes, then:
git add .
git commit -m "Update: describe your changes"
git push origin main
# Auto-deploys to production in 2-5 minutes!
```

## 📁 Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared types and database schemas
├── deploy/          # Deployment configurations
├── .github/         # GitHub Actions workflows
└── mysql-import-data.sql # Production database
```

## 🗄️ Database Schema
- **Products**: Elevator products with specifications
- **Serial Numbers**: Tracking system for installed elevators
- **Inquiries**: Customer contact form submissions
- **Admin Users**: Secure admin authentication

## 🔑 Admin Panel
- **URL**: `/admin`
- **Features**: Product management, serial tracking, customer inquiries
- **Security**: Bcrypt password hashing, secure sessions

## 🌐 Deployment Workflow
```
Edit in Replit → Push to GitHub → Auto-deploy → Live on Spaceship → GoDaddy Domain
```

## 📊 Sample Data Included
- 5 Elevator Products (FCA-9000, TM-800S, SCP-2024)
- 15 Serial Numbers for testing
- Admin account for management
- Customer inquiries examples

## 🛡️ Security Features
- Secure admin authentication
- Password change functionality with security codes
- SQL injection protection
- HTTPS SSL certificates
- Environment variable protection

## 📞 Support
For setup questions, refer to:
- `REPLIT-SETUP.md` - New Replit account setup
- `deploy/spaceship-environment.md` - Production hosting setup
- `github-sync-workflow.md` - GitHub workflow implementation

---

**Built by FUJI Global Korea Development Team**  
**Professional elevator technology solutions**