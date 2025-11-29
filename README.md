# Dynamic Broken Link Validator for Redbus.com

A Cypress-based automated tool to validate all links on Redbus.com, identify broken links, highlight them in red, capture screenshots, and generate detailed reports.

## Features

- ✅ **Automatic Link Discovery**: Extracts all links from Redbus homepage
- ✅ **HTTP Status Validation**: Checks each link's HTTP status code
- ✅ **Visual Highlighting**: Highlights broken links in red with borders
- ✅ **Screenshot Capture**: Takes screenshots of each broken link
- ✅ **Detailed Logging**: Generates comprehensive logs for both valid and broken links
- ✅ **Multiple Report Formats**: Creates both JSON and text-based reports

## Installation

1. Clone or navigate to the project directory:
```bash
cd c:\Users\mvsar\Projects\DynamicBrokenLinks
```

2. Install dependencies (already done):
```bash
npm install
```

## Project Structure

```
DynamicBrokenLinks/
├── cypress/
│   ├── e2e/
│   │   └── broken-link-validator.cy.js    # Main test script
│   ├── screenshots/                        # Screenshots of broken links
│   ├── reports/                            # Generated reports
│   │   ├── broken-links-report.json       # JSON format report
│   │   └── broken-links-report.txt        # Text format report
│   └── support/
│       ├── commands.js                     # Custom Cypress commands
│       └── e2e.js                          # Support file loader
├── cypress.config.js                       # Cypress configuration
└── package.json                            # Project dependencies
```

## Usage

### Run the Broken Link Validator

**Option 1: Headed Mode (Recommended - See the browser)**
```bash
npm run validate:links
```

**Option 2: Headless Mode (Faster)**
```bash
npm test
```

**Option 3: Interactive Mode (Cypress Test Runner)**
```bash
npm run cypress:open
```
Then select the `broken-link-validator.cy.js` test from the UI.

## How It Works

1. **Navigate to Redbus**: Opens https://www.redbus.com
2. **Close Popups**: Automatically closes any modal dialogs
3. **Extract Links**: Finds all `<a>` tags with `href` attributes
4. **Validate Each Link**: Makes HTTP requests to check status codes
5. **Categorize Links**:
   - **Valid**: Status codes 200-399 (logged in green)
   - **Broken**: Status codes 400+ or network errors (logged in red)
6. **Highlight Broken Links**: Applies red background and border styling
7. **Capture Screenshots**: Takes viewport screenshots of each broken link
8. **Generate Reports**: Creates detailed JSON and text reports

## Output

### Console Logs
During execution, you'll see real-time logs:
```
✓ [1/150] Valid Link (200): https://www.redbus.com/about
✗ [2/150] BROKEN Link (404): https://www.redbus.com/invalid-page
```

### Screenshots
Located in `cypress/screenshots/broken-link-validator.cy.js/`
- Named as: `broken-link-{index}-status-{statusCode}.png`
- Example: `broken-link-5-status-404.png`

### Reports

**JSON Report** (`cypress/reports/broken-links-report.json`):
```json
{
  "timestamp": "2025-11-29T14:40:00.000Z",
  "totalLinks": 150,
  "validLinksCount": 145,
  "brokenLinksCount": 5,
  "validLinks": [...],
  "brokenLinks": [...]
}
```

**Text Report** (`cypress/reports/broken-links-report.txt`):
```
=== REDBUS BROKEN LINK VALIDATION REPORT ===
Generated: 11/29/2025, 8:10:00 PM

Total Links Found: 150
Valid Links: 145
Broken Links: 5
Success Rate: 96.67%

--- BROKEN LINKS ---
[12] HTTP 404: https://www.redbus.com/page1
[45] HTTP 500: https://www.redbus.com/page2
...
```

## Configuration

Edit `cypress.config.js` to customize:
- `baseUrl`: Change target website
- `viewportWidth/Height`: Adjust browser viewport
- `defaultCommandTimeout`: Modify timeout for commands
- `pageLoadTimeout`: Adjust page load timeout

## Troubleshooting

**Issue**: Too many links causing timeout
- **Solution**: Reduce the number of links checked or increase timeout in config

**Issue**: Popups blocking link extraction
- **Solution**: Update popup selector in the test script

**Issue**: Rate limiting from Redbus
- **Solution**: Add delays between requests using `cy.wait()`

## Technical Details

- **Framework**: Cypress 15.7.0
- **Language**: JavaScript (CommonJS)
- **Browser**: Chrome (configurable)
- **Node.js**: Compatible with latest LTS versions

## Notes

- The script validates links found on the **homepage only**
- Some links may be dynamically loaded and might not be captured
- External links are also validated
- Screenshots are taken in viewport mode (visible area only)

## Author

Created for automated link validation testing on Redbus.com

## License

ISC
