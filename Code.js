/**
 * Main function to serve the web app. Acts as a dynamic router.
 * It uses a URL parameter 'page' to determine which sheet and HTML file to load.
 * @param {Object} e The event parameter from the web app request.
 */
function doGet(e) {
  // If no page parameter is provided, default to the 'landing' page.
  const pageParameter = e.parameter.page || 'landing';

  // The 'landing' page has a special function because its data structure is unique.
  if (pageParameter === 'landing') {
    return showLandingPage();
  }

  // The 'interactivelearningapps' page has a special function because its data structure is unique.
  if (pageParameter === 'interactivelearningapps') {
    return showInteractiveLearningAppsPage();
  }

  // For all other pages, use the generic page builder.
  return showGenericPage(pageParameter);
}

/**
 * A generic function to build any standard "card" page.
 * It derives the Sheet name and HTML file name from the page parameter.
 * @param {string} pageParameter The 'page' parameter from the URL (e.g., "gems").
 */
function showGenericPage(pageParameter) {
  // --- Convention Logic ---
  // 1. Convert parameter to Sheet Name (e.g., "gems" -> "Gems")
  const sheetName = pageParameter.charAt(0).toUpperCase() + pageParameter.slice(1);
  // 2. Convert parameter to HTML File Name (e.g., "gems" -> "Gems.html")
  const htmlFileName = sheetName; // Assumes HTML file is named "Gems.html", "Staff.html", etc.
  const webAppUrl = ScriptApp.getService().getUrl();

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return HtmlService.createHtmlOutput(`Error: Sheet named "${sheetName}" not found.`);
  }

  // Assumes a standard 4-column layout for all generic card pages.
  // (Title, Description, Image, URL)
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    // If there are no data rows, return an empty array to the template.
    // The template should handle the case where cardsData is empty.
    const template = HtmlService.createTemplateFromFile(htmlFileName);
    template.cardsData = [];
    return template.evaluate()
      .setTitle(sheetName)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  const dataRange = sheet.getRange(2, 1, lastRow - 1, 4);
  const values = dataRange.getValues();

  const cardsData = values.map(function(row) {
    return {
      title: row[0],
      description: row[1],
      image: convertGoogleDriveUrl(row[2]),
      url: row[3]
    };
  }).filter(row => row.title && row.url);

  // Dynamically create the template from the determined file name.
  try {
    const template = HtmlService.createTemplateFromFile(htmlFileName);
    template.cardsData = cardsData; // Generic name for data passed to template
    template.webAppUrl = webAppUrl;
    
    return template.evaluate()
      .setTitle(sheetName)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    return HtmlService.createHtmlOutput(`Error: HTML template named "${htmlFileName}.html" not found.`);
  }
}

/**
 * Builds and returns the HTML for the card-based "Landing Page".
 * This remains a separate function because its sheet structure (7 columns) is unique.
 */
function showLandingPage() {
  const sheetName = 'Landing Page';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return HtmlService.createHtmlOutput(`Error: Sheet named "${sheetName}" not found.`);
  }

  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 7);
  const values = dataRange.getValues();
  const webAppUrl = ScriptApp.getService().getUrl();

  const cardsData = values.map(function(row) {
    const pageParameter = row[6];
    let finalUrl = row[5]; // The direct Redirect URL from column F
    if (pageParameter) {
      finalUrl = `${webAppUrl}?page=${pageParameter}`;
    }

    return {
      title: row[0],
      description: row[1],
      category: row[2],
      highlight: row[3],
      image: convertGoogleDriveUrl(row[4]),
      url: finalUrl
    };
  }).filter(row => row.title && row.url);

  const template = HtmlService.createTemplateFromFile('LandingPage');
  template.cards = cardsData;

  return template.evaluate()
    .setTitle('Welcome')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function showInteractiveLearningAppsPage() {
  const sheetName = 'Interactive Learning Apps';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return HtmlService.createHtmlOutput(`Error: Sheet named "${sheetName}" not found.`);
  }

  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6);
  const values = dataRange.getValues();

  function mapGradeToRange(grade) {
    const gradeStr = String(grade).toUpperCase().trim();
    const ranges = [];

    if (gradeStr === 'K' || gradeStr === '1' || gradeStr === '2') {
      ranges.push('K-2');
    }
    if (gradeStr === '3' || gradeStr === '4' || gradeStr === '5') {
      ranges.push('3-5');
    }
    if (gradeStr === '6' || gradeStr === '7' || gradeStr === '8') {
      ranges.push('6-8');
    }
    if (gradeStr === '9' || gradeStr === '10' || gradeStr === '11' || gradeStr === '12') {
      ranges.push('9-12');
    }

    return ranges;
  }

  const cardsData = values.map(function(row) {
    const gradeLevelString = row[3] ? String(row[3]).trim() : '';
    const gradeArray = gradeLevelString ? gradeLevelString.split(',').map(g => g.trim()) : [];

    const gradeRanges = [];
    gradeArray.forEach(function(grade) {
      const ranges = mapGradeToRange(grade);
      ranges.forEach(function(range) {
        if (!gradeRanges.includes(range)) {
          gradeRanges.push(range);
        }
      });
    });

    return {
      title: row[0],
      description: row[1],
      category: row[2],
      gradeLevel: gradeLevelString,
      gradeArray: gradeArray,
      gradeRanges: gradeRanges,
      image: convertGoogleDriveUrl(row[4]),
      url: row[5]
    };
  }).filter(row => row.title && row.url);

  const template = HtmlService.createTemplateFromFile('InteractiveLearningApps');
  template.cards = cardsData;

  return template.evaluate()
    .setTitle('Interactive Learning Apps')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Converts a standard Google Drive sharing URL into a direct, embeddable image link.
 * (This function remains unchanged)
 */
function convertGoogleDriveUrl(url) {
  if (!url || !url.includes('drive.google.com')) {
    return url || 'https://placehold.co/600x400/cccccc/ffffff?text=No+Image';
  }
  const regex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]{25,})/;
  const match = url.match(regex);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w600`;
  }
  return 'https://placehold.co/600x400/e74c3c/ffffff?text=Invalid+Drive+Link';
}

/**
 * Includes the content of another HTML file.
 * @param {string} filename The name of the file to include.
 * @return {string} The content of the file.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
