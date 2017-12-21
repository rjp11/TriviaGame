//set up all variables
var time = 30;
var questionNumber = 0;
var rightAnswer = 0;
var wrongAnswer = 0;
var noAnswer = 0;
var intervalId;
var selectedOption;
var questions = ["Who holds the record for career rushing yards?",
    "Who holds the record for career passing yards?",
    "Who holds the record for career receiving yards?"
];
var totalQuestions = questions.length;
var options = [
    ["Darnell Autry", "Damien Anderson", "Justin Jackson", "Tyrell Sutton"],
    ["Zak Kustok", "CJ Bacher", "Steve Schnur", "Brett Basanez"],
    ["Ross Lane", "D'Wayne Bates", "Jeremy Ebert", "Eric Peterman"]
];
var answers = ["Justin Jackson",
    "Brett Basanez",
    "D'Wayne Bates"
];

//define all functions
function startGame() {
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    questionNumber = 0;
    time = 30;
    $(".timer").empty();
    $(".choices").html(`<a class='btn-lg btn-default startGame'>Click to get started!</a>`)
};

function reset() {
    rightAnswer = 0;
    wrongAnswer = 0;
    noAnswer = 0;
    questionNumber = 0;
    time = 30;
    $(".timer").empty();
};

function run() {
    $(".timer").html(`<h2>Time Remaining: <span class="countdown">30</span> Seconds</h2>`);
    $(".choices").html('');
    intervalId = setInterval(decrement, 1000);
};

function stop() {
    clearInterval(intervalId);
};

function decrement() {
    //  Decrease time by one.
    time--;
    //  Show the number in the #show-number tag.
    $(".countdown").text(time);
    if (time === 0) {
        //  ...run the stop function.
        stop();
        //  Alert the user that time is up.
        alert("Time Up!");
    }
};

//functions to write
//print questions and answers to HTML screen
function printQuestion() {
    $(".question").text(questions[questionNumber]);
    $(".a").text(options[questionNumer][0]);
    $(".b").text(options[questionNumer][1]);
    $(".c").text(options[questionNumer][2]);
    $(".d").text(options[questionNumer][3]);
};


// tally right guess, pause and show right answer, or end game
function right() {
    rightAnswer++;
    $(".question").text(`Go U! The answer is ${answers[questionNumber]}`);
    setTimeout(pause, 5000);
};

// tally wrong guess, pause and show right answer, or end game
function wrong() {
    wrongAnswer++;
    $(".question").text(`Nope! The answer is ${answers[questionNumber]}`);
    setTimeout(pause, 5000);
};

//3. tally time runs out, pause and show right answer, or end game
function timesUp() {
    noAnswer++;
    $(".question").text(`Time's up! The answer is ${answers[questionNumber]}`);
    setTimeout(pause, 5000);
};

//4. pause on right/wrong/unanswered page, or end game if at end of questions
function pause() {
    if (questionNumber < totalQuestions) {
        questionNumber++;
        time = 30;
    } else {
        endGame();
    }
};

//5. game ends
function endGame() {
    if (rightAnswer === totalQuestions) {
        $(".question").text(`You know your Wildcats!`)
    } else if (rightAnswer > 0) {
        $(".question").text(`You did alright, but there is room for improvement!`)
    } else {
        $(".question").text("Well, you can't do any worse next time...")
    };
    $(".a").text(`Correct Answers: ${rightAnswer}`);
    $(".b").text(`Wrong Answers: ${wrongAnswer}`);
    $(".c").text(`Unanswered: ${noAnswer}`);

};

//now, run all of these damn functions you wrote

//if selection === answer, run right function 
//if selection !=  answer, run wrongs function
//if time === 0, run timesUp function
//when questionNumber = totalQuestions, end game and return results