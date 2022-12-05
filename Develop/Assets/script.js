//Dot (.) is class selector, # is id selector
// Start Page
var startPage = document.querySelector(".start-pg");
var startBtn = document.querySelector("#start-btn");
var scoreBoardBtn = document.querySelector(".scores-btn");
var playerScore = 0;

//This should reset timer and score back to 5 minutes and 0 pts.
//This function should be triggered by the "Start Game" button in main menu and the "Play Again" button in save score page
function reset() { }

//Clicking start leads you to instructions page
startBtn.addEventListener("click", function () {
    startPage.style.display = "none";
    // instructionPage.style.display = "block";\


    //!!!!!!!!!!!!TODO DELETE BELOW AND UNCOMMENT ABOVE
    quizPage.style.display = "grid";
    //starting the game should always restart the timer
    clearInterval(timer);
    startTimer();
    loadQuestion(0);
    playerScore = 0;
});

//Clicking start leads you to score board/high score page
scoreBoardBtn.addEventListener("click", function () {
    startPage.style.display = "none";
    // highScorePage.style.display = "block";
    //!!!!!!!!!!!!TODO DELETE BELOW AND UNCOMMENT ABOVE
    saveScorePage.style.display = "block";
});

//Instructions Page
var instructionPage = document.querySelector(".info-pg");
var continueBtn = document.querySelector("#continue-btn");

//Clicking continue leads you to quiz page
continueBtn.addEventListener("click", function () {
    instructionPage.style.display = "none";
    quizPage.style.display = "grid";
    //TODO uncomment below!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // startTimer();
    // loadQuestion(0);
    //playerScore = 0;
});

//Quiz Page
var quizPage = document.querySelector(".quiz-pg");
var questionText = document.querySelector(".question-text");
var answerList = document.querySelector(".answer-list");
var allChoices = document.querySelectorAll(".choice");
var choice1 = document.querySelector(".choice-1");
var choice2 = document.querySelector(".choice-2");
var choice3 = document.querySelector(".choice-3");
var choice4 = document.querySelector(".choice-4");
var nextBtn = document.querySelector(".next-btn");


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


var questionNumb = 0;



//This is how we change the questions based on the index
function loadQuestion(index) {
    questionText.innerText = questionsBank[index].question;
    choice1.innerText = questionsBank[index].choices[0];
    choice2.innerText = questionsBank[index].choices[1];
    choice3.innerText = questionsBank[index].choices[2];
    choice4.innerText = questionsBank[index].choices[3];
    //Disables the next button upon loading
    nextBtn.classList.add("disabled")
}


allChoices.forEach((choices, playerAns) => {
    choices.addEventListener("click", () => {
        //Enables the next button upon choosing an answer
        nextBtn.classList.remove("disabled")

        //Shows in console log what player chose, returns a number
        console.log(playerAns);
        //converts number to match index in questionsBank array
        var chosenAns = questionsBank[questionNumb].choices[playerAns];
        //confirms answer player chose is a string from array
        console.log(chosenAns);
        //answer key for this question
        console.log(questionsBank[questionNumb].correct);


        if (chosenAns == questionsBank[questionNumb].correct) {
            // playerScore += 100;
            incrementScore();
            //delete later for checking purposes only
            console.log(playerScore);
        } else {
            //If the player clicks on the wrong answer, 5 seconds are taken off the clock
            secondsLeft -= 5;
            // playerScore += 0;
            //delete later for checking purposes only
            console.log(playerScore);
        }

        //To be deleted - highlights answer chosen in grey
        choices.classList.add("active");

        //disable option choices When player selects an answer
        for (i = 0; i <= 3; i++) {
            allChoices[i].classList.add("disabled");
        }

    })

});



//Score Keeper on Quiz Page
var playerScoreTracker = document.querySelector(".player-score-tracker");
var localScore;

function incrementScore() {
    playerScore += 100;
    playerScoreTracker.innerText = playerScore;
    playerScoreFinal.innerText = playerScore;
    localScore = JSON.stringify(localStorage.setItem("finalScore", playerScore));
}









//Next button clicking cycles through questions
nextBtn.addEventListener("click", function () {
    //Re-enables option choices upon loading next question
    for (i = 0; i <= 3; i++) {
        allChoices[i].classList.remove("disabled");
    }

    //To be deleted - removes highlight from last question's choices
    allChoices.forEach((choices) => {
        choices.classList.remove("active");
    });

    //Loads next question
    if (questionNumb < questionsBank.length - 1) {
        questionNumb++;
        loadQuestion(questionNumb);
    } else {
        quizPage.style.display = "none";
        saveScorePage.style.display = "block";
        // clearInterval(timer);
        // secondsLeft = 5 * 60;
    }
});





















//Timer on Quiz Page
var timerCountdown = document.querySelector(".time-remaining");
var secondsLeft = 5 * 60;
var timer;

function startTimer() {
    timer = setInterval(function () {
        secondsLeft--;
        var min = Math.floor(secondsLeft / 60);
        var sec = Math.floor(secondsLeft % 60);
        timerCountdown.innerHTML = `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
        if (secondsLeft == 0 || secondsLeft < 1) {
            clearInterval(timer);
            ranOuttaTime();
        }
    }, 1000);
}

function ranOuttaTime() {
    timerCountdown.innerHTML = "NONE";
    quizPage.style.display = "none";
    saveScorePage.style.display = "block";


    // clearInterval(timer);
    // secondsLeft = 5 * 60;
}


//Save Score Page
var saveScorePage = document.querySelector(".save-pg");
var saveBtn = document.querySelector("#save-btn");
//player initials
var playerInitials = document.querySelector("#player-initials");
//Score Keeper on Save Score Page
var playerScoreFinal = document.querySelector("#player-score");

//Converts input text to uppercase
playerInitials.addEventListener("input", function () {
    playerInitials.value = playerInitials.value.toUpperCase();
});

// Stores an array containing players' initials and their respective scores. The ?? means there's no scores previously stored (meaning the scoreArray's value is null) like on a first-time run, the scoredArray initializes the array with [].
// Research nullish coalescing operator (??) for more information
var scoreArray = JSON.parse(localStorage.getItem("finalScores")) ?? [];

var maxScoresStored = 5;

saveBtn.addEventListener("click", function () {
    saveScore();
});

function saveScore() {
    var score = {
        score: playerScore,
        name: playerInitials.value
    };

    // 1. Adds score [line 327] array to scoreArray
    scoreArray.push(score);

    // 2. Sorts the scoreArray but order of highest score. Higher scores get smaller index numbers.
    scoreArray.sort((a, b) => b.score - a.score);

    // 3. Only keeps maxScoresStored (aka top 5) scores
    scoreArray.splice(maxScoresStored);

    // 4. Updates array to newly sorted one
    localStorage.setItem("finalHighScore", JSON.stringify(scoreArray));
}


var scoreBoardBtn2 = document.querySelector("#save-pg-scores-btn");
var playAgainBtn = document.querySelector("#restart-btn");
var saveQuitBtn = document.querySelector("#save-pg-quit-btn");

//Clicking achievements leads you to scoreboard page
scoreBoardBtn2.addEventListener("click", function () {
    saveScorePage.style.display = "none";
    highScorePage.style.display = "block";
});

//Clicking play again leads you to quiz page -- may get rid of this button
playAgainBtn.addEventListener("click", function () {
    //should reset back to question 1, currently it visually does not
    questionNumb = 0;
    //player score should reset!!!! currently does not
    //timer should reset currently does not!!!
    //question 1 should visually be the grubfather one!!! currently it is visually the last question but registers as the first question which is really really weird.
    saveScorePage.style.display = "none";
    quizPage.style.display = "grid";
});

//Clicking quit leads you to quiz page
saveQuitBtn.addEventListener("click", function () {
    saveScorePage.style.display = "none";
    startPage.style.display = "block";
});


//Score Board Page
var highScorePage = document.querySelector(".hs-pg");
var highScoreQuitBtn = document.querySelector("#hs-pg-quit-btn");

//Clicking quit game leads you to start page
highScoreQuitBtn.addEventListener("click", function () {
    highScorePage.style.display = "none";
    //startPage.style.display = "block";

    //!!!!!TODO will delete below later, just need to use it to access score page w/o going to quiz
    saveScorePage.style.display = "block";
});