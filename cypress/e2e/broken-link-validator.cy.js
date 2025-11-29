// cypress/e2e/broken-link-validator.cy.js

describe('Broken Links Validation with Red Highlight', () => {
    it('Checks all links and highlights broken ones in RED', () => {

        const result = {
            totalChecked: 0,
            validLinks: 0,
            redirectLinks: 0,
            invalidLinks: 0,
            skippedLinks: 0
        }

        cy.visit('http://www.deadlinkcity.com/')

        cy.get('a').then(($links) => {
            cy.log(`Total <a> tags found: ${$links.length}`)
        })

        cy.get('a').each(($link) => {
            const hrefUrl = $link.prop('href') || $link.attr('href')

            // 1️⃣ Skip empty/null/non-http(s) links
            if (!hrefUrl || !hrefUrl.trim().toLowerCase().startsWith('http')) {
                result.skippedLinks++
                return
            }

            // 2️⃣ Optionally: treat DeadLinkCity's own error-page.asp as broken,
            //    but DON'T send any request (to avoid weird server behaviour)
            if (hrefUrl.includes('error-page.asp?e=')) {
                result.invalidLinks++
                cy.log(`${hrefUrl} -> simulated error page : ❌ BROKEN (no request sent)`)

                // 🔴 Visually mark these as broken
                cy.wrap($link)
                    .invoke('css', 'border', '3px solid red')
                    .invoke('css', 'background-color', '#ffcccc')

                return
            }

            result.totalChecked++

            // 3️⃣ Use fetch instead of cy.request to avoid Cypress low-level failures
            cy.window().then((win) => {
                return win.fetch(hrefUrl, {
                    method: 'GET',
                    redirect: 'manual'   // we want to see 3xx
                })
                    .then((response) => {
                        const status = response.status

                        if (status >= 200 && status < 300) {
                            cy.log(`${hrefUrl} -> ${status} : ✅ VALID`)
                            result.validLinks++
                        } else if (status >= 300 && status < 400) {
                            cy.log(`${hrefUrl} -> ${status} : 🔁 REDIRECT`)
                            result.redirectLinks++
                        } else {
                            cy.log(`${hrefUrl} -> ${status} : ❌ BROKEN`)
                            result.invalidLinks++

                            // 🔴 Highlight broken link in red
                            cy.wrap($link)
                                .invoke('css', 'border', '3px solid red')
                                .invoke('css', 'background-color', '#ffcccc')
                        }
                    })
                    .catch((err) => {
                        // Network / CORS / DNS etc. – treat as broken, but DON'T fail the test
                        cy.log(`${hrefUrl} -> fetch error: ${err.message} : ❌ BROKEN`)
                        result.invalidLinks++

                        cy.wrap($link)
                            .invoke('css', 'border', '3px solid red')
                            .invoke('css', 'background-color', '#ffcccc')
                    })
            })
        }).then(() => {
            // 4️⃣ Summary after all checks
            cy.log('===== ✅ Link Check Summary =====')
            cy.log(`Links Checked (http/https): ${result.totalChecked}`)
            cy.log(`Valid Links: ${result.validLinks}`)
            cy.log(`Redirect Links: ${result.redirectLinks}`)
            cy.log(`Broken Links: ${result.invalidLinks}`)
            cy.log(`Skipped Links (empty / non-http / simulated error-page): ${result.skippedLinks}`)

            // ❗ Keep this commented if you don't want the test to fail when broken links exist
            // expect(result.invalidLinks, 'Broken links found').to.eq(0)
        })
    })
})
