var Word = require("./word.js");
var Game = require("./game.js")
var isLetter = require('is-letter');
var prompt = require('prompt');
var inquirer = require('inquirer');

var hangman_game = {
    word_list: [],
    guesses_remaining: 9,
    word_solved: false,
    solved_letters: 0,
    guessedLetters: [],
    current_word: null,

    start_game: function () {
        // clears guessedLetters before the newgame starts
        if (this.guessedLetters.length > 0) {
            this.guessedLetters = [];
        };
        if (this.word_solved = true) {
            this.word_solved = false
        };
        console.log("\n\n              NN    NN   OOOO   DDDD     EEEEEE\n              NNNN  NN  OO  OO  DD  DD   EE    \n              NN NN NN  OO  OO  DD   DD  EEEE\n              NN  NNNN  OO  OO  DD   DD  EE    \n              NN    NN   OOOO   DDDDD    EEEEEE")
        console.log("\nHH  HH    AA    NN    NN   GGGGGG  MM    MM    AA    NN    NN\nHH  HH   AAAA   NNNN  NN  GG       MMM  MMM   AAAA   NNNN  NN\nHHHHHH  AA  AA  NN NN NN  GG  GGG  MMMMMMMM  AA  AA  NN NN NN\nHH  HH  AAAAAA  NN  NNNN  GG   GG  MM MM MM  AAAAAA  NN  NNNN\nHH  HH  AA  AA  NN    NN   GGGGGG  MM    MM  AA  AA  NN    NN\n\n")
        console.log("\n(If you cannot read the words above, adjust your window size)")
        inquirer.prompt([{
            name: "play",
            type: "confirm",
            message: "ready to play??"
        }]).then(function (answer) {
            if (answer.play) {
                inquirer.prompt([{
                    name: "game_style",
                    type: "list",
                    message: "Which type of words would you like to solve?",
                    choices: ["European Countries", "Top 50 Movies", "50 States"],
                }
                ]).then(function (answer) {
                    var type = (answer.game_style);
                    console.log(hangman_game.word_list)
                    if (type === "European Countries") {
                        hangman_game.word_list = Game.types.countries;
                        hangman_game.new_game();
                    } else if (type === "Top 50 Movies") {
                        hangman_game.word_list = Game.types.movies;
                        hangman_game.new_game();
                    } else if (type === "50 States") {
                        hangman_game.word_list = Game.types.states;
                        hangman_game.new_game();
                    }
                }
                )
            } else {
                console.log("\nwhats the point then? Why are you even here?");
            }
        })
    },
    new_game: function () {
        this.guesses_remaining = 9;
        this.solved_letters = 0;
        this.guessedLetters = [];
        console.log("\n\nWelcome to My NODE Hangman!");
        console.log("Guess the letters Correctly");
        console.log("Goodluck!");
        console.log("-----------------------------");
        this.current_word = this.word_list[Math.floor(Math.random() * this.word_list.length)];
        test_word = new Word(this.current_word.toLowerCase());
        test_word.splitWord();

        // console.log(test_word);
        console.log("\n        +--------------------------------------+\n        |          your word:                  |\n        |                                      |\n        |     "
            + test_word.underscores.join(" ") +
            "\n        |                                      |\n        +--------------------------------------+\n          you have  "
            + this.guesses_remaining + "  guesses left\n\n")
        this.userChooses();
        // var someWord = new Word("Utah");
        // someWord.splitWord();
    },
    userChooses: function () {
        if (this.solved_letters === test_word.underscoresNeeded) {
            console.log("\n        +--------------------------------------+\n        |          your word:                  |\n        |                                      |\n        |          YOU'VE WON!!                |\n        |       with " + this.guesses_remaining + "  guesses left           |\n        +--------------------------------------+\n          \n")
            hangman_game.end_game();
        } else
            if (hangman_game.guesses_remaining > 0) {
                inquirer.prompt([{
                    name: "guess",
                    type: "input",
                    message: "Choose a letter:",
                    validate: function (value) {
                        if (isLetter(value)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }]).then(function (userInput) {

                    var guessed_letter = userInput.guess.toLowerCase();
                    var guessedAlready = false;

                    for (var i = 0; i < hangman_game.guessedLetters.length; i++) {
                        if (guessed_letter === hangman_game.guessedLetters[i]) {
                            guessedAlready = true;
                        }
                    }
                    if (guessedAlready === false) {
                        hangman_game.guessedLetters.push(guessed_letter);
                        var match = false;
                        console.log("Letters already guessed: " + hangman_game.guessedLetters)
                        // for loop into the word searching for letters to switch from underscores to letters
                        for (var i = 0; i < test_word.letters.length; i++) {
                            // console.log("testword:  " + test_word.letters[i] + "  guessed:  " + guessed_letter)


                            if (test_word.letters[i] == guessed_letter) {
                                test_word.underscores[i] = test_word.letters[i];
                                match = true; hangman_game.solved_letters++

                            };
                        } if (!match) {
                            hangman_game.guesses_remaining--;
                            console.log("\n\n          INCORRECT!!");
                        } else {
                            console.log("\n\n            CORRECT!");

                        };
                        hangman_game.scoreBoard();
                        // if else statement with counter for either side

                        // que another prompt 

                    } else {
                        console.log("You've already tried that lettter.  Please Try another")
                    }
                    hangman_game.userChooses();
                })
            } else {
                hangman_game.end_game();
            }
    },
    scoreBoard: function () {
        console.log("\n        +--------------------------------------+\n        |          your word:                  |\n        |                                      |\n        |     "
            + test_word.underscores.join(" ") +
            "\n        |                                      |\n        +--------------------------------------+\n          you have  "
            + this.guesses_remaining + "  guesses left\n        \n")
    },
    end_game: function () {
        inquirer.prompt([{
            name: "play_again",
            type: "confirm",
            message: "Would you like to play again???"
        }]).then(function (answer) {
            if (answer.play_again) {
                hangman_game.new_game();
            } else {
                console.log("\n\nThanks for playing\n\n");
            }
        })
    },
}
hangman_game.start_game();