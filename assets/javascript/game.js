//PSEUDOCODE//
/*
- Build a list of words
- When the page loads or the game restarts:
--- A random word from the list is picked
--- "Current Word" is replaced with same number of "_"s as the letters in the randomly picked word
--- "Count of Guesses" is reset to 0 so that "Guesses Remaining" is reset to 10
--- "Letters Guessed" is nuked
- When the user presses a key
--- Convert the key to lowerCase
--- Check if the key is a letter from the alphabet. If not, return (do nothing)
--- If the letter is part of the current word, replace the corresponding _ with the letter
--- If the letter is guessed wrong, add to "Letters Guessed", reduce Guesses Remaining by 1
--- If the letter was already guessed (lookup the Letters Guessed list), do nothing
- Game ends when
--- Guesses Remaning = 0, OR
--- Current Word = Random Word
*/

// Variables
var wordList = ["deadpool", "hulk", "wolverine", "nebula", "thor", "loki", "daredevil","ronan"]; // List of words to be guessed
var guessWord = ''; // Stores the random word picked from the above list/array
var validInput = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
var userInput = ''; // Stores the key/letter pressed by the user
var countWins = 0; // Counts games won by the user
var dispWord = ''; // The current word that displayed on the screen
var lettersGuessed = []; // Stores the letters incorrectly guessed by the user
var correctGuesses = []; // Stores correct user guesses. Used to to loop through and build the displayed word/string.
var countGuesses = 0; // Counts the guesses the user has remaining

// Reset the game
function resetGame(){
    userInput='';
    lettersGuessed = [];
    correctGuesses = [];
    countGuesses = 0;
    guessWord = wordList[Math.floor(Math.random() * wordList.length)];
    generateDispWord();
    Display();
}

// Build the word that's displayed to the user
function generateDispWord(){
    dispWord = ""; // Reset the displayed string so it can be rebuilt
    for(var i = 0; i < guessWord.length; i++){ //Loop through the current random word
        if(correctGuesses.indexOf(guessWord[i]) > -1){ // If a letter in the random word has been guessed correctly, reveal it
            dispWord = dispWord + guessWord[i] + " ";
        } 
        else {
            dispWord = dispWord + "_ "; // If a letter has not been guessed yet, continue to mask it
        }
    }
    return dispWord;
}

// Populate the default values
function Display(){
    document.getElementById("wins").textContent = countWins;
    document.getElementById("dispWord").textContent = dispWord;
    document.getElementById("guessesLeft").textContent = 10 - countGuesses;
    document.getElementById("lettersGuessed").textContent = lettersGuessed;
    console.log("Random word is: " + guessWord);
}

window.onload = init

function init(){
    resetGame();
    Display();
}

// Trigger this function when a key is pressed
document.onkeyup = function(event) {
    userInput = event.key.toLowerCase();
    
    // User pressed a key other than a letter
    if (validInput.indexOf(userInput) == -1){
        console.log("Invalid input");
        return;
    }
    // Input is valid but user did not guess correctly, and the letter was not previously guessed
    else if(guessWord.indexOf(userInput) == -1 && lettersGuessed.indexOf(userInput) == -1){
        lettersGuessed.push(userInput);
        countGuesses++;
        Display();
    }
    // User guessed a letter correctly and it was not already guessed
    else if(guessWord.indexOf(userInput) > -1 && correctGuesses.indexOf(userInput) == -1){
        correctGuesses.push(userInput);
        generateDispWord();
        Display();
    }

    // If the user runs out of guesses, end the game
    if (countGuesses == 10){
        alert("Sorry dude, you just killed him!");
        resetGame();
    }

    // User wins if none of the letters in the displayed word is masked,
    // because the user has correctly guessed all the letters
    if (dispWord.indexOf("_") == -1){
        countWins++;
        generateDispWord();
        Display();
        resetGame();
    }
}

