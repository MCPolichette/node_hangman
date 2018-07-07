
// Contains a constructor, Letter. 
var Letter = function (character) {
    // A string value to store the underlying character for the letter
    this.character = character;
    // A boolean value that stores whether that letter has been guessed yet
    this.letterCorrectGuess = false;
    // A function that returns the underlying character if the letter has been guessed, 
    // or a placeholder (like an underscore) if the letter has not been guessed
    this.showCharacter = function () {
        var placeholder = "";
        if (this.character === " ") {
            placeholder = (" ");
        }
        else {
            placeholder = ("_");
        };
        return placeholder;

    }
    // A function that takes a character as an argument and checks it against the underlying 
    // character, updating the stored boolean value to true if it was guessed correctly
    this.checkLetter = function (user_input) {
        if (this.character === user_input) {
            console.log("TEST")
        }
    }
}

//export Letter constructor so Word.js can use it.
module.exports = Letter