# FUJI Global Korea - Corporate Website

## Overview

This is a bilingual (Korean/English) corporate website for FUJI Global Korea, an elevator technology company. The application is built as a modern full-stack web application using React for the frontend and Express.js for the backend, with a clean separation between client and server code.

## User Preferences

Preferred communication style: Simple, everyday language.

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
  - Fields: id, name, category (control/traction), model, image, specifications, features
  - Supports both Korean and English descriptions
- **Inquiries Table**: Customer contact form submissions
  - Fields: id, name, email, company, message, createdAt

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