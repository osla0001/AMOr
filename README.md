# AMOr - Local Restaurant Discovery Platform

AMOr is a web-based platform designed to promote and support local restaurants in Lisbon. The project combines an interactive map, restaurant catalog, and gamification elements to encourage exploration of neighborhood eateries and strengthen community connections.

## 🎯 Project Overview

AMOr helps users discover authentic local dining experiences while supporting small businesses and local food culture. The platform features:

- **Interactive Map** - Explore restaurants on a Google Maps interface with custom markers
- **Comprehensive Catalog** - Browse and search restaurants by name, cuisine, and amenities
- **Restaurant Profiles** - Detailed information including menus, hours, amenities, and background stories
- **Game Integration** - Download our interactive food exploration game
- **Unity Data API** - Live JSON feed for game integration

## 🚀 Features

- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Real-time Database** - MySQL database hosted on Google Cloud SQL
- **SEO Optimized** - Meta descriptions, semantic HTML, and performance optimization
- **Accessibility** - WCAG-compliant design with keyboard navigation
- **Animations** - Smooth scroll animations using AOS (Animate On Scroll)
- **Modern Tech Stack** - Built with Astro, TypeScript, and MySQL

## 📋 Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Data Sources](#data-sources)
- [License](#license)
- [Contact](#contact)

## 🛠️ Installation

See [INSTALLATION.md](INSTALLATION.md) for detailed installation instructions.

### Quick Start

```bash
# Clone repository
git clone https://github.com/osla0001/AMOr.git
cd AMOr

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start development server
npm run dev
```

## 📁 Project Structure

```
AMOr/
├── public/
│   ├── eatery/           # Restaurant images
│   ├── icons/            # UI icons
│   ├── images/           # General images
│   └── favicon/          # Favicon files
├── src/
│   ├── components/       # Reusable Astro components
│   ├── css/              # Stylesheets
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
    │   ├── api/          # .ts files
│   └── assets/           # Static assets
├── .env                  # Environment variables
├── astro.config.mjs      # Astro configuration
└── package.json          # Dependencies
```

## 🔧 Environment Variables

Required environment variables:

| Variable      | Description         | Example          |
| ------------- | ------------------- | ---------------- |
| `DB_HOST`     | MySQL database host | `34.175.101.196` |
| `DB_PORT`     | MySQL database port | `3306`           |
| `DB_USER`     | Database username   | `root`           |
| `DB_PASSWORD` | Database password   | `your-password`  |
| `DB_NAME`     | Database name       | `munchmap`       |

## 💻 Development

### Available Commands

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start development server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |

## 🚀 Deployment

This project is configured for Netlify deployment. See [INSTALLATION.md](INSTALLATION.md) for deployment instructions.

## 📊 Data Sources

- **Google Maps JavaScript API** - Interactive map functionality
- **MySQL Database (Google Cloud SQL)** - Restaurant data storage
- **Google Fonts** - Commissioner font (body text)
- **CDN Fonts** - Milky Coffee font (display headings)
- **AOS** - Animate On Scroll library

See `src/components/data-sources-documentation.txt` for complete details.

## 🎮 Unity Integration

JSON API endpoint for Unity game integration: `/api/restaurants.json`

Live viewer available at: `/data-export`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contact

**Project Maintainer**: Oscar Laursen

**Email**: amor@gmail.com  
**Location**: IADE University, Lisboa

**Repository**: https://github.com/osla0001/AMOr

## 🙏 Acknowledgments

- IADE University for project support
- Local Lisbon restaurants for participating
- Google Cloud Platform for database hosting
- Open source community for tools and libraries

---

**Built with ❤️ in Lisbon** | **Supporting local food culture** | **© 2025 AMOr**
