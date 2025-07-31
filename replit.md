# FUJI Global Korea Website

## Overview

This is a corporate website for FUJI Global Korea, an elevator technology company. The application is built as a full-stack web application with React frontend and Express backend, featuring a corporate website with product catalog, serial number lookup, contact forms, and admin management system.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **Build Tool**: Vite for development and production builds
- **Language Support**: Multi-language support (Korean/English) with React Context

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: Dual database support - PostgreSQL (default) and MySQL (for Spaceship hosting)
- **ORM**: Drizzle ORM with schema-first approach
- **Authentication**: Session-based admin authentication with bcrypt password hashing
- **API**: RESTful API endpoints with proper error handling

### Key Components

#### Database Design
- **Products**: Elevator control systems and traction machines with specifications, features, and multilingual descriptions
- **Serial Numbers**: Product serial number tracking with installation details and status
- **Inquiries**: Customer contact form submissions
- **Admin Users**: Administrative user management with role-based access
- **Admin Sessions**: Session management for admin authentication

#### Authentication System
- Session-based authentication for admin panel
- Password hashing with bcrypt (12 rounds)
- Session timeout and cleanup
- Role-based access control

#### Multi-language Support
- Korean and English language support
- Translation management through React Context
- Language-specific content for products and descriptions

#### File Upload & Management
- Support for product images and attachments
- Excel file integration for bulk serial number imports
- Asset management through Vite's asset pipeline

## Data Flow

1. **Client Request**: React app makes requests through TanStack Query
2. **API Layer**: Express routes handle authentication and business logic
3. **Database Layer**: Drizzle ORM manages database operations
4. **Response**: JSON data returned to client with proper error handling

### Admin Dashboard Flow
1. Admin login with username/password
2. Session creation and storage
3. Protected routes verify session validity
4. CRUD operations on products, serial numbers, and inquiries
5. Excel import/export functionality

### Public Website Flow
1. Product catalog display with category filtering
2. Serial number search functionality
3. Contact form submission
4. Multi-language content switching

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connection (Neon DB)
- **mysql2**: MySQL database connection (Spaceship hosting)
- **@radix-ui/**: UI component primitives for shadcn/ui
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe ORM
- **wouter**: Lightweight React router
- **bcryptjs**: Password hashing
- **framer-motion**: Animation library
- **lucide-react**: Icon library

### Development Dependencies
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for server builds
- **tailwindcss**: Utility-first CSS framework
- **@types/***: TypeScript type definitions

### Optional Integrations
- **papaparse**: CSV parsing for Excel imports
- **xlsx**: Excel file processing
- **cookie-parser**: HTTP cookie parsing

## Deployment Strategy

### Development Environment
- **Development Server**: Vite dev server with HMR
- **Database**: PostgreSQL via Neon (free tier)
- **Build Command**: `npm run dev`

### Production Environments

#### Option 1: Standard Hosting (Recommended)
- **Database**: PostgreSQL via Neon or similar
- **Build**: Vite build + esbuild server bundle
- **Deployment**: Node.js hosting platform
- **Commands**: `npm run build && npm start`

#### Option 2: Spaceship Hosting (cPanel)
- **Database**: MySQL via cPanel
- **Schema**: Uses MySQL-specific schema file
- **Build**: Custom build process for shared hosting
- **Deployment**: FTP upload with specific configuration
- **Commands**: Custom scripts in `package-spaceship.json`

### Database Migration Strategy
- Separate schema files for PostgreSQL and MySQL
- Drizzle Kit for schema migrations
- Environment-specific connection strings
- Fallback handling for database differences

### Asset Management
- Static assets served through Vite in development
- Production assets bundled and served via Express
- Image optimization and fallback handling
- Multi-environment asset path resolution

The application supports both modern cloud hosting (with PostgreSQL) and traditional shared hosting (with MySQL), making it flexible for different deployment scenarios while maintaining the same codebase.