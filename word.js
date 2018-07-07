var Letter = require("./Letter");

// Contains the constructor, "Word" and will depend on the Letter constructor. 
var Word = function (myWord) {

    // Takes "this.myWord", which is the word that is chosen, from the word list.
    this.myWord = myWord;

    // This is an array of letters representing thenod random letters the user enters.
    this.letters = [];
    this.underscoresNeeded = 0;

    // An array of `new` Letter objects representing the letters of the underlying word. 
    // This array represents the number of underscores needed when a random word in entered 
    // by the user and based on the number of letters in the word.
    this.underscores = [];

    // A function that returns a string representing the word. This should call the function 
    // on each letter object (the first function defined in `Letter.js`) that displays the
    // character or an underscore and concatenate (the joining of two or more strings) 
    // those together.
    // After the user enters a random word from the word list, a split method is used 
    // to add the letters to the "this.letters array".
    this.splitWord = function () {
        this.letters = this.myWord.split("");
        // console.log(this.letters);

        //Determine number of underscores needed based on the length of "this.letters array", 
        //in the Word constructor.

        this.underscoresNeeded = this.letters.length;

        for (var i = 0; i < this.letters.length; i++) {
            if (this.letters[i] == " ") {
                this.underscoresNeeded--
            }

        } console.log("Underscores: " + this.underscoresNeeded);
        //Create a "for loop" that pushes the underscores to the "this.underscores array" in the
        //Word constructor.
        for (var i = 0; i < this.letters.length; i++) {
            var new_Letter = new Letter(this.letters[i]);
            this.letterCount++;

            if (new_Letter === "_") {

            }
            // console.log(new_Letter)
            this.underscores.push(new_Letter.showCharacter());
        }

        //Use the .join method to join each underscore that is pushed to the 
        //this.underscores array by a space.
        // console.log(this.underscores.join(" "));
    }

    this.generateLetters = function (x) {
        console.log(Letter.letters)
        for (i = 0; i < this.letters.length; i++) {
            if (x.toUpperCase() === this.letters[i]) {

                this.letters[i].letterGuessedCorrectly = true;
                this.underscores[i] === this.letters[i] + " ";
            }
        }
    }
}
//Exports the Word constructor to be used and referenced in the index.js file.
module.exports = Word