//Dot (.) is class selector, # is id selector
// Start Page
var startPage = document.querySelector(".start-pg");
var startBtn = document.querySelector("#start-btn");
var scoreBoardBtn = document.querySelector(".scores-btn");
var playerScore = 0;

//This should reset timer and score back to 5 minutes and 0 pts. Player should be sent back to question 1 as well.
//This function should be triggered by the "Start Game" button in main menu and the "Play Again" button in save score page
function reset() {
    playerScore = 0;
    playerScoreTracker.innerText = playerScore;
    questionNumb = 0;
    loadQuestion(questionNumb);
    secondsLeft = 5 * 60;
    clearInterval(timer);
    timerCountdown.innerHTML = `5:00`;
    //Re-enables option choices
    for (i = 0; i <= 3; i++) {
        allChoices[i].classList.remove("disabled");
    }
    //Removes highlight from last question's choices
    allChoices.forEach((choices) => {
        choices.classList.remove("active");
    });
}

//Clicking start leads you to instructions page
startBtn.addEventListener("click", function () {
    startPage.style.display = "none";
    instructionPage.style.display = "block";
});

//Clicking achievements leads you to score board/high score page
scoreBoardBtn.addEventListener("click", function () {
    startPage.style.display = "none";
    highScorePage.style.display = "block";
    scoresReveal();
});

//Instructions Page
var instructionPage = document.querySelector(".info-pg");
var continueBtn = document.querySelector("#continue-btn");

//Clicking continue leads you to quiz page
continueBtn.addEventListener("click", function () {
    reset();
    instructionPage.style.display = "none";
    quizPage.style.display = "grid";
    startTimer();
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
        correct: "Allows the Knight to double jump",
        choices: ["Allows the Knight to replace Vengeful Spirit with 9 flukes in battle", "Allows the Knight to fly", "Allows the Knight to swim in acid", "Allows the Knight to double jump"]
    },

    {
        question: "Which is not a nail art?",
        correct: "Descending Slash",
        choices: ["Cyclone Slash", "Descending Slash", "Great Slash", "Dash Slash"]
    },

    {
        question: "How many maps does Conifer sell?",
        correct: "12",
        choices: ["10", "11", "12", "13"]
    },

    {
        question: "Who teaches the Cyclone Slash nail art?",
        correct: "Mato",
        choices: ["Mato", "Sly", "Oro", "Sheo"]
    },

    {
        question: "Which map does Iselda sell that Conifer does not?",
        correct: "Resting Grounds",
        choices: ["Resting Grounds", "White Palace", "The Abyss", "Howling Cliffs"]
    },

    {
        question: "Which dreamer is found in Fog Canyon?",
        correct: "Monomon the Teacher",
        choices: ["Monomon the Teacher", "Lurien the Watcher", "Herrah the Beast", "None"]
    },

    {
        question: "Where can you find Bretta?",
        correct: "Fungal Wastes",
        choices: ["Forgotten Crossroads", "Fog Canyon", "Greenpath", "Fungal Wastes"]
    },

    {
        question: "Who teaches the Dash Slash nail art?",
        correct: "Oro",
        choices: ["Mato", "Sly", "Oro", "Sheo"]
    },

    {
        question: "Who sells the Fragile Greed charm?",
        correct: "Leg Eater",
        choices: ["Divine", "Leg Eater", "Sly", "Salubra"]
    },

    {
        question: "How many Stag Stations are there in total?",
        correct: "11",
        choices: ["9", "10", "11", "12"]
    },

    {
        question: "What are rancid eggs used for?",
        correct: "To get back the Hollow Knight's Shade",
        choices: ["Eating", "To get back the Hollow Knight's Shade", "They can be sold to Relic Seeker Lemm", "They can be used to buy charms"]
    },

    {
        question: "What does the Spell Twister charm do?",
        correct: "Reduces the SOUL cost of casting spells",
        choices: ["Increases the power of spells, dealing more damage to foes", "Greatly increases the amount of SOUL gained when striking an enemy with the nail", "Reduces the SOUL cost of casting spells", "Increases the speed of focusing SOUL"]
    },

    {
        question: "What does the Shade Cloak do?",
        correct: "Allows the Knight to dash through enemies and their attacks without taking damage",
        choices: ["Allows the Knight to dash through enemies and their attacks without taking damage", "Allows the Knight to reveal hidden dreams or open gateways", "Allows the Knight to swim in acid"]
    },

    {
        question: "Who is the first npc you meet in Dirtmouth?",
        correct: "Elderbug",
        choices: ["Gravedigger", "Sly", "Iselda", "Elderbug"]
    },

    {
        question: "Who teaches the Great Slash nail art?",
        correct: "Sheo",
        choices: ["Mato", "Sly", "Oro", "Sheo"]
    },

    {
        question: "Which of the Nailmaster brothers does the NailSmith end up with if you spare him?",
        correct: "Sheo",
        choices: ["Mato", "Sheo", "Oro", "He doesn't"]
    },

    {
        question: "Relic Seeker Lemm will not purchase your relics if the Knight has what charm equipped?",
        correct: "Defender's Crest Charm",
        choices: ["Defender's Crest Charm", "Spore Shroom", "Thorns of Agony", "Flukenest"]
    }

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

//This is how we select an answer and see our score
//forEach() method calls a function for each element in an array, the choices will be passed to a parameter called playerAns
//playerAns is what the player clicked on
allChoices.forEach((choices, playerAns) => {
    choices.addEventListener("click", () => {

        //Enables the next button upon choosing an answer
        nextBtn.classList.remove("disabled")

        //Highlights answer chosen in grey upon choosing an answer
        choices.classList.add("active");

        //Disables option choices upon choosing an answer
        for (i = 0; i <= 3; i++) {
            allChoices[i].classList.add("disabled");
        }

        //Converts playerAns (which registers as a number if you console log playerAns) to match with choice index in questionsBank array
        var chosenAns = questionsBank[questionNumb].choices[playerAns];

        //Checks playerAns compared to correct answer for that question. If the player clicks on the right answer, score goes up by 100 points.
        if (chosenAns == questionsBank[questionNumb].correct) {
            incrementScore();
        } else {
            //If the player clicks on the wrong answer, 30 seconds are taken off the clock
            secondsLeft -= 30;
        }
    })
});

//Score Keeper on Quiz Page
var playerScoreTracker = document.querySelector(".player-score-tracker");
var localScore;

function incrementScore() {
    playerScore += 125;
    //Visually shows the score on the upper right hand corner of the quiz page
    playerScoreTracker.innerText = playerScore;
    //Visually shows the score on the save score page
    playerScoreFinal.innerText = playerScore;
}

//Next button clicking cycles through questions
nextBtn.addEventListener("click", function () {
    //Re-enables option choices upon loading next question
    for (i = 0; i <= 3; i++) {
        allChoices[i].classList.remove("disabled");
    }

    //Removes highlight from last question's choices
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
            ranOuttaTime();
        }
    }, 1000);
}

//Closes quiz page and opens save score page.
function ranOuttaTime() {
    quizPage.style.display = "none";
    saveScorePage.style.display = "block";
}


//Save Score Page
var saveScorePage = document.querySelector(".save-pg");
var saveBtn = document.querySelector("#save-btn");
//Player initials input text-box
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
        //This is how the player initials are accessed from input
        name: playerInitials.value
    };

    // 1. Adds score array to scoreArray
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

//Clicking achievements leads you to scoreboard
scoreBoardBtn2.addEventListener("click", function () {
    reset();
    saveScorePage.style.display = "none";
    highScorePage.style.display = "block";
    scoresReveal();
});

//Clicking play again leads you to quiz page
playAgainBtn.addEventListener("click", function () {
    saveScorePage.style.display = "none";
    quizPage.style.display = "grid";
    reset();
    startTimer();
});

//Clicking quit leads you to quiz page
saveQuitBtn.addEventListener("click", function () {
    saveScorePage.style.display = "none";
    startPage.style.display = "block";
    reset();
});


//Score Board Page - This is here high scores are stored
var highScorePage = document.querySelector(".hs-pg");

function scoresReveal() {
    //Accesses list where scores will be displayed
    var scoreBoardList = document.querySelector(".hs-list");

    //Grabs scores out of local storage
    var displayScores = JSON.parse(localStorage.getItem("finalHighScore")) ?? [];


    //Array.map() is a method that makes a new array that has had a function affect every element in the old array.
    //The scoreBoardList.innerHTML will display an array of scores that are placed into the HTML by creating <li> elments and joining them together.
    scoreBoardList.innerHTML = displayScores.map((score) => `<li>${score.name}-${score.score}</li>`).join("");
}

//Clicking quit game leads you to start page
var highScoreQuitBtn = document.querySelector("#hs-pg-quit-btn");

highScoreQuitBtn.addEventListener("click", function () {
    highScorePage.style.display = "none";
    startPage.style.display = "block";
});
