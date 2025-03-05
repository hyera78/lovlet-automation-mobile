const { Given, When, Then } = require("@cucumber/cucumber");
const {
  initializeDriver,
  clickElement,
  enterText,
  getDriver,
  elementVisible,
} = require("../../../common/support/appiumHelper");

Given("the app launches", { timeout: 60000 }, async function () {
  await initializeDriver();
  const isAppLaunched = await driver.isAppInstalled(
    "devuat.lookin.lookinid.com"
  );
  if (!isAppLaunched) {
    throw new Error("Aplikasi tidak terpasang pada perangkat.");
  }
});

Given("the user clicks the login button by email", async function () {
  await clickElement(
    "//android.widget.ImageView[@content-desc='Masuk dengan Email']"
  );
});

When("the user inputs {string} and {string}", async function (email, password) {
  await clickElement(
    "//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[1]"
  );

  await enterText(
    "//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[1]",
    email
  );

  await clickElement(
    "//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[2]"
  );

  await enterText(
    "//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[1]/android.widget.EditText[2]",
    password
  );
});

When("the user clicks the enter button", async function () {
  await clickElement('//android.widget.Button[@content-desc="Masuk"]');
  await driver.pause(3000);
});

Then(
  "the user should see the home page with the scroll view",
  async function () {
    await elementVisible(
      '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.ScrollView'
    );
  }
);
