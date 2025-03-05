Feature: Register New User

  Scenario: New user registers successfully
    Given the app launches
    Then email generate
    When the user clicks the start button
    Then the user is on the registration page
    Then the user manually inputs their email
    When the user clicks the next button in input email
    Then the user is on the OTP page
    Then the user receives the OTP
    Then the user manually inputs the OTP
    # Then the user clicks the next button in input otp
    Then the user sees the pop up
    When the user clicks create button
    Then the user is on the face verification page
    When the user click verify button
    Then the user face verification
    When the user finish the verification user will be in page verification successfully
    Then the user click next button
    When the user is on input name page
    Then the user input "Test"
    Then the user click next button
    When the user is on input birthday page
    Then the user click input birthday
    Then the user select the birthday date
    Then the user click ok
    Then the user see data in input
    Then the user click next button
    When the user see pop up age and zodiac
    Then the user click close button
    Then the user see pop up age and zodiac again
    Then the user click next button
    When the user is on gender select page
    Then the user click dropdown
    Then the user select the gender
    Then the user see the data in input
    Then the user click toggle on hide gender profile
    Then the user click toggle off hide gender profile
    Then the user click next button
    When the user is on upload photo page
    Then the user click icon +
    Then the user click gallery
    Then the user select photo
    Then the user wait process uploading the photo
    Then the user click icon + again
    Then the user click camera
    Then the user take picture
    Then the user wait process uploading the photo
    Then the user click next button
    When the user is on page Account Created
    Then the user click begin
    When the user is on what are you looking for page
    Then the user click Not sure yet
    Then the user click next button
    When the user is on what do you want to see
    Then the user click Woman
    Then the user click next button
    When the user is on About you page
    Then the user select the Quality Time
    Then the user select the Regularly
    Then the user select never
    Then the user scroll down
    Then the user select never
    Then the user click dropdown whats your height
    Then the user select the height
    Then the user see the input change
    Then the user select next button
    When the user is on more about you page
    Then the user select graduate degree
    Then the user click dropdown whats industry do you work in
    Then the user select the government
    Then the user see the input change
    Then the user select the religion
    Then the user click next button
    When the user is on vibe page
    Then the user select the running in sports
    Then the user select the cat in pets
    Then the user scroll down
    Then the user select estj in mbti
    Then the user select photography in interest
    Then the user select next button
    When the user is on intrigue page
    Then the user click input the bio
    Then the user input "Hallo"
    Then the user click next button
    When the user is on age range page
    Then the user move the slider left to 18
    Then the user move the slider right to 80
    Then the user click next button
    When the user is on distance page
    Then the user move the slider right to 80km
    Then the user click next button
    When the user is on location page
    Then the user click next button
    When the user is on its done page
    Then the user click start exploring
    When the user is on home page
    Then the user see the icon card



    