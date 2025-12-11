# Installation Guide - AMOr Platform

This document provides detailed installation and setup instructions for the AMOr local restaurant discovery platform.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Configuration](#database-configuration)
4. [Environment Configuration](#environment-configuration)
5. [Running the Application](#running-the-application)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before installing AMOr, ensure you have the following installed:

### Required Software

- **Node.js** (v18.0.0 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version`

- **npm** (v9.0.0 or higher) or **yarn** (v1.22.0 or higher)
  - Comes with Node.js
  - Verify installation: `npm --version`

- **Git** (v2.30.0 or higher)
  - Download from: https://git-scm.com/
  - Verify installation: `git --version`

- **MySQL Database** (v8.0 or higher)
  - Local installation OR
  - Cloud-hosted (e.g., Google Cloud SQL)

### Optional Tools

- **VS Code** (recommended code editor)
- **MySQL Workbench** (database management)
- **Netlify CLI** (for deployment testing)

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/osla0001/AMOr.git

# OR using SSH
git clone git@github.com:osla0001/AMOr.git

# Navigate to project directory
cd AMOr
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages including:

- Astro framework
- MySQL2 driver
- AOS (Animate On Scroll)
- Netlify adapter
- TypeScript dependencies

### Step 3: Verify Installation

```bash
# Check if all dependencies are installed
npm list --depth=0

# Expected output should include:
# ├── @astrojs/netlify
# ├── astro
# ├── mysql2
# ├── aos
# └── typescript
```

---

## Database Configuration

### Database Schema

The application requires a MySQL database with the following tables:

#### 1. `eatery` Table

```sql
CREATE TABLE eatery (
  etr_id INT PRIMARY KEY AUTO_INCREMENT,
  etr_name VARCHAR(255) NOT NULL,
  etr_coordinates VARCHAR(50),
  etr_address TEXT,
  etr_menu_highlights JSON,
  etr_lgbt_friendly BOOLEAN DEFAULT FALSE,
  etr_women_owned BOOLEAN DEFAULT FALSE,
  etr_price_range VARCHAR(50),
  etr_outdoor_seating BOOLEAN DEFAULT FALSE,
  etr_pet_friendly BOOLEAN DEFAULT FALSE,
  etr_wifi BOOLEAN DEFAULT FALSE,
  etr_payment_methods VARCHAR(255),
  etr_local_suppliers BOOLEAN DEFAULT FALSE,
  etr_opening_hours TEXT,
  etr_bg_stry TEXT,
  etr_phone VARCHAR(50),
  etr_email VARCHAR(255)
);
```

#### 2. `cuisine` Table

```sql
CREATE TABLE cuisine (
  cus_id INT PRIMARY KEY AUTO_INCREMENT,
  cus_name VARCHAR(100) NOT NULL UNIQUE
);
```

#### 3. `eatery_cuisine` Junction Table

```sql
CREATE TABLE eatery_cuisine (
  etrc_id INT PRIMARY KEY AUTO_INCREMENT,
  etrc_etr_id INT NOT NULL,
  etrc_cus_id INT NOT NULL,
  FOREIGN KEY (etrc_etr_id) REFERENCES eatery(etr_id) ON DELETE CASCADE,
  FOREIGN KEY (etrc_cus_id) REFERENCES cuisine(cus_id) ON DELETE CASCADE,
  UNIQUE KEY unique_eatery_cuisine (etrc_etr_id, etrc_cus_id)
);
```

### Sample Data (Optional)

```sql
-- Insert sample cuisine
INSERT INTO cuisine (cus_name) VALUES
  ('Portuguese'),
  ('Mediterranean'),
  ('Italian'),
  ('Vegetarian');

-- Insert sample restaurant
INSERT INTO eatery (etr_name, etr_coordinates, etr_address, etr_bg_stry) VALUES
  ('Sample Restaurant', '38.7169,-9.1399', 'Rua Example 123, Lisboa', 'A cozy local restaurant');

-- Link restaurant to cuisines
INSERT INTO eatery_cuisine (etrc_etr_id, etrc_cus_id) VALUES
  (1, 1),
  (1, 2);
```

### Database Connection Options

#### Option A: Local MySQL

1. Install MySQL on your machine
2. Create database: `CREATE DATABASE munchmap;`
3. Run schema SQL scripts
4. Note credentials for `.env` file

#### Option B: Google Cloud SQL (Production)

1. Create Cloud SQL instance in Google Cloud Console
2. Create database `munchmap`
3. Whitelist your IP address
4. Note connection details for `.env` file

---

## Environment Configuration

### Step 1: Create Environment File

```bash
# Copy example file (if exists) or create new
touch .env
```

### Step 2: Configure Variables

Edit `.env` file with your database credentials:

```env
# Database Configuration
DB_HOST=localhost
# For Cloud SQL: DB_HOST=34.175.101.196

DB_PORT=3306

DB_USER=root
# Use your MySQL username

DB_PASSWORD=your_password_here
# Use your MySQL password

DB_NAME=munchmap
# Database name

# Optional: Google Maps API Key (if using custom key)
# PUBLIC_GOOGLE_MAPS_KEY=your_api_key_here
```

### Step 3: Verify Configuration

```bash
# Test database connection
npm run dev

# Check terminal for connection errors
# If successful, you should see:
# "astro ready in XXXms"
```

---

## Running the Application

### Development Mode

```bash
# Start development server with hot reload
npm run dev

# Server will start at:
# http://localhost:4321
```

Development server features:

- Hot module replacement (HMR)
- Automatic page refresh on file changes
- Detailed error messages
- Source maps for debugging

### Available Pages

Once running, visit:

- `/` - Homepage
- `/catalog` - Restaurant catalog
- `/map` - Interactive map
- `/about` - About page
- `/contact` - Contact form
- `/experience` - Game download page
- `/data-export` - JSON data viewer
- `/catalog/[restaurant-name]` - Individual restaurant pages

### Build for Production

```bash
# Create production build
npm run build

# Output will be in dist/ directory
```

### Preview Production Build

```bash
# Build and preview
npm run build
npm run preview

# Preview server runs at:
# http://localhost:4321
```

---

## Production Deployment

### Netlify Deployment (Recommended)

#### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

#### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select the `AMOr` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch to deploy**: `main`

#### Step 3: Set Environment Variables

In Netlify Dashboard → Site settings → Environment variables:

Add each variable from your `.env` file:

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

**Important**: Never commit `.env` file to Git!

#### Step 4: Deploy

1. Click "Deploy site"
2. Wait for build to complete (2-5 minutes)
3. Site will be live at `https://[your-site-name].netlify.app`

#### Step 5: Custom Domain (Optional)

1. In Netlify Dashboard → Domain settings
2. Add custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic with Let's Encrypt)

### Manual Deployment

```bash
# Build production files
npm run build

# Deploy dist/ folder to your hosting provider
# (e.g., upload via FTP, rsync, etc.)
```

---

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `Database connection failed`

**Solutions**:

- Verify `.env` credentials are correct
- Check database server is running
- For Cloud SQL: Verify IP whitelist includes your IP
- Test connection with MySQL client:
  ```bash
  mysql -h [DB_HOST] -u [DB_USER] -p
  ```

#### 2. Port Already in Use

**Error**: `Port 4321 is in use`

**Solutions**:

- Kill process using port:
  ```bash
  lsof -ti:4321 | xargs kill -9
  ```
- Or use different port:
  ```bash
  npm run dev -- --port 3000
  ```

#### 3. Module Not Found

**Error**: `Cannot find module 'aos'`

**Solutions**:

- Delete node_modules and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

#### 4. Build Fails on Netlify

**Error**: `Build failed with exit code 1`

**Solutions**:

- Check Netlify build logs for specific error
- Verify all environment variables are set
- Ensure Node.js version matches (check `package.json`)
- Try local build: `npm run build`

#### 5. Images Not Loading

**Error**: 404 errors for images

**Solutions**:

- Verify images exist in `public/` directory
- Check image paths use absolute paths: `/images/...`
- For webp images: ensure all references use `.webp` extension

### Getting Help

If you encounter issues not listed here:

1. Check [GitHub Issues](https://github.com/osla0001/AMOr/issues)
2. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, etc.)

---

## Additional Configuration

### Configuring AOS Animations

Edit `src/css/aos-custom.css` to customize animation behavior:

```css
/* Adjust animation duration */
[data-aos] {
  transition-duration: 1s; /* Default: 0.8s */
}

/* Disable on mobile */
@media (max-width: 768px) {
  [data-aos] {
    transition: none !important;
  }
}
```

### Updating Google Maps API Key

Edit `src/layouts/Layout.astro`:

```astro
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_NEW_KEY&callback=initializeApp&libraries=maps,marker&v=beta"
></script>
```

### Adding New Restaurant Data

Use the MySQL command line or MySQL Workbench:

```sql
-- Add restaurant
INSERT INTO eatery (etr_name, etr_coordinates, etr_address)
VALUES ('New Restaurant', '38.7,-9.1', 'Address');

-- Add cuisine relationship
INSERT INTO eatery_cuisine (etrc_etr_id, etrc_cus_id)
VALUES (LAST_INSERT_ID(), 1);
```

---

## Development Best Practices

1. **Always test locally** before pushing to production
2. **Use environment variables** for sensitive data
3. **Commit often** with descriptive messages
4. **Test responsive design** at all breakpoints
5. **Validate HTML** and check browser console for errors
6. **Optimize images** before adding to repository
7. **Document code changes** in comments

---

## System Requirements

### Minimum Requirements

- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 1 GB free space
- **Network**: Stable internet connection for database access

### Recommended Requirements

- **CPU**: 4+ cores
- **RAM**: 8+ GB
- **Storage**: 5+ GB free space
- **Network**: High-speed connection

---

## License

This installation guide is part of the AMOr project, licensed under MIT License.

## Support

For installation support, contact:

- **Email**: amor@gmail.com
- **GitHub Issues**: https://github.com/osla0001/AMOr/issues

---

**Last Updated**: December 2025  
**Version**: 1.0.0
