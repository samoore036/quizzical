# Quizzical

A trivia app that uses the opentdb API to make a quiz based on user preferences. 

## About

Users can choose the number of questions and categories for their trivia quiz. Default choices are 10 questions and any category. Users are allowed to select up to 50 questions for most categories. The API does not let you request more than 50 questions. 

![image](https://user-images.githubusercontent.com/104536361/226721402-dbf24c04-94b7-488f-a2a8-3682ff151fbc.png)

There are certain categories that have a lower total number of questions available from the API. In these cases, the user will be notified if the number of questions they selected exceeds the number of questions available. The API for category question limits can only be accessed through fetching by specific category ID which does not make this very accessible with the number of potential requests. For this reason, questionLimit.js in the components folder lists those category IDs that have max question limits under 50 (there are only three). 

![image](https://user-images.githubusercontent.com/104536361/226721515-6751208d-3860-4057-9dde-ae420e42dade.png)

After the user makes their selections and starts the quiz, the app will send a request for these specifications to the API to receive the data. Once the data is loaded in, the user is able to start their quiz. The check answers button at the bottom will compare user's answers to the correct answers from the API and give the user a score, along with showing the correct answer for each question.

![image](https://user-images.githubusercontent.com/104536361/226722514-8af68759-b9ca-41c2-8153-a5e1e8df82d3.png)

Clicking play again will reset the state and bring the user back to the selection menu to play another round. 

## Dependencies

This app uses he (https://github.com/mathiasbynens/he), an html decoder that will parse the API for any html strings and decodes them to regular text format. 
