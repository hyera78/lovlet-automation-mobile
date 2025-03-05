const { Given, When, Then } = require("@cucumber/cucumber");
const {
  initializeDriver,
  clickElement,
  enterText,
  getDriver,
  getOTP,
  generateAndSaveEmail,
  elementVisible,
  scrollDown,
  slideDynamic,
} = require("../../../common/support/appiumHelper");
const {
  click,
} = require("appium-uiautomator2-driver/build/lib/commands/element");

Given("the app launches", { timeout: 60000 }, async function () {
  await initializeDriver();
  const isAppLaunched = await driver.isAppInstalled("id.lookin.lovelet.uat");
  if (!isAppLaunched) {
    throw new Error("Aplikasi tidak terpasang pada perangkat.");
  }
});

Then("email generate", async function () {
  await generateAndSaveEmail();
});

When("the user clicks the start button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Start']");
});

Then("the user is on the registration page", async function () {
  await elementVisible("//android.widget.EditText");
});

Then("the user manually inputs their email", async function () {
  await new Promise((resolve) => setTimeout(resolve, 10000));
});

When("the user clicks the next button in input email", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

Then("the user is on the OTP page", async function () {
  await elementVisible("//android.widget.EditText");
});

Then("the user receives the OTP", async function () {
  try {
    const otp = await getOTP();
    console.log("Isi email:", otp);
  } catch (error) {
    console.error("Isi email error", error.message);
  }
});

Then("the user manually inputs the OTP", async function () {
  await browser.pause(6000);
});

// Then("the user clicks the next button in input otp", async function () {
//   await clickElement("//android.widget.Button[@content-desc='Next']");
// });

Then("the user sees the pop up", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='Account not found']"
  );
});

When("the user clicks create button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Create']");
});

Then("the user is on the face verification page", async function () {
  await elementVisible("//android.view.View[@content-desc='Welcome!']");
});

When("the user click verify button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Verify']");
});

Then("the user face verification", async function () {
  await browser.pause(5000);
});

When(
  "the user finish the verification user will be in page verification successfully",
  async function () {
    try {
      console.log("Mencari elemen 'You're verified!'...");
      const verifiedElement = await driver.$(
        '//android.view.View[@content-desc="You\'re verified!"]'
      );
      console.log("Elemen ditemukan:", await verifiedElement.isDisplayed());
    } catch (error) {
      throw new Error(
        `Elemen "You're verified!" tidak ditemukan: ${error.message}`
      );
    }
  }
);

Then("the user click next button", async function () {
  try {
    await clickElement("//android.widget.Button[@content-desc='Next']");
  } catch (error) {
    throw new Error(`Gagal mengklik tombol Next: ${error.message}`);
  }
});

When("the user is on input name page", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='What should we call you?']"
  );
});

Then("the user input {string}", async function (name) {
  await clickElement("//android.widget.EditText");
  await enterText("//android.widget.EditText", name);
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on input birthday page", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='When is the birthday?']"
  );
});

Then("the user click input birthday", async function () {
  await clickElement(
    "//android.view.View[@content-desc='Birthday']/android.view.View"
  );
});

Then("the user select the birthday date", async function () {
  await clickElement(
    "//android.widget.Button[@content-desc='1, Monday, January 1, 2007']"
  );
});

Then("the user click ok", async function () {
  await clickElement("//android.widget.Button[@content-desc='OK']");
});

Then("the user see data in input", async function () {
  await elementVisible("//android.view.View[@text=01/01/2007']");
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user see pop up age and zodiac", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='You're 18 and a Capricorn ']"
  );
});

Then("the user click close button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Close']");
});

When("the user see pop up age and zodiac again", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='You're 18 and a Capricorn ']"
  );
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on gender select page", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='What gender you identify as?']"
  );
});

Then("the user click dropdown", async function () {
  await clickElement("//android.widget.Button[@content-desc='Select Gender']");
});

Then("the user select the gender", async function () {
  await clickElement("//android.view.View[@content-desc='Man']");
});

Then("the user see the data in input", async function () {
  await clickElement("//android.widget.Button[@content-desc='Man']");
});

Then("the user click toggle on hide gender profile", async function () {
  await clickElement("//android.widget.Switch");
});

Then("the user click toggle off hide gender profile", async function () {
  await clickElement("//android.widget.Switch");
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on upload photo page", async function () {
  await elementVisible("//android.view.View[@content-desc='Pick the photos!']");
});

Then("the user click icon +", async function () {
  await clickElement(
    "//android.widget.FrameLayout[@resource-id='android:id/content]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View[1]"
  );
});

Then("the user click gallery", async function () {
  await clickElement("//android.widget.ImageView[@content-desc='Gallery']");
});

Then("the user select photo", async function () {
  await clickElement(
    "(//android.widget.ImageView[@resource-id='com.google.android.providers.media.module:id/icon_thumbnail'])[1]"
  );
});

Then(
  "the user wait process uploading the photo",
  { timeout: 60000 },
  async function () {}
);

Then("the user click icon + again", async function () {
  await clickElement(
    "//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View[1]"
  );
});

Then("the user click camera", async function () {
  await clickElement("//android.widget.ImageView[@content-desc='Camera']");
});

Then("the user take picture", async function () {
  await clickElement(
    "//android.widget.ImageView[@resource-id='com.transsion.camera:id/shutter_button']"
  );
});

Then(
  "the user wait process uploading the photo",
  { timeout: 60000 },
  async function () {}
);

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on page Account Created", async function () {
  await elementVisible("//android.view.View[@content-desc='Account created']");
});

Then("the user click begin", async function () {
  await clickElement("//android.widget.Button[@content-desc='Begin']");
});

When("the user is on what are you looking for page", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='What are you looking for?']"
  );
});

Then("the user click Not sure yet", async function () {
  await clickElement("//android.widget.Button[@content-desc='Not sure yet']");
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on what do you want to see", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='What do you want to see?']"
  );
});

Then("the user click Woman", async function () {
  await clickElement("//android.widget.Button[@content-desc='Woman']");
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on About you page", async function () {
  await clickElement("//android.view.View[@content-desc='About you!']");
});

Then("the user select the Quality Time", async function () {
  await clickElement("//android.widget.Button[@content-desc='Quality time']");
});

Then("the user select the Regularly", async function () {
  await clickElement("(//android.widget.Button[@content-desc='Regularly'])[1]");
});

Then("the user select never", async function () {
  await clickElement("(//android.widget.Button[@content-desc='Never'])[2]");
});

Then("the user scroll down", async function () {
  await scrollDown();
});

Then("the user select never", async function () {
  await clickElement("(//android.widget.Button[@content-desc='Never'])[3]");
});

Then("the user click dropdown whats your height", async function () {
  await clickElement(
    "//android.widget.ImageView[@content-desc='What's your height? Select height']"
  );
});

Then("the user select the height", async function () {
  await clickElement("//android.view.View[@content-desc='161 cm']");
});

Then("the user see the input change", async function () {
  await elementVisible(
    "//android.widget.ImageView[@content-desc='What's your height? 161 cm']"
  );
});

Then("the user click select next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on more about you page", async function () {
  await elementVisible("//android.view.View[@content-desc='More about you!']");
});

Then("the user select graduate degree", async function () {
  await clickElement(
    "//android.widget.Button[@content-desc='Graduate degree']"
  );
});

Then(
  "the user click dropdown whats industry do you work in",
  async function () {
    await clickElement(
      "//android.widget.ImageView[@content-desc='What industry do you work in? Select industry']"
    );
  }
);

Then("the user select the government", async function () {
  await clickElement("//android.view.View[@content-desc='Government']");
});

Then("the user see the input change", async function () {
  await elementVisible(
    "//android.widget.ImageView[@content-desc='What industry do you work in? Government']"
  );
});

Then("the user select the religion", async function () {
  await clickElement("//android.widget.Button[@content-desc='Islam']");
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on vibe page", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='What is the vibe?']"
  );
});

Then("the user select the running in sports", async function () {
  await clickElement("//android.widget.Button[@content-desc='Running']");
});

Then("the user select the cat in pets", async function () {
  await clickElement("//android.widget.Button[@content-desc='Cat']");
});

Then("the user scroll down", async function () {
  await scrollDown();
});

Then("the user select estj in mbti", async function () {
  await clickElement("//android.widget.Button[@content-desc='ESTJ']");
});

Then("the user select photography in interest", async function () {
  await clickElement("//android.widget.Button[@content-desc='Photography']");
});

Then("the user select next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on intrigue page", async function () {
  await elementVisible("//android.view.View[@content-desc='Intrigue them!']");
});

Then("the user click input the bio", async function () {
  await clickElement("//android.widget.EditText");
});

Then("the user input {string}", async function (text) {
  await enterText("//android.widget.EditText", text);
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on age range page", async function () {
  await elementVisible("//android.view.View[@content-desc='Age range?']");
});

Then("the user move the slider left to 18", async function () {
  await slideDynamic(
    "//android.widget.SeekBar[@content-desc='3%']",
    "//android.widget.SeekBar[@content-desc='0%']"
  );
});

Then("the user move the slider right to 80", async function () {
  await slideDynamic(
    "//android.widget.SeekBar[@content-desc='11%']",
    "//android.widget.SeekBar[@content-desc='100%']"
  );
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on distance page", async function () {
  await elementVisible(
    "//android.widget.ImageView[@content-desc='At last, what is the preferred distance? Dates in town or out of town? Your choice! We will show people slightly further away when it runs out. 20km 80km']"
  );
});

Then("the user move the slider right to 80km", async function () {
  await slideDynamic(
    "//android.widget.SeekBar[@content-desc='24%']",
    "//android.widget.SeekBar[@content-desc='100%']"
  );
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on location page", async function () {
  await elementVisible(
    "//android.widget.ImageView[@content-desc='You are in... Kebayoran Baru']"
  );
});

Then("the user click next button", async function () {
  await clickElement("//android.widget.Button[@content-desc='Next']");
});

When("the user is on its done page", async function () {
  await elementVisible("//android.view.View[@content-desc='It's done!']");
});

Then("the user click start exploring", async function () {
  await clickElement(
    "//android.widget.Button[@content-desc='Start exploring']"
  );
});

When("the user is on home page", async function () {
  await elementVisible(
    "//android.view.View[@content-desc='For you Tab 1 of 2']"
  );
});

Then("the user see the icon card", async function () {
  await elementVisible(
    "//android.widget.ImageView[@content-desc='Home Tab 3 of 5']"
  );
});
