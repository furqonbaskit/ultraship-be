# Ultraship Backend

A progressive [Node.js](http://nodejs.org) framework for building efficient and scalable server-side applications using [NestJS](https://nestjs.com), GraphQL, and TypeORM.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Migrations](#database-migrations)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [Testing](#testing)

## Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v12 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ultraship-be
```

2. Install dependencies:
```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=ultraship
DB_SCHEMA=ultraship

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h

# Application
NODE_ENV=development
```

**Note:** For production, set `NODE_ENV=production` and use secure credentials.

## Database Migrations

### Generate Migrations

After modifying entity files, generate a new migration:

```bash
npm run migrate:generate -- -n MigrationName
```

**Example:**
```bash
npm run migrate:generate -- -n CreateUserTable
```

This creates a new migration file in `src/_migrations/`.

### Run Migrations

Apply all pending migrations to the database:

```bash
npm run migrate:run
```

### Revert Migrations

Revert the last applied migration:

```bash
npm run migrate:revert
```

**Note:** Use migrations only in production. For development, you can enable `synchronize: true` in `pgDatasource.ts` (not recommended for production).

## Database Seeding

### Seed Admin User

Seed an initial admin user to the database:

```bash
npm run seed
```

This command:
- Creates an `ADMIN` role if it doesn't exist
- Creates an admin user with:
  - **Email:** `admin@example.com`
  - **Password:** `admin123`

**⚠️ Important:** Change the admin password immediately after seeding in production environments.

### Custom Seeders

To add more seeders, create new seeder functions in `src/seeders/` and call them in `src/seed.ts`.

## Running the Application

### Development Mode (Watch Mode)

Start the application in watch mode with hot-reload:

```bash
npm run start:dev
```

The application will run on `http://localhost:3000`.

### Production Mode

Build and run the application:

```bash
npm run build
npm run start:prod
```

### GraphQL Playground

Access the GraphQL playground at:
```
http://localhost:3000/graphql
```

## Compile and Build

```bash
# Build the project
npm run build

# Format code with Prettier
npm run format

# Lint and fix code with ESLint
npm run lint
```

## Testing

### Unit Tests

Run unit tests:

```bash
npm run test
```

### Watch Mode

Run tests in watch mode:

```bash
npm run test:watch
```

### Test Coverage

Generate coverage report:

```bash
npm run test:cov
```

### E2E Tests

Run end-to-end tests:

```bash
npm run test:e2e
```

## Project Structure

```
src/
├── _config/          # Configuration files (database, typeorm)
├── _migrations/      # Database migrations
├── _shared/          # Shared DTOs and utilities
├── seeders/          # Database seeders
├── attendance/       # Attendance module
├── auth/             # Authentication module
├── roles/            # Roles module
├── users/            # Users module
├── app.module.ts     # Main application module
├── app.controller.ts # Main application controller
├── app.service.ts    # Main application service
├── main.ts           # Application entry point
└── seed.ts           # Seeder entry point
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run start:dev` | Start app in development mode |
| `npm run migrate:run` | Apply database migrations |
| `npm run migrate:generate -- -n Name` | Generate new migration |
| `npm run seed` | Seed admin user to database |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run lint` | Lint and fix code |
| `npm run format` | Format code |

