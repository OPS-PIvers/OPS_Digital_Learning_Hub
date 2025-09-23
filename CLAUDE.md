# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Google Apps Script web application that serves as a Digital Learning Hub. It dynamically generates card-based interfaces from Google Sheets data and displays them as responsive web pages.

**Key Technology**: Google Apps Script (server-side JavaScript), HTML templates with Tailwind CSS

## Architecture

### Core Routing System (Code.js)

The app uses a dynamic router pattern via `doGet(e)`:
- URL parameter `page` determines which sheet/template to load
- **Landing page** (`?page=landing` or no param): Special handler `showLandingPage()` - uses 7-column sheet structure
- **Generic pages** (`?page=gems`, etc.): Handler `showGenericPage()` - uses 4-column sheet structure

### Naming Conventions

The app uses automatic naming conventions for generic pages:
1. URL parameter → Sheet name: `"gems"` → `"Gems"` (capitalize first letter)
2. Sheet name → HTML file: Same name + `.html` extension
3. Example: `?page=gems` loads sheet "Gems" and renders "Gems.html"

### Data Flow

**Landing Page (7 columns)**:
- Title, Description, Category, Highlight, Image URL, Redirect URL, Page Parameter
- Page Parameter generates internal routing: `webAppUrl?page={parameter}`

**Generic Pages (4 columns)**:
- Title, Description, Image URL, URL
- Data mapped to `cardsData` array and passed to template

### HTML Templates

**LandingPage.html**:
- Advanced UI with category filtering, grid/list view toggle
- Uses Lucide icons and localStorage for view persistence
- Client-side JavaScript for filtering and rendering

**Gems.html** (and similar generic templates):
- Simple server-side scriptlet rendering (`<? ?>` syntax)
- Standard card grid layout with Tailwind CSS

### Utility Functions

- `convertGoogleDriveUrl()`: Transforms Google Drive sharing URLs to direct thumbnail links

## Development Commands

**Deploy to Google Apps Script**:
```bash
clasp push
```

**Pull changes from Google Apps Script**:
```bash
clasp pull
```

**Open project in Apps Script editor**:
```bash
clasp open
```

**Deploy as web app**:
```bash
clasp deploy
```

## Project Configuration

- `.clasp.json`: Contains script ID and file extension mappings
- `appsscript.json`: Runtime configuration (V8, timezone, webapp settings)
- Web app access: Set to "ANYONE" (public access)
- Execute as: "USER_DEPLOYING"

## Adding New Pages

To add a new generic page (e.g., "staff"):
1. Create a Google Sheet named "Staff" with 4 columns (Title, Description, Image, URL)
2. Create `Staff.html` template (can copy Gems.html structure)
3. Access via `?page=staff` - no code changes needed
4. Push files with `clasp push`