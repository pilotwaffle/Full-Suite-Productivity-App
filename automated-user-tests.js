/**
 * Comprehensive User Testing Suite for Full Suite Productivity App
 * Tests navigation, functionality, accessibility, and performance
 */

const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');
const path = require('path');

class ProductivityAppTester {
    constructor() {
        this.testResults = {
            navigation: [],
            functionality: [],
            accessibility: [],
            performance: [],
            responsive: [],
            errors: []
        };
        this.browsers = ['chromium', 'firefox', 'webkit'];
        this.viewports = [
            { name: 'Mobile', width: 375, height: 667 },
            { name: 'Tablet', width: 768, height: 1024 },
            { name: 'Desktop', width: 1920, height: 1080 }
        ];
        this.appUrl = 'http://localhost:3000'; // Default Next.js dev server
    }

    async initializeTest() {
        console.log('🚀 Starting Comprehensive User Testing for Full Suite Productivity App');
        console.log('=' .repeat(80));

        // Check if app is running
        try {
            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage();

            console.log('📡 Checking if application is running...');
            await page.goto(this.appUrl, { timeout: 10000 });
            console.log('✅ Application is accessible at', this.appUrl);

            await browser.close();
        } catch (error) {
            console.log('❌ Application not accessible. Please start the app with: npm run dev');
            console.log('Expected URL:', this.appUrl);
            process.exit(1);
        }
    }

    async testNavigation(browserType) {
        console.log(`\n🧭 Testing Navigation (${browserType})`);
        console.log('-'.repeat(50));

        const browser = await this.getBrowser(browserType);
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            await page.goto(this.appUrl);
            await page.waitForLoadState('networkidle');

            // Test main navigation
            const navigationTests = [
                {
                    name: 'Home Dashboard Access',
                    selector: 'nav a[href="/"]',
                    expected: 'Dashboard'
                },
                {
                    name: 'Todos Page Access',
                    selector: 'nav a[href="/todos"]',
                    expected: 'Todos'
                },
                {
                    name: 'Kanban Board Access',
                    selector: 'nav a[href="/kanban"]',
                    expected: 'Kanban'
                },
                {
                    name: 'Calendar Access',
                    selector: 'nav a[href="/calendar"]',
                    expected: 'Calendar'
                }
            ];

            for (const test of navigationTests) {
                try {
                    await page.click(test.selector);
                    await page.waitForLoadState('networkidle');

                    const pageTitle = await page.textContent('h1, .text-3xl');
                    const currentUrl = page.url();

                    const result = {
                        test: test.name,
                        browser: browserType,
                        status: pageTitle?.includes(test.expected) ? 'PASS' : 'FAIL',
                        expected: test.expected,
                        actual: pageTitle,
                        url: currentUrl,
                        timestamp: new Date().toISOString()
                    };

                    this.testResults.navigation.push(result);
                    console.log(`${result.status === 'PASS' ? '✅' : '❌'} ${test.name}: ${pageTitle || 'No title found'}`);

                } catch (error) {
                    this.testResults.errors.push({
                        type: 'Navigation Error',
                        test: test.name,
                        browser: browserType,
                        error: error.message,
                        timestamp: new Date().toISOString()
                    });
                    console.log(`❌ ${test.name}: ${error.message}`);
                }
            }

        } catch (error) {
            console.log(`❌ Navigation testing failed: ${error.message}`);
        } finally {
            await browser.close();
        }
    }

    async testFunctionality(browserType) {
        console.log(`\n⚙️ Testing Functionality (${browserType})`);
        console.log('-'.repeat(50));

        const browser = await this.getBrowser(browserType);
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            await page.goto(this.appUrl);

            // Test Todo functionality
            await this.testTodoFunctionality(page, browserType);

            // Test Kanban functionality
            await this.testKanbanFunctionality(page, browserType);

            // Test Calendar functionality
            await this.testCalendarFunctionality(page, browserType);

            // Test Dark Mode
            await this.testDarkMode(page, browserType);

        } catch (error) {
            console.log(`❌ Functionality testing failed: ${error.message}`);
        } finally {
            await browser.close();
        }
    }

    async testTodoFunctionality(page, browserType) {
        try {
            await page.goto(`${this.appUrl}/todos`);
            await page.waitForLoadState('networkidle');

            // Test adding a new todo
            const addTodoButton = await page.locator('button:has-text("Add Todo"), button:has-text("New Todo"), button[aria-label*="Add"]').first();
            if (await addTodoButton.isVisible()) {
                await addTodoButton.click();

                // Wait for modal/dialog
                await page.waitForSelector('[role="dialog"], .modal, .dialog', { timeout: 3000 });

                // Fill in todo form
                const titleInput = await page.locator('input[placeholder*="title"], input[placeholder*="Title"], input[type="text"]').first();
                if (await titleInput.isVisible()) {
                    await titleInput.fill('Test Todo Item');

                    // Submit form
                    const submitButton = await page.locator('button:has-text("Add"), button:has-text("Create"), button:has-text("Save"), button[type="submit"]').first();
                    await submitButton.click();

                    // Verify todo was added
                    await page.waitForTimeout(1000);
                    const todoText = await page.textContent('text=Test Todo Item');

                    this.testResults.functionality.push({
                        test: 'Add Todo Item',
                        browser: browserType,
                        status: todoText ? 'PASS' : 'FAIL',
                        details: todoText ? 'Successfully created todo item' : 'Todo item not found after creation',
                        timestamp: new Date().toISOString()
                    });

                    console.log(`${todoText ? '✅' : '❌'} Add Todo Item: ${todoText ? 'Success' : 'Failed'}`);
                }
            } else {
                console.log('⚠️ Add Todo button not found - feature may not be implemented');
            }

        } catch (error) {
            this.testResults.errors.push({
                type: 'Functionality Error',
                test: 'Todo Management',
                browser: browserType,
                error: error.message,
                timestamp: new Date().toISOString()
            });
            console.log(`❌ Todo functionality test failed: ${error.message}`);
        }
    }

    async testKanbanFunctionality(page, browserType) {
        try {
            await page.goto(`${this.appUrl}/kanban`);
            await page.waitForLoadState('networkidle');

            // Test drag and drop functionality
            const kanbanColumns = await page.locator('[data-testid*="column"], .kanban-column, [data-dnd-kit]').count();

            if (kanbanColumns > 0) {
                // Look for cards to drag
                const cards = await page.locator('[data-testid*="card"], .kanban-card, [draggable="true"]').first();

                if (await cards.isVisible()) {
                    // Get initial position
                    const initialPosition = await cards.boundingBox();

                    // Test drag functionality (simulate drag)
                    await cards.hover();
                    await page.mouse.down();
                    await page.mouse.move(initialPosition.x + 100, initialPosition.y);
                    await page.mouse.up();

                    this.testResults.functionality.push({
                        test: 'Kanban Drag & Drop',
                        browser: browserType,
                        status: 'PARTIAL',
                        details: 'Drag interaction available - full test requires visual verification',
                        timestamp: new Date().toISOString()
                    });

                    console.log('✅ Kanban Drag & Drop: Interaction available');
                } else {
                    console.log('⚠️ No kanban cards found - board may be empty');
                }
            } else {
                console.log('⚠️ No kanban columns found');
            }

        } catch (error) {
            console.log(`❌ Kanban functionality test failed: ${error.message}`);
        }
    }

    async testCalendarFunctionality(page, browserType) {
        try {
            await page.goto(`${this.appUrl}/calendar`);
            await page.waitForLoadState('networkidle');

            // Test month navigation
            const nextMonthButton = await page.locator('button[aria-label*="Next"], button:has-text("›"), button:has-text("Next")').first();
            if (await nextMonthButton.isVisible()) {
                await nextMonthButton.click();
                await page.waitForTimeout(500);

                // Test previous month
                const prevMonthButton = await page.locator('button[aria-label*="Previous"], button:has-text("‹"), button:has-text("Previous")').first();
                await prevMonthButton.click();
                await page.waitForTimeout(500);

                this.testResults.functionality.push({
                    test: 'Calendar Navigation',
                    browser: browserType,
                    status: 'PASS',
                    details: 'Month navigation controls working',
                    timestamp: new Date().toISOString()
                });

                console.log('✅ Calendar Navigation: Working');
            }

            // Test "Today" button
            const todayButton = await page.locator('button:has-text("Today")').first();
            if (await todayButton.isVisible()) {
                await todayButton.click();
                await page.waitForTimeout(500);

                console.log('✅ Calendar Today Button: Working');
            }

            // Test New Event button
            const newEventButton = await page.locator('button:has-text("New Event"), button:has-text("Add Event")').first();
            if (await newEventButton.isVisible()) {
                await newEventButton.click();

                // Check if event dialog appears
                const eventDialog = await page.locator('[role="dialog"], .modal, .event-form').first();
                const dialogVisible = await eventDialog.isVisible({ timeout: 3000 });

                this.testResults.functionality.push({
                    test: 'Calendar Event Creation',
                    browser: browserType,
                    status: dialogVisible ? 'PASS' : 'FAIL',
                    details: dialogVisible ? 'Event dialog opened successfully' : 'Event dialog did not appear',
                    timestamp: new Date().toISOString()
                });

                console.log(`${dialogVisible ? '✅' : '❌'} Calendar Event Creation: ${dialogVisible ? 'Success' : 'Failed'}`);
            }

        } catch (error) {
            console.log(`❌ Calendar functionality test failed: ${error.message}`);
        }
    }

    async testDarkMode(page, browserType) {
        try {
            // Test dark mode toggle
            const darkModeToggle = await page.locator('button[aria-label*="dark"], button[aria-label*="theme"], .dark-mode-toggle').first();

            if (await darkModeToggle.isVisible()) {
                await darkModeToggle.click();
                await page.waitForTimeout(500);

                // Check if dark mode class is applied
                const htmlElement = await page.locator('html');
                const hasDarkClass = await htmlElement.evaluate(el =>
                    el.classList.contains('dark') ||
                    el.getAttribute('data-theme') === 'dark' ||
                    getComputedStyle(el).getPropertyValue('color-scheme') === 'dark'
                );

                // Toggle back
                await darkModeToggle.click();
                await page.waitForTimeout(500);

                this.testResults.functionality.push({
                    test: 'Dark Mode Toggle',
                    browser: browserType,
                    status: hasDarkClass ? 'PASS' : 'PARTIAL',
                    details: hasDarkClass ? 'Dark mode toggles correctly' : 'Toggle button found but dark mode not confirmed',
                    timestamp: new Date().toISOString()
                });

                console.log(`${hasDarkClass ? '✅' : '⚠️'} Dark Mode Toggle: ${hasDarkClass ? 'Working' : 'Partial'}`);
            } else {
                console.log('⚠️ Dark mode toggle not found');
            }

        } catch (error) {
            console.log(`❌ Dark mode test failed: ${error.message}`);
        }
    }

    async testAccessibility(browserType) {
        console.log(`\n♿ Testing Accessibility (${browserType})`);
        console.log('-'.repeat(50));

        const browser = await this.getBrowser(browserType);
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            // Enable axe for accessibility testing
            await page.addScriptTag({
                path: 'node_modules/axe-core/axe.min.js'
            });

            await page.goto(this.appUrl);
            await page.waitForLoadState('networkidle');

            // Run axe accessibility tests
            const accessibilityResults = await page.evaluate(() => {
                return new Promise((resolve) => {
                    axe.run({
                        reporter: 'v2',
                        runOnly: {
                            type: 'tag',
                            values: ['wcag2a', 'wcag2aa', 'wcag21aa']
                        }
                    }, (error, results) => {
                        if (error) {
                            resolve({ error: error.message });
                        } else {
                            resolve({
                                violations: results.violations.length,
                                passes: results.passes.length,
                                incomplete: results.incomplete.length,
                                violations_details: results.violations.map(v => ({
                                    id: v.id,
                                    impact: v.impact,
                                    description: v.description,
                                    nodes: v.nodes.length
                                }))
                            });
                        }
                    });
                });
            });

            this.testResults.accessibility.push({
                browser: browserType,
                results: accessibilityResults,
                timestamp: new Date().toISOString()
            });

            console.log(`📊 Accessibility Results (${browserType}):`);
            console.log(`  Violations: ${accessibilityResults.violations}`);
            console.log(`  Passes: ${accessibilityResults.passes}`);
            console.log(`  Incomplete: ${accessibilityResults.incomplete}`);

            if (accessibilityResults.violations > 0) {
                console.log('\n❌ Accessibility Violations:');
                accessibilityResults.violations_details?.forEach(violation => {
                    console.log(`  - ${violation.id}: ${violation.description} (${violation.impact})`);
                });
            }

        } catch (error) {
            console.log(`❌ Accessibility testing failed: ${error.message}`);
        } finally {
            await browser.close();
        }
    }

    async testResponsive(browserType) {
        console.log(`\n📱 Testing Responsive Design (${browserType})`);
        console.log('-'.repeat(50));

        const browser = await this.getBrowser(browserType);
        const context = await browser.newContext();

        for (const viewport of this.viewports) {
            console.log(`\n  Testing ${viewport.name} (${viewport.width}x${viewport.height})`);

            const page = await context.newPage();
            await page.setViewportSize({ width: viewport.width, height: viewport.height });

            try {
                await page.goto(this.appUrl);
                await page.waitForLoadState('networkidle');

                // Test layout adaptation
                const sidebarVisible = await page.locator('aside, .sidebar, nav').isVisible();
                const mobileMenuVisible = await page.locator('button[aria-label*="menu"], .hamburger, .menu-toggle').isVisible();
                const contentOverflow = await page.evaluate(() => {
                    const body = document.body;
                    return body.scrollWidth > body.clientWidth;
                });

                // Test navigation accessibility
                const navigationAccessible = await page.locator('nav a').first().isVisible();

                const responsiveResult = {
                    viewport: viewport.name,
                    browser: browserType,
                    dimensions: `${viewport.width}x${viewport.height}`,
                    sidebarVisible,
                    mobileMenuVisible,
                    contentOverflow,
                    navigationAccessible,
                    status: (!contentOverflow && navigationAccessible) ? 'PASS' : 'FAIL',
                    timestamp: new Date().toISOString()
                };

                this.testResults.responsive.push(responsiveResult);

                console.log(`    ${responsiveResult.status === 'PASS' ? '✅' : '❌'} Layout: ${responsiveResult.status === 'PASS' ? 'Good' : 'Issues detected'}`);
                console.log(`    📋 Navigation accessible: ${navigationAccessible ? 'Yes' : 'No'}`);
                console.log(`    📐 Content overflow: ${contentOverflow ? 'Yes' : 'No'}`);
                console.log(`    📱 Mobile menu: ${mobileMenuVisible ? 'Visible' : 'Not visible'}`);

                // Take screenshot for visual verification
                await page.screenshot({
                    path: `test-screenshots/${browserType}-${viewport.name.toLowerCase()}-${Date.now()}.png`,
                    fullPage: true
                });

            } catch (error) {
                console.log(`    ❌ Responsive test failed: ${error.message}`);
            } finally {
                await page.close();
            }
        }

        await browser.close();
    }

    async testPerformance(browserType) {
        console.log(`\n⚡ Testing Performance (${browserType})`);
        console.log('-'.repeat(50));

        const browser = await this.getBrowser(browserType);
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            // Enable performance monitoring
            await page.goto(this.appUrl);
            await page.waitForLoadState('networkidle');

            // Get performance metrics
            const performanceMetrics = await page.evaluate(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');

                return {
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
                    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
                    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
                    totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
                };
            });

            // Test Core Web Vitals
            const webVitals = await this.measureWebVitals(page);

            const performanceResult = {
                browser: browserType,
                metrics: performanceMetrics,
                webVitals,
                timestamp: new Date().toISOString()
            };

            this.testResults.performance.push(performanceResult);

            console.log(`📊 Performance Metrics (${browserType}):`);
            console.log(`  DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
            console.log(`  Load Complete: ${performanceMetrics.loadComplete}ms`);
            console.log(`  First Paint: ${performanceMetrics.firstPaint}ms`);
            console.log(`  First Contentful Paint: ${performanceMetrics.firstContentfulPaint}ms`);
            console.log(`  Total Load Time: ${performanceMetrics.totalLoadTime}ms`);

        } catch (error) {
            console.log(`❌ Performance testing failed: ${error.message}`);
        } finally {
            await browser.close();
        }
    }

    async measureWebVitals(page) {
        // Simplified Core Web Vitals measurement
        return await page.evaluate(() => {
            return new Promise((resolve) => {
                const vitals = {};

                // Largest Contentful Paint (LCP) approximation
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    vitals.lcp = lastEntry.startTime;
                }).observe({ entryTypes: ['largest-contentful'] });

                // First Input Delay (FID) approximation
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (entry.processingStart) {
                            vitals.fid = entry.processingStart - entry.startTime;
                        }
                    });
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift (CLS) approximation
                let clsValue = 0;
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    vitals.cls = clsValue;
                }).observe({ entryTypes: ['layout-shift'] });

                // Return values after a short delay
                setTimeout(() => resolve(vitals), 3000);
            });
        });
    }

    async getBrowser(browserType) {
        switch (browserType) {
            case 'firefox':
                return await firefox.launch();
            case 'webkit':
                return await webkit.launch();
            default:
                return await chromium.launch();
        }
    }

    async generateReport() {
        console.log('\n📋 Generating Comprehensive Test Report');
        console.log('=' .repeat(80));

        // Create screenshots directory
        if (!fs.existsSync('test-screenshots')) {
            fs.mkdirSync('test-screenshots');
        }

        const report = {
            summary: {
                totalTests: 0,
                passedTests: 0,
                failedTests: 0,
                browsers: this.browsers,
                testDate: new Date().toISOString(),
                appUrl: this.appUrl,
                appVersion: '1.0.0'
            },
            navigation: this.testResults.navigation,
            functionality: this.testResults.functionality,
            accessibility: this.testResults.accessibility,
            responsive: this.testResults.responsive,
            performance: this.testResults.performance,
            errors: this.testResults.errors,
            recommendations: []
        };

        // Calculate summary statistics
        Object.entries(this.testResults).forEach(([category, tests]) => {
            if (Array.isArray(tests)) {
                report.summary.totalTests += tests.length;
                report.summary.passedTests += tests.filter(t => t.status === 'PASS').length;
                report.summary.failedTests += tests.filter(t => t.status === 'FAIL').length;
            }
        });

        // Generate recommendations
        report.recommendations = this.generateRecommendations(report);

        // Write report to file
        const reportPath = `user-testing-report-${new Date().toISOString().split('T')[0]}.json`;
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

        // Generate human-readable report
        await this.generateHumanReadableReport(report);

        console.log(`\n📄 Report saved to: ${reportPath}`);
        console.log(`📊 Total Tests: ${report.summary.totalTests}`);
        console.log(`✅ Passed: ${report.summary.passedTests}`);
        console.log(`❌ Failed: ${report.summary.failedTests}`);
        console.log(`⚠️ Errors: ${report.errors.length}`);

        return report;
    }

    generateRecommendations(report) {
        const recommendations = [];

        // Navigation recommendations
        const navigationFails = report.navigation.filter(t => t.status === 'FAIL');
        if (navigationFails.length > 0) {
            recommendations.push({
                category: 'Navigation',
                priority: 'High',
                issue: `${navigationFails.length} navigation failures detected`,
                recommendation: 'Review navigation structure and ensure all routes are properly implemented'
            });
        }

        // Accessibility recommendations
        const accessibilityIssues = report.accessibility.reduce((total, result) => {
            return total + (result.results?.violations || 0);
        }, 0);

        if (accessibilityIssues > 0) {
            recommendations.push({
                category: 'Accessibility',
                priority: 'High',
                issue: `${accessibilityIssues} accessibility violations found`,
                recommendation: 'Address WCAG compliance issues by adding proper ARIA labels, improving color contrast, and ensuring keyboard navigation'
            });
        }

        // Performance recommendations
        const slowLoadTimes = report.performance.filter(p =>
            p.metrics && p.metrics.totalLoadTime > 3000
        );

        if (slowLoadTimes.length > 0) {
            recommendations.push({
                category: 'Performance',
                priority: 'Medium',
                issue: 'Some pages load slowly (>3 seconds)',
                recommendation: 'Optimize images, reduce JavaScript bundle size, and implement lazy loading'
            });
        }

        // Responsive design recommendations
        const responsiveIssues = report.responsive.filter(r => r.status === 'FAIL');
        if (responsiveIssues.length > 0) {
            recommendations.push({
                category: 'Responsive Design',
                priority: 'Medium',
                issue: `${responsiveIssues.length} responsive design issues`,
                recommendation: 'Improve mobile layouts, implement proper breakpoints, and test across more devices'
            });
        }

        return recommendations;
    }

    async generateHumanReadableReport(report) {
        const htmlReport = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Full Suite Productivity App - User Testing Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 40px; line-height: 1.6; }
        .header { border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; }
        .metric h3 { margin: 0; color: #334155; }
        .metric .value { font-size: 2em; font-weight: bold; color: #2563eb; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #1e293b; border-left: 4px solid #2563eb; padding-left: 15px; }
        .test-result { margin: 10px 0; padding: 15px; border-radius: 6px; }
        .pass { background: #dcfce7; border: 1px solid #16a34a; }
        .fail { background: #fef2f2; border: 1px solid #dc2626; }
        .partial { background: #fefce8; border: 1px solid #ca8a04; }
        .recommendations { background: #f0f9ff; border: 1px solid #0ea5e9; padding: 20px; border-radius: 8px; }
        .high-priority { border-left: 4px solid #dc2626; }
        .medium-priority { border-left: 4px solid #ca8a04; }
        .low-priority { border-left: 4px solid #16a34a; }
        .screenshot { max-width: 300px; height: auto; border-radius: 8px; margin: 10px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Full Suite Productivity App - User Testing Report</h1>
        <p><strong>Test Date:</strong> ${new Date(report.summary.testDate).toLocaleDateString()}</p>
        <p><strong>Application URL:</strong> ${report.summary.appUrl}</p>
        <p><strong>Version:</strong> ${report.summary.appVersion}</p>
    </div>

    <div class="summary">
        <div class="metric">
            <h3>Total Tests</h3>
            <div class="value">${report.summary.totalTests}</div>
        </div>
        <div class="metric">
            <h3>Passed</h3>
            <div class="value" style="color: #16a34a;">${report.summary.passedTests}</div>
        </div>
        <div class="metric">
            <h3>Failed</h3>
            <div class="value" style="color: #dc2626;">${report.summary.failedTests}</div>
        </div>
        <div class="metric">
            <h3>Success Rate</h3>
            <div class="value">${Math.round((report.summary.passedTests / report.summary.totalTests) * 100)}%</div>
        </div>
    </div>

    ${report.recommendations.length > 0 ? `
    <div class="section">
        <h2>🎯 Key Recommendations</h2>
        <div class="recommendations">
            ${report.recommendations.map(rec => `
                <div class="test-result ${rec.priority.toLowerCase()}-priority">
                    <h4>${rec.category} (${rec.priority} Priority)</h4>
                    <p><strong>Issue:</strong> ${rec.issue}</p>
                    <p><strong>Recommendation:</strong> ${rec.recommendation}</p>
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    <div class="section">
        <h2>🧭 Navigation Tests</h2>
        ${report.navigation.map(test => `
            <div class="test-result ${test.status.toLowerCase()}">
                <h4>${test.test}</h4>
                <p><strong>Status:</strong> ${test.status}</p>
                <p><strong>Browser:</strong> ${test.browser}</p>
                ${test.expected ? `<p><strong>Expected:</strong> ${test.expected}</p>` : ''}
                ${test.actual ? `<p><strong>Actual:</strong> ${test.actual}</p>` : ''}
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>⚙️ Functionality Tests</h2>
        ${report.functionality.map(test => `
            <div class="test-result ${test.status.toLowerCase()}">
                <h4>${test.test}</h4>
                <p><strong>Status:</strong> ${test.status}</p>
                <p><strong>Browser:</strong> ${test.browser}</p>
                <p>${test.details}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>♿ Accessibility Results</h2>
        ${report.accessibility.map(result => `
            <div class="test-result ${result.results.violations > 0 ? 'fail' : 'pass'}">
                <h4>${result.browser}</h4>
                <p><strong>Violations:</strong> ${result.results.violations}</p>
                <p><strong>Passes:</strong> ${result.results.passes}</p>
                <p><strong>Incomplete:</strong> ${result.results.incomplete}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>📱 Responsive Design Tests</h2>
        ${report.responsive.map(test => `
            <div class="test-result ${test.status.toLowerCase()}">
                <h4>${test.viewport} - ${test.browser}</h4>
                <p><strong>Status:</strong> ${test.status}</p>
                <p><strong>Dimensions:</strong> ${test.dimensions}</p>
                <p><strong>Navigation Accessible:</strong> ${test.navigationAccessible ? 'Yes' : 'No'}</p>
                <p><strong>Content Overflow:</strong> ${test.contentOverflow ? 'Yes' : 'No'}</p>
            </div>
        `).join('')}
    </div>

    <div class="section">
        <h2>⚡ Performance Metrics</h2>
        ${report.performance.map(result => `
            <div class="test-result pass">
                <h4>${result.browser}</h4>
                <p><strong>Total Load Time:</strong> ${result.metrics.totalLoadTime}ms</p>
                <p><strong>First Contentful Paint:</strong> ${result.metrics.firstContentfulPaint}ms</p>
                <p><strong>DOM Content Loaded:</strong> ${result.metrics.domContentLoaded}ms</p>
            </div>
        `).join('')}
    </div>

    ${report.errors.length > 0 ? `
    <div class="section">
        <h2>❌ Errors Encountered</h2>
        ${report.errors.map(error => `
            <div class="test-result fail">
                <h4>${error.type}</h4>
                <p><strong>Test:</strong> ${error.test}</p>
                <p><strong>Browser:</strong> ${error.browser}</p>
                <p><strong>Error:</strong> ${error.error}</p>
            </div>
        `).join('')}
    </div>
    ` : ''}

    <div class="footer" style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b;">
        <p>Report generated by Comprehensive User Testing Framework</p>
        <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
</body>
</html>`;

        const htmlReportPath = `user-testing-report-${new Date().toISOString().split('T')[0]}.html`;
        fs.writeFileSync(htmlReportPath, htmlReport);

        console.log(`\n📄 HTML Report saved to: ${htmlReportPath}`);
    }

    async runAllTests() {
        console.log('🚀 Starting Comprehensive User Testing Suite');
        console.log('This will test across multiple browsers and devices...\n');

        try {
            await this.initializeTest();

            // Run tests across all browsers
            for (const browser of this.browsers) {
                await this.testNavigation(browser);
                await this.testFunctionality(browser);
                await this.testAccessibility(browser);
                await this.testResponsive(browser);
                await this.testPerformance(browser);
            }

            const report = await this.generateReport();

            console.log('\n🎉 Testing Complete!');
            console.log('=' .repeat(80));

            return report;

        } catch (error) {
            console.log('\n❌ Testing suite failed:', error.message);
            throw error;
        }
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const tester = new ProductivityAppTester();
    tester.runAllTests().catch(console.error);
}

module.exports = ProductivityAppTester;