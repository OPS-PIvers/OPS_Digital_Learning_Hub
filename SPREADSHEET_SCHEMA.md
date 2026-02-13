# Google Spreadsheet Schema

This project uses a Google Sheet as a CMS (Content Management System). The Google Apps Script (`Code.js`) reads data from specific tabs to generate the web pages.

Below is the required schema for each tab.

## 1. Landing Page
**Tab Name:** `Landing Page`

This tab populates the main home page.

| Column | Header Name (Suggested) | Description | Data Type |
| :--- | :--- | :--- | :--- |
| **A** | Title | The title of the card. | Text |
| **B** | Description | A brief description of the item. | Text |
| **C** | Category | The category of the item (e.g., "Curriculum", "Tools"). | Text |
| **D** | Highlight | Used to highlight specific cards (implementation varies). | Text/Boolean |
| **E** | Image URL | Link to the card image. Google Drive links are auto-converted. | URL |
| **F** | Redirect URL | External link where the card should point. | URL |
| **G** | Page Parameter | **Internal Routing.** If set, overrides Column F. Example: `gems` will route to `?page=gems`. | Text |

---

## 2. Interactive Learning Apps
**Tab Name:** `Interactive Learning Apps`

This tab populates the Interactive Learning Apps page (`?page=interactivelearningapps`).

| Column | Header Name (Suggested) | Description | Data Type |
| :--- | :--- | :--- | :--- |
| **A** | Title | The title of the app. | Text |
| **B** | Description | Description of the app. | Text |
| **C** | Category | Subject or Category (e.g., "Math", "Science"). | Text |
| **D** | Grade Level | Target grades. Supports comma-separated values (e.g., "K, 1, 2" or "9, 10"). Used for filtering. | Text |
| **E** | Image URL | Link to the app thumbnail. | URL |
| **F** | URL | The link to the actual application. | URL |

---

## 3. Generic Pages (e.g., "Gems")
**Tab Name:** `Gems` (or other names matching the `?page=name` parameter)

This schema is used for standard resource pages like the "Gems" page.
**Note:** The tab name must match the capitalized `page` parameter (e.g., `?page=gems` looks for a tab named `Gems`).

| Column | Header Name (Suggested) | Description | Data Type |
| :--- | :--- | :--- | :--- |
| **A** | Title | The title of the resource/Gem. | Text |
| **B** | Description | Brief description. | Text |
| **C** | Image URL | Thumbnail image. | URL |
| **D** | URL | **Primary Action.** The main link for the "Try it" button. | URL |
| **E** | Customize URL | **Secondary Action.** Link for the "Customize it" button (optional). | URL |
| **F** | Needs Modal | If `TRUE`, the "Try it" button opens a customization modal instead of a direct link. | Boolean (TRUE/FALSE) |
| **G** | Options | **Modal Configuration.** Comma-separated list of fields to show in the modal. <br><br> **Available Options:** <br> `Grade Level`, `Subject`, `Topic`, `Additional Details`, `Level of Detail`, `Student Interests`, `Prior Knowledge`, `Assessment Type`, `Standards`, `ELL Support`, `Accommodations`, `Tone/Style`, `Target Audience`, `Output Format`, `Resource` | Text |

### Example for "Gems" Tab
| Title | Description | Image URL | URL | Customize URL | Needs Modal | Options |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Lesson Planner | AI lesson planner | http://... | http://gem... | http://make... | TRUE | Grade Level, Subject, Topic |
| Quiz Maker | Make a quiz | http://... | http://gem... | | FALSE | |
