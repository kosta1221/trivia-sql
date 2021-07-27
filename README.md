# Countrivia - countries based trivia game :earth_americas:

Countrivia is a trivia game about countries! the questions are automatically genrated based on raw data and question templates in SQL data.
The client is built with React, SQL tables used with Sequalize (ORM), backend api built in Node.js. 

## Game rules and cycle :video_game:

- Start each round with 3 :heart:, you lose one life for answering incorrectly, or for not answering in time.
- In the begining of the round you get 20 seconds :hourglass: to answer the displayed question, from 4 given answers, only one is correct, time to answer goes down after each correct answer, down to a minimum of 6 seconds to answer.
- You earn points for each correct question, you get more points the faster you answer. 
- When you run out of lives, the round ends and your score get saved to the leaderboards :star:.

## Features  :gem:

- User system that allows you to create and customize your own profile .
- Clear and friendly UI, you can also customize the game colors to your likeness!
- Leaderboard system - show you are the best player and take the first place on the leadeboard.
- The questions are generated automatically based on raw data about the world countries, so you'll never run out of questions.
- Questions have rating system driven by user input, highly rated questions are more likley to be selected and shown to the user than lower rated ones.

## Demo
  ![Countrivia-Demo](./readme-files/Countrivia-Demo.gif)
