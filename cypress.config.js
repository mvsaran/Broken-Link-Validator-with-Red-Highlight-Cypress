const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://www.redbus.com',
        viewportWidth: 1920,
        viewportHeight: 1080,
        video: false,
        screenshotOnRunFailure: true,
        defaultCommandTimeout: 60000,
        pageLoadTimeout: 60000,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
