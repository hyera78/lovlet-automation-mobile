exports.config = {
  runner: "local",
  specs: ["./features/register/register.feature"],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Infinix X663B",
      "appium:udid": "0758725231000397",
      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "id.lookin.lovelet.uat",
      "appium:appActivity": "id.lookin.lovelet.MainActivity",
      "appium:noReset": true,
    },
  ],
  logLevel: "debug",
  bail: 0,
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  // services: [
  //   [
  //     "appium",
  //     {
  //       command: "appium",
  //       args: {
  //         address: "127.0.0.1",
  //         port: 4723,
  //         allowCors: true,
  //         basePath: "/wd/hub",
  //       },
  //       waitForStartupTimeout: 120000,
  //     },
  //   ],
  // ],
  hostname: "127.0.0.1", // Pastikan hostname benar
  port: 4723, // Pastikan port sesuai dengan Appium server
  path: "/wd/hub", // Pastikan path benar
  framework: "cucumber", // Menentukan menggunakan Cucumber untuk BDD
  reporters: ["spec", "allure"], // Laporan yang digunakan

  cucumberOpts: {
    require: [
      "./common/support/appiumHelper.js",
      "./features/register/step_definitions/registerStep.js",
    ],
    backtrace: false,
    requireModule: ["@babel/register"],
    dryRun: false,
    failFast: false,
    format: ["json:./reports/cucumber-report.json"],
  },

  beforeSession: function (config, capabilities, specs) {
    console.log("Sesi pengujian dimulai");
  },
  before: function (capabilities, specs) {
    console.log("Sebelum pengujian dimulai");
  },
  after: function (result, capabilities, specs) {
    console.log("Setelah pengujian selesai");
  },
  afterSession: function (config, capabilities, specs) {
    console.log("Sesi pengujian selesai");
  },
};
