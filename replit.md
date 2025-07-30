# FUJI Global Korea - Corporate Website

## Overview

This is a bilingual (Korean/English) corporate website for FUJI Global Korea, an elevator technology company. The application is built as a modern full-stack web application using React for the frontend and Express.js for the backend, with a clean separation between client and server code.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (January 2025)

✓ Complete website redesign with modern industrial aesthetic
✓ Enhanced typography with stronger, more powerful fonts (Inter font family)
✓ Added search functionality for elevator serial numbers in header
✓ Modernized header with glass morphism effects and improved navigation
✓ Redesigned hero section with gradient backgrounds and tech patterns
✓ Enhanced footer with comprehensive company information and contact details
✓ About page completely restructured with detailed company information, technology showcase, and timeline
✓ Industrial design language with custom CSS components (glass-morphism, industrial-card, metric-display)
✓ Improved color scheme with professional blue, navy, orange, and steel gray palette
✓ Added comprehensive company metrics and achievement displays
✓ Enhanced responsive design for all device sizes
✓ **Database Integration (January 22, 2025)**: Implemented PostgreSQL database with Drizzle ORM
  - Created database schema for products, inquiries, and serial numbers tables
  - Migrated from memory storage to database storage layer
  - Added sample elevator product data (FCA-9000 Series, TM-800S Traction Machine, SCP-2024 Control Panel)
  - Implemented proper database relations between products and serial numbers
  - Database connection configured with Neon serverless PostgreSQL
✓ **Serial Number Search Feature (January 22, 2025)**: Fully functional search system
  - Real-time serial number lookup with PostgreSQL database integration
  - Detailed search result dialog with product information, specifications, and status
  - Search accessible from header on all pages with proper error handling
  - Sample serial numbers: FCA-9000-2024-001, TM-800-2024-001, SCP-2024-001
✓ **Enhanced UI with Complete Icons (January 22, 2025)**: Improved visual design
  - Added proper icons for all product categories (Cpu, Settings, Zap, Check icons)
  - Enhanced product cards with industrial design language
  - Fixed all LSP errors and accessibility warnings for production deployment
  - Improved loading states and error handling throughout the application
✓ **Production Deployment Ready (January 22, 2025)**: Resolved all deployment issues
  - Fixed environment variable configuration for production mode
  - Resolved database connection issues with WebSocket dependencies
  - Enhanced build process with proper static file serving
  - Tested production API endpoints successfully
  - Added proper dialog accessibility (DialogDescription) for screen readers
✓ **Image Management System (January 22, 2025)**: Centralized image configuration
  - Created `/client/src/config/images.ts` for easy image management
  - All website images now managed from single configuration file
  - Includes fallback system for failed image loads
  - Organized by sections: hero, features, gallery, products, awards
  - Easy to update images without searching through code files
✓ **Comprehensive Admin Panel System (January 22, 2025)**: Complete content management system
  - Full authentication system with bcrypt password hashing and secure sessions
  - Database schema with admin_users, admin_sessions tables for user management
  - Complete CRUD operations for products and serial numbers management
  - Admin dashboard with statistics overview and tabbed management interface
  - Product management: create, edit, delete with multilingual descriptions and specifications
  - Serial number tracking: status management, installation dates, location tracking
  - Customer inquiries viewing system with email integration
  - Secure cookie-based authentication with automatic session validation
  - Admin panel accessible at `/admin` with default credentials: admin/admin123
✓ **Excel Integration System (January 24, 2025)**: Advanced data management for serial numbers
  - Upload Excel files (.xlsx, .xls, .csv) for batch import of serial numbers
  - Online Excel sync capability with Google Sheets and OneDrive URLs
  - Export current data to Excel format with comprehensive formatting
  - Data validation and error reporting for import operations
  - Duplicate detection and conflict resolution during imports
✓ **Enhanced Security Features (January 24, 2025)**: Multi-layer security system
  - Change password functionality with security code protection (code: "1995")
  - Eye toggle for password visibility in change password dialog
  - Current password verification before allowing changes
  - Automatic session invalidation and logout after password change
  - Enhanced security validation with custom security code requirement
  - Removed default credentials display from admin login page for enhanced security
✓ **Complete GitHub Workflow Integration (January 30, 2025)**: Full CI/CD pipeline setup
  - GitHub Actions workflow for auto-deployment to Spaceship hosting
  - FTP-based deployment system with build optimization and timeout fixes
  - Replit integration allowing editing from any account via GitHub import
  - Production package configuration optimized for Spaceship hosting
  - Database migration scripts and environment configuration ready
  - Complete workflow: Replit → GitHub → Auto-deploy → Spaceship → GoDaddy domain
  - Professional development workflow enabling team collaboration and version control
  - Node.js app deployment successful, switching to Sitejet Builder for faster deployment

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Development**: tsx for TypeScript execution
- **Production Build**: esbuild for server bundling

### Project Structure
```
/
├── client/          # Frontend React application
├── server/          # Backend Express API
├── shared/          # Shared types and schemas
├── attached_assets/ # Static content files
└── migrations/      # Database migration files
```

## Key Components

### Database Schema (shared/schema.ts)
- **Products Table**: Stores elevator product information with multilingual descriptions
  - Fields: id, name, category (control/traction), model, image, specifications (JSON), features (JSON array), descriptionKo, descriptionEn
  - Supports both Korean and English descriptions with rich specification and feature data
- **Inquiries Table**: Customer contact form submissions
  - Fields: id, name, email, company, message, createdAt
- **Serial Numbers Table**: Tracks elevator serial numbers and their associated products
  - Fields: id, serialNumber, productId (foreign key), installationDate, location, status, createdAt
  - Enables serial number lookup functionality with product relationships

### Frontend Features
- **Internationalization**: Built-in Korean/English language switching
- **Product Catalog**: Tabbed interface showing control systems and traction machines
- **Contact Forms**: Customer inquiry submission with validation
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Component Library**: Comprehensive UI components from shadcn/ui

### Backend Services
- **Storage Interface**: Abstracted storage layer with memory and database implementations
- **API Routes**: RESTful endpoints (to be implemented in /api namespace)
- **Development Middleware**: Hot reload and error handling for development

## Data Flow

1. **Client Requests**: React components use React Query to fetch data
2. **API Layer**: Express.js routes handle HTTP requests under /api prefix
3. **Storage Layer**: Abstracted storage interface supports both memory and database backends
4. **Database**: PostgreSQL via Drizzle ORM with Neon serverless connection

## External Dependencies

### Core Technologies
- **React Ecosystem**: React, React Query, React Hook Form
- **UI Framework**: Radix UI primitives, Tailwind CSS
- **Database**: Neon PostgreSQL, Drizzle ORM
- **Development**: Vite, TypeScript, ESBuild

### Notable Integrations
- **Form Handling**: React Hook Form with Zod validation
- **Date Handling**: date-fns library
- **Icons**: Lucide React icons
- **Carousel**: Embla Carousel for image galleries

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx with nodemon-like restart capability
- **Database**: Drizzle push for schema synchronization

### Production Build
- **Frontend**: Vite build to dist/public
- **Backend**: esbuild bundle to dist/index.js
- **Database**: Drizzle migrations in ./migrations directory

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment flag for development/production behavior
- **REPL_ID**: Replit-specific deployment identifier

The application is designed to be deployed on platforms like Replit with automatic environment detection and appropriate middleware setup for development vs production modes.