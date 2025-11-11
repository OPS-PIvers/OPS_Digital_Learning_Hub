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

  if (pageParameter === 'gemini') {
    return showGeminiPage();
  }

  // For all other pages, use the generic page builder.
  return showGenericPage(pageParameter);
}

/**
 * Builds and returns the HTML for the Gemini Tools page.
 */
function showGeminiPage() {
  const htmlFileName = 'Gemini';
  const cardsData = [
    {
      title: 'Creating Gems',
      description: "An overview of the 'Gems' feature, what they are, and their primary use cases. Click to learn more.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3S-E9X-TWkYWPwY2lQ6LA5VSH6b6rfTUemz89sSSeIWabP3lQNebBUUQeoTjUfUfofNPhxdN3mxLp0jXqm8FHh39Zipw9sd4_F4PTio-LZocnTyo7VzR0qR6eiw38JYlROGjl4w3cZhKmVnvKkuLZ1WGL-6UCG1WjfgrZnowxFiV-v7WiVs4-E0CpZX-KApStntGBxHzX9E9V0MM96Pd_PcjTvBXeSjlBAOlBOMrKHH1BkdqDZs4yIc78q6xQYtzAEdTYu3318ssi',
      url: '?page=gems'
    },
    {
      title: 'Using the Canvas tool to create interactive learning apps',
      description: 'Introduction to the Canvas tool for building engaging educational applications. Click to learn more.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnmxUbuyEKMqcy10mjEGMlzGClm5Tn4HwJqMn8dGN9RFjNe_BMfxutBVNHOn4D2EO1B2WkPX15CQtWNCtjDsaBIL4p6nE_Aos0cJaub6SwCcJrnBo_RJZMujI4ClbWHt1fdnCWCkaXlDYU8_m2VgagLDYJyrTpscEvzF3dfLyj5MTevy2sgIavg1ufma9rbnGCcFkIpFOc8o1sxGDvhBErf5-96vWF8F0nrrSMkmSK9NOc35MzwrXDmty6IiU_wVf6sQqjm63i-C7R',
      url: '?page=interactivelearningapps'
    },
    {
      title: 'Creating and Exporting Google Slides',
      description: 'Guide on how to generate and export presentations directly to Google Slides. Click to learn more.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhibkPEYDNv5xFAfEgKqQ4LXAKtuOjRjtw0JC7uszVAWb9kryp-xRQZhQWzb5ff2zwD_oMM3SKvB02fgZGaco7osuCCCe8xF58pcuNgHS5JNKQ-86axIE7LFatKX_mkdCS5-mqvaWboo7LFeL--G3uq4eZ_u-2wRlRsEBqj8o2aHqITpU0HYsVJsyCau2xCiWIIImda9NYSKLVlhNNRZRh-9WQzveEX0Q_RhSjZJTM0xzBi2aR2Fm8mYyEFhKFNot5HyXFD_LS20ko',
      url: '#'
    },
    {
      title: 'Editing pictures with Nano Banana',
      description: "A look into the 'Nano Banana' feature for quick and powerful image editing. Click to learn more.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALzlxvH_eQ3AnF6YWQ1LP66LrW4txlmX6rjJwEW6Xm-oPXe1mtIrX7P_beOMDjZRqsUotsFGbF1Smwca1W8yPUOOLzTOhOfeCth4D2J0qTKdP65qJBfLjaOVoD6eM1Q0k14YONxfd8BpkVBugGR6aNhcfdX8o2DzD1z_QUU8KMdHJfvMYtVtLtTCLGOH01ci8HnvvLdKvNPleP2wtX4EYTzxvATiLCl04yZ7eQjKggfyErgYuX6BFhyLeXnrdTwabDfg6mp2sMMOY5',
      url: '#'
    }
  ];

  try {
    const template = HtmlService.createTemplateFromFile(htmlFileName);
    template.cardsData = cardsData;

    return template.evaluate()
      .setTitle('Gemini Tools')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    // Log the actual error for debugging purposes.
    console.error('Error loading Gemini template:', error);
    return HtmlService.createHtmlOutput(`Error: The HTML template "${htmlFileName}.html" was not found.`);
  }
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

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

  if (!sheet) {
    return HtmlService.createHtmlOutput(`Error: Sheet named "${sheetName}" not found.`);
  }

  // Assumes a standard 4-column layout for all generic card pages.
  // (Title, Description, Image, URL)
  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4);
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
