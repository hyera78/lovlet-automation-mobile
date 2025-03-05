Feature: Login

  Scenario: User login success
    Given the app launches
    Given the user clicks the login button by email
    When the user inputs "pokohix445@operades.com" and "Bimopuspa_12"
    When the user clicks the enter button
    Then the user should see the home page with the scroll view