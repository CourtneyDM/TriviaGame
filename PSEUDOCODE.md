# Pseudocode for Trivia Game

## Keys to game design:
- Display single question to the screen
- Display multiple answers for question to screen
- User can only select one answer per question
- User has X amount of time to answer question
- Display results at the end of game


### TODO
- [X] Store questions to be displayed
- [X] Store answers for each question
- [ ] Remove question/answer combo to be chosen again
- [ ] Display timer when new question is displayed
- [ ] Show answer when question has been guessed/time runs out
- [ ] Display correct/incorrect answers when game is over
- [ ] Clear screen and restart game when "Restart" button is clicked


### Pseudocode

##### Timer Function
* After "Start" button has been clicked, display timer
    - Once timer is displayed, start countdown
    - If the timer reached 00:00, display correct answer
        - Display correct answer for 5 seconds


##### Questions Functionality
* Use an Object to store questions with possible answers
* Create an index number that will randomly select a question from the Object list of questions

