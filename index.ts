var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'src/report/cucumber_report.json',
        output: 'src/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        metadata: {
            "Browser": "Chrome",
            "Platform": "Windows 10",
        }
    };

    reporter.generate(options);