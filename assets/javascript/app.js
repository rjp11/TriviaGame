//set up all variables
var time = 30;
//stores the question number easily in order to call the appropriate index from the arrays.
var questionNumber = 0;
//tallies right, wrong and unanswered questions
var rightAnswer = 0;
var wrongAnswer = 0;
var noAnswer = 0;
//sets the interval to a variable so we can easily clear it in functions
var intervalId;
//stores the text associated with the user's guess in order to compare to the right answer
var selectedOption;
//array of trivia questions
var questions = ["Who holds the record for career rushing yards?",
    "Who holds the record for career passing yards?",
    "Who holds the record for career receiving yards?",
    "Which coach has the most wins in program history?",
    "Which player broke multiple tackles in the Outback Bowl against Auburn to score my favorite Northwestern touchdown?",
    "Which Wildcat scored the only TD in the 'unsafe' endzone at Wrigley Field?",
    "Which of these former players was not named to an All-American team?",
    "How many overtime victories did Northwestern compile during their 7 game win streak this year?"
];
//sets a variable for the length of the questions array in case questions are added or removed
var totalQuestions = questions.length;
//array of the 4 answer options for each question
var options = [
    ["Darnell Autry", "Damien Anderson", "Justin Jackson", "Tyrell Sutton"],
    ["Zak Kustok", "CJ Bacher", "Steve Schnur", "Brett Basanez"],
    ["Ross Lane", "D'Wayne Bates", "Jeremy Ebert", "Eric Peterman"],
    ["Pat Fitzgerald", "Gary Barnett", "Ara Parseghian", "Randy Walker"],
    ["Andrew Brewer", "Brian Peters", "Drake Dunsmore", "Mike Kafka"],
    ["Evan Watkins", "Brian Peters", "Mike Trumpy", "Tony Jones"],
    ["Zach Strief", "Pat Fitzgerald", "Venric Mark", "Darnell Autry"],
    ["1", "2", "3", "4"]
];
//array of the right answers for each question
var answers = ["Justin Jackson",
    "Brett Basanez",
    "D'Wayne Bates",
    "Pat Fitzgerald",
    "Drake Dunsmore",
    "Brian Peters",
    "Darnell Autry",
    "3"
];
//array of images to be displayed with the right answer on the pause page
var images = ["justinjackson.jpg",
    "brettbasanez.jpg",
    "dwaynebates.jpeg",
    "patfitz.jpg",
    "drakedunsmore.jpg",
    "brianpeters.jpg",
    "darnellautry.jpg",
    "threeot.jpg"
];

//define all functions below

//sets the opening page and creates a button to begin the trivia game
function startTrivia() {
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    questionNumber = 0;
    time = 30;
    $(".timer").empty();
    $(".question").html(`<br><br><a class='btn-lg btn-default startTrivia'>Click to get started!</a>`)
};

//resets all variables and the first question without refreshing. 
function reset() {
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    questionNumber = 0;
    time = 30;
    $(".timer").empty();
    printQuestion();
};

//clears all of the divs before assigning new HTML
function clearDivs() {
    $(".timer").empty();
    $(".question").empty();
    $(".option").empty();
    $(".timer").empty();
    $(".img").empty();
    $(".line").empty();
};

//function to run the countdown timer
function run() {
    $(".timer").html(`<h2>Time Remaining: <span class="countdown">30</span> Seconds</h2>`);
    intervalId = setInterval(decrement, 1000);

    function decrement() {
        time--;
        $(".countdown").text(time);
        if (time === 0) {
            clearInterval(intervalId);
            timesUp();
        };
    };
};

//print questions and options to HTML screen
function printQuestion() {
    clearDivs();
    $(".question").html("<h2>" + questions[questionNumber] + "</h2>");
    $("#a").html("<h3>" + options[questionNumber][0] + "</h3>");
    $("#b").html("<h3>" + options[questionNumber][1] + "</h3>");
    $("#c").html("<h3>" + options[questionNumber][2] + "</h3>");
    $("#d").html("<h3>" + options[questionNumber][3] + "</h3>");
    run();
};

// tally right guess, pause and show right answer
function right() {
    rightAnswer++;
    $(".timer").html(`<h3>Go U! The answer was</h3>`);
    $(".question").html(`<h3>${answers[questionNumber]}</h3>`);
    $(".img").html("<img class='center-block' src='../TriviaGame/assets/images/" + images[questionNumber] + "'>");
    console.log(images[questionNumber]);
    setTimeout(pause, 3000);
};

// tally wrong guess, pause and show right answer
function wrong() {
    wrongAnswer++;
    $(".timer").html(`<h3>Nope! The answer is</h3>`);
    $(".question").html(`<h3>${answers[questionNumber]}</h3>`);
    $(".img").html("<img class='center-block' src='../TriviaGame/assets/images/" + images[questionNumber] + "'>");
    setTimeout(pause, 3000);
};

//tally "time ups", pause and show right answer
function timesUp() {
    clearDivs();
    noAnswer++;
    $(".timer").html(`<h3>Time's up! The answer is</h3>`);
    $(".question").html(`<h3>${answers[questionNumber]}</h3>`);
    $(".img").html("<img class='center-block' src='../TriviaGame/assets/images/" + images[questionNumber] + "'>");
    setTimeout(pause, 3000);
};

//pause on right/wrong/unanswered page, or end game if at end of questions
function pause() {
    if (questionNumber < (totalQuestions - 1)) {
        questionNumber++;
        time = 30;
        clearDivs();
        clearInterval(intervalId);
        printQuestion();
    } else {
        endGame();
    }
};

//game ends, different text is displayed depending on how well the player does
function endGame() {
    clearInterval(intervalId);
    clearDivs();
    if (rightAnswer === totalQuestions) {
        $(".question").html(`<h2>You know your Wildcats!</h2>`)
    } else if (rightAnswer > 0) {
        $(".question").html(`<h2>You did alright, but there is room for improvement!</h2>`)
    } else {
        $(".question").html(`<h2>Well, you can't do any worse next time...</h2>`)
    };
    $(".one").html(`<h3>Correct Answers: ${rightAnswer}</h3>`);
    $(".two").html(`<h3>Wrong Answers: ${wrongAnswer}</h3>`);
    $(".three").html(`<h3>Unanswered: ${noAnswer}</h3>`);
    $(".four").html(`<button class = "reset btn-lg btn-default">Try Again</button>`)
};

//now its time to call of the written functions
$(document).ready(function () {

    startTrivia();

    $("body").on("click", ".startTrivia", function (event) {
        printQuestion();
    });

    $("body").on("click", ".option", function (event) {
        selectedOption = $(this).text();
        clearDivs();
        clearInterval(time);
        //if selection === answer, run right function 
        if (selectedOption === answers[questionNumber]) {
            right();
        }
        //if selection !=  answer, run wrongs function
        else {
            wrong();
        }
    });

    $("body").on("click", ".reset", function (event) {
        reset();
    });
});