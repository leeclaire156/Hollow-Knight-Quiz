var startBtn = document.querySelector(".start-btn");
var highScoreBtn = document.querySelector(".scores-btn");

var instructionPage = document.querySelector("#info-pg");
var continueBtn = document.querySelector("#continue-btn");

var quizPage = document.querySelector("#quiz-pg");
var questionText = document.querySelector("#question-text");
var answerChoices = document.querySelector("#answer-choices");

var timerCountdown = document.querySelector("#time-left");
var playerScore = document.querySelector(".player-score");

var highScorePage = document.querySelector("#hs-pg");
var saveBtn = document.querySelector(".save-btn");
var restartBtn = document.querySelector(".restart-btn");
var quitBtn = document.querySelector(".quit-btn");

var questionsBank = [
    {
        question: "What happens to all the grubs when you've collected all 46?",
        correct: "Grubfather eats them so they can undergo metamorphosis",
        choices: ["Grubfather eats them so they can undergo metamorphosis", "They leave the Forgotten Crossroads and go back to their home", "They take revenge on their capturer", "They give you a pale ore"]
    },

    {
        question: "Who trapped all the grubs and scattered them throughout Hallownest?",
        correct: "The Collector",
        choices: ["Grubfather", "The Collector", "The Pale King", "Elderbug"]
    },

    {
        question: "How many pale ores do you need to obtain the pure nail upgrade?",
        correct: "6",
        choices: ["4", "5", "6", "7"]
    },

    {
        question: "What do the Monarch Wings do?",
        correct: "Allows the knight to double jump",
        choices: ["Allows the knight to double jump", "Allows the knight to fly", "Allows the knight to swim in acid", "Allows the knight to replace Vengeful Spirit with 9 flukes in battle"]
    },

    {
        question: "Who teaches the Cyclone Slash nail art?",
        correct: "Mato",
        choices: ["Mato", "Sly", "Oro", "Sheo"]
    }
    /*,
{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
},

{
    question: "",
    correct: "",
    choices: ["", "", "", ""]
} 
*/
];