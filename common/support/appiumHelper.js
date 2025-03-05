const wdio = require("webdriverio");
const { TouchAction } = require("webdriverio");
const easyYopmail = require("easy-yopmail");
const fs = require("fs");
const path = require("path");

const emailPath = path.join(__dirname, "tempEmail.json");

const options = {
  path: "/wd/hub",
  port: 4723,
  hostname: "127.0.0.1",
  capabilities: {
    platformName: "Android",
    "appium:deviceName": "Infinix X663B",
    "appium:udid": "0758725231000397",
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "id.lookin.lovelet.uat",
    "appium:appActivity": "id.lookin.lovelet.MainActivity",
    "appium:noReset": true,
  },
};

let driver;

module.exports = {
  initializeDriver: async function () {
    try {
      if (!driver) {
        driver = await wdio.remote(options);
        console.log("Driver berhasil diinisialisasi");
      }
      return driver;
    } catch (error) {
      console.error("Gagal menginisialisasi driver:", error);
      throw error;
    }
  },

  getDriver: function () {
    if (!driver) {
      throw new Error(
        "Driver belum diinisialisasi. Panggil initializeDriver() terlebih dahulu."
      );
    }
    return driver;
  },

  quitDriver: async function () {
    if (driver) {
      await driver.deleteSession();
      driver = null;
    }
  },

  clickElement: async function (className) {
    if (!driver) {
      throw new Error("Driver belum diinisialisasi.");
    }
    const element = await driver.$(className);
    await element.waitForExist({ timeout: 5000 });
    await element.click();
  },

  enterText: async function (className, text) {
    const element = await driver.$(className);
    await element.setValue(text);
  },

  elementVisible: async function (XPath) {
    try {
      let element = await driver.$(XPath);
      let isVisible = await element.isDisplayed();
      return isVisible;
    } catch (error) {
      console.log("Error dalam memeriksa elemen: ", error);
      return false;
    }
  },

  getOTP: async function () {
    try {
      const inbox = await easyYopmail.getInbox("automation-test-1");
      console.log("Inbox:", inbox);

      if (!inbox || !inbox.inbox || inbox.inbox.length === 0) {
        console.log("No emails found in inbox.");
        return null;
      }

      const latestEmail = inbox.inbox[0];
      console.log("Latest email:", latestEmail);

      let emailContent = await easyYopmail.readMessage(
        "automation-test-1",
        latestEmail.id,
        "TXT"
      );

      const otpRegex = /Your Lovlet verification code is (\w{6}).*/;
      const match = emailContent.content.match(otpRegex);

      if (match) {
        const otp = match[1];
        console.log("Extracted OTP:", otp);
        return otp;
      } else {
        console.log("OTP not found in email content.");
        return null;
      }
    } catch (error) {
      console.error("Error:", error.message);
      return null;
    }
  },

  generateAndSaveEmail: async function () {
    try {
      const email = await easyYopmail.getMail();
      console.log(email);

      const emailData = { email };
      fs.writeFileSync(emailPath, JSON.stringify(emailData, null, 2));
      console.log("Email saved to :", emailPath);

      return email;
    } catch (error) {
      throw error;
    }
  },

  scrollDown: async function () {
    if (!driver) {
      throw new Error("Driver belum diinisialisasi.");
    }

    try {
      await driver.execute("mobile: scroll", { direction: "down" });
      console.log("Scrolled down successfully.");
    } catch (error) {
      console.error("Gagal melakukan scroll:", error);
      throw error;
    }
  },

  slideDynamic: async function (startSliderXpath, targetSliderXpath) {
    if (!driver) {
      throw new Error("Driver belum diinisialisasi.");
    }

    try {
      const startSlider = await driver.$(startSliderXpath);

      const startContentDesc = await startSlider.getAttribute("content-desc");
      console.log(`Content-desc slider awal: ${startContentDesc}`);

      const startPercentage = parseFloat(startContentDesc);
      if (isNaN(startPercentage)) {
        throw new Error(
          "Tidak dapat mengekstrak persentase dari content-desc slider awal."
        );
      }

      const startLocation = await startSlider.getLocation();
      const startSize = await startSlider.getSize();

      const startX =
        startLocation.x + startSize.width * (startPercentage / 100);
      const startY = startLocation.y + startSize.height / 2;

      const targetSlider = await driver.$(targetSliderXpath);

      const targetContentDesc = await targetSlider.getAttribute("content-desc");
      console.log(`Content-desc slider tujuan: ${targetContentDesc}`);

      const targetPercentage = parseFloat(targetContentDesc);
      if (isNaN(targetPercentage)) {
        throw new Error(
          "Tidak dapat mengekstrak persentase dari content-desc slider tujuan."
        );
      }

      const targetLocation = await targetSlider.getLocation();
      const targetSize = await targetSlider.getSize();

      const endX =
        targetLocation.x + targetSize.width * (targetPercentage / 100);
      const endY = targetLocation.y + targetSize.height / 2;

      const touchAction = new TouchAction(driver);
      await touchAction
        .press({ x: startX, y: startY })
        .wait(500)
        .moveTo({ x: endX, y: endY })
        .release()
        .perform();

      console.log(
        `Slider berhasil digeser dari ${startPercentage}% ke ${targetPercentage}%.`
      );
    } catch (error) {
      console.error("Gagal menggeser slider:", error);
      throw error;
    }
  },
};
