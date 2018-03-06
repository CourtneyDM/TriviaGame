$(document).ready(function () {
    var answerDisplay = $("#answers");
    var content = $("#content");
    var imageDisplay = $("#imgSrc");
    var questionDisplay = $("#questions");
    var tempArray = [];
    var content = $("#content");

    // Object to hold questions and choices
    var questions = [{
        image: "assets/images/Cowboys.png",
        question: "Who is the current quarterback for this team?",
        choices: ["Tony Romo", "Dak Prescott", "Rush Cooper", "Danny Manziel"],
        answer: "Dak Prescott",
        asked: false
    },
    {
        image: "assets/images/Bears.png",
        question: "In what city is this team located?",
        choices: ["Peoria", "Joilet", "Rockford", "Chicago"],
        answer: "Chicago",
        asked: false
    },
    {
        image: "assets/images/Bills.png",
        question: "What famous food originated in this team's city?",
        choices: ["Buffalo Wings", "Philly Cheesesteak", "Deep Dish Pizza", "Cheesecake"],
        answer: "Buffalo Wings",
        asked: false
    },
    {
        image: "assets/images/Broncos.png",
        question: "Which former QB of this team enjoys Chicken Parmesan?",
        choices: ["John Elway", "Tim Tebow", "Peyton Manning", "Brock Osweiler"],
        answer: "Peyton Manning",
        asked: false
    },
    {
        image: "assets/images/Browns.png",
        question: "Select the NBA team that shares this team city. Hint: they won the 2016 NBA Championship Title",
        choices: ["Boston Celtics", "Golden State Warriors", "Miami Heat", "Cleveland Cavaliers"],
        answer: "Cleveland Cavaliers",
        asked: false
    },
    {
        image: "assets/images/Falcons.png",
        question: "This team had a dance back in 1998 called the \"Dirty Bird\", where is team located?",
        choices: ["Atlanta", "Seattle", "Philadelphia", "Arizona"],
        answer: "Atlanta",
        asked: false
    },
    ];

    var counter = 0;
    var correct_answers = 0;
    var incorrect_answers = 0;
    var intervalID;
    var index;
    var points = 10;

    // Timer Object
    var timer = {
        time_remaining: 10,

        // Decrement Timer
        decrementTimer: function (question) {
            timer.time_remaining--;
            if (timer.time_remaining < 10) {
                $("#timer").html("<p>00:0" + timer.time_remaining + "</p>");
                if (timer.time_remaining <= 5) {
                    $("#timer p").html("<p>00:0" + timer.time_remaining + "</p>").css({
                        "color": "red",
                        "font-weight": "bold"
                    });
                }
            } else {
                $("#timer").html("<p> 00:" + timer.time_remaining + "</p>");
            }

            if (timer.time_remaining === 0) {
                timer.stopTimer();
                alert("Time has expired");
                incorrect_answers++;
                question.asked = true;
                console.log("Time out question: " + question.asked);
                console.log("Timeout Counter: " + counter);
                // removeQuestion();
                clearContent();
            }
            return;
        },

        // Start Timer
        startTimer: function (question) {
            intervalID = setInterval(function () {
                timer.decrementTimer(question)
            }, 1000);
            return;
        },

        // Stop Timer
        stopTimer: function () {
            clearInterval(intervalID)
            return;
        }
    }

    // Start game when button has been clicked
    $("#start").on("click", function () {
        $("#timer").html("<p>00:10</p>")
        showQuestion();
    });

    // Display questions to screen
    function showQuestion() {

        index = Math.floor(Math.random() * questions.length);

        console.log("Counter: " + counter);
        console.log("Question: " + questions[index].question);
        console.log("Asked: " + questions[index].asked);

        if (questions[index].asked === true && counter === questions.length) {
            showResults();
        } else if (questions[index].asked === true && counter !== questions.length) {
            showQuestion();
        } else {
            questionDisplay.empty();
            timer.time_remaining = 10;
            timer.startTimer(questions[index]);

            $("#instructions").hide();
            $("button").off();

            // $("#start").removeAttr("id");
            // $("button").attr("id", "submit");
            $("button").text("Submit Answers");

            questionDisplay.html("<p>" + questions[index].question + "</p>");
            imageDisplay.html("<img src='" + questions[index].image + "'/>");

            showAnswers();
            questions[index].asked = true;
            counter++;
        }
    }

    // Display answers to screen
    function showAnswers() {
        var answers = questions[index].choices;
        var correct = questions[index].answer;

        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            answerDisplay.append("<input type='radio' name='answer' value='" + answer + "'/>" + answer);
        }
        $("#start").on("click", checkAnswer);
    }

    // Check answers
    function checkAnswer() {
        // var correct = questions[index].answer;
        var chosen = $("input:checked").val();

        if (!chosen) {
            alert("no answer selected");
        } else
            if (chosen === questions[index].answer) {
                // console.log("Correct answer");
                // $("button").hide();
                timer.stopTimer();
                alert("Correct.");
                correct_answers++;
                points = points + (points * timer.time_remaining);
                clearInterval(timer.intervalID);
                clearContent();
            } else {
                // $("button").hide();
                timer.stopTimer();
                alert("Incorrect.");
                incorrect_answers++;
                points = points - (points * timer.time_remaining);
                clearInterval(timer.intervalID);
                clearContent();
            }
    }

    // Clear content
    function clearContent() {
        questionDisplay.empty();
        answerDisplay.empty();
        imageDisplay.empty();
        // clearInterval(timer.intervalID);
        // $("button").css("display", "inherit");
        $("#timer").html("<p>00:10</p>");
        showQuestion();
    }

    // Show Results
    function showResults() {
        // var content = $("#content");
        $("button").off();
        clearInterval(timer.intervalID);

        content.empty();
        content.html("<h2 id='results'>Your Results</h2>");
        var correct = "<p>Correct Answers: " + correct_answers + "</p>";
        var incorrect = "<p>Incorrect Answers: " + incorrect_answers + "</p>";

        $("#results").append(correct).append(incorrect);
        $("button").removeAttr("id");
        $("button").text("Restart Game");
        $("button").attr("id", "start");

        $("#start").on("click", restartGame);

    }

    // Restart Game
    function restartGame() {
        content.empty();
        correct_answers = 0;
        counter = 0;
        incorrect_answers = 0;
        index = 0;
        points = 0;
        for (var i = 0; i < questions.length; i++) {
            questions[i].asked = false;
        }
        clearContent();
    }
});
