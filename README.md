# Broken Link Validator with Red Highlight (Cypress)

![Cypress](https://img.shields.io/badge/Tested%20With-Cypress-brightgreen)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)
![Status](https://img.shields.io/badge/Status-Stable-success)
![Automation](https://img.shields.io/badge/Type-Web%20Automation-blue)

A powerful **broken link validation utility** built using Cypress that:

- ✅ Scans all `<a>` tags on a web page  
- ✅ Detects valid, redirect, and broken links  
- ✅ **Highlights broken links in RED directly on the UI**  
- ✅ Skips invalid and non-http links  
- ✅ Avoids screenshot timeout issues  
- ✅ Prints a clean execution summary at the end  
- ✅ Works perfectly with **dynamic error demo sites** like DeadLinkCity  

---

## 🚀 Features

**🔍 Automatic Detection of:**
- Valid links (200–299)
- Redirect links (300–399)
- Broken links (400+ and network failures)

**🎯 Smart Skipping of:**
- `mailto:`, `tel:`, `javascript:`
- Empty or invalid `href`

**🔴 Visual Red Highlighting of Broken Links**

**🧠 Uses `fetch()` Instead of `cy.request()` to:**
- Prevent test failures on server-side 405/403 errors
- Avoid `cy.screenshot()` timeout issues

**📊 Final Summary Report** printed in Cypress logs

---

## 📁 Project Structure

```
cypress/
└── e2e/
    └── broken-link-validator.cy.js
cypress.config.js
package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Ensure Cypress is Installed

```bash
npx cypress -v
```

---

## 🧪 How to Run the Test

**Open Test Runner:**

```bash
npx cypress open
```

**Run in Headless Mode:**

```bash
npx cypress run --spec cypress/e2e/broken-link-validator.cy.js
```

---

## ✅ Test Target (Current)

```javascript
cy.visit('http://www.deadlinkcity.com/')
```

You can replace this with any real production or QA URL.

---

## 🔴 How Red Highlighting Works

When a broken link is detected:

The element receives:
- `border: 3px solid red`
- `background-color: #ffcccc`

This makes broken links instantly visible on the page. Network failures, 403, 404, 405 → all are treated as ❌ broken

---

## 📊 Final Summary Output (Example)

```
===== ✅ Link Check Summary =====
Links Checked (http/https): 26
Valid Links: 12
Redirect Links: 3
Broken Links: 11
Skipped Links: 7
```

---

## 🛑 Screenshot Timeout Issue – Fixed

To permanently prevent this error:

```
CypressError: cy.screenshot() timed out waiting 30000ms to complete
```

Add this to your `cypress.config.js`:

```javascript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    screenshotOnRunFailure: false,
  },
})
```

✅ This guarantees stable execution even on demo error pages.

---

## 🧠 Key Technical Decisions

| Problem | Solution |
|---------|----------|
| 405 / 403 breaking the test | Replaced cy.request() with fetch() |
| Screenshot timeout crash | Disabled screenshot on failure |
| DeadLinkCity simulated error URLs | Handled as valid broken cases |
| DOM validation | Used CSS injection for red highlight |

---

## 🛠 Customization Options

- ✅ Export broken links to CSV
- ✅ Add Mochawesome / Allure reporting
- ✅ Convert into `cy.checkBrokenLinks()` custom command
- ✅ Fail test if broken link count > 0
- ✅ Capture screenshot of each broken link only

---

## 👨‍💻 Author

**Saran Kumar**  
QA Automation Engineer | SDET | Cypress | Playwright | Selenium  
Passionate about building robust and visual automation utilities
