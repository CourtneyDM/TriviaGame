$(document).ready(function () {

    /* Global Variable Declarations */
    var counter = 0;
    var correct_answers = 0;
    var incorrect_answers = 0;
    var intervalID;
    var index;
    var points = 10;
    var totalScore = 0;

    /* DOM Manipulators */
    var answerDisplay = $("#answers");
    var content = $("#content");
    var imageDisplay = $("#imgSrc");
    var questionDisplay = $("#questions");



    // Timer Object
    var timer = {
        time_remaining: 10,

        // Decrement Timer
        decrementTimer: function (question) {
            timer.time_remaining--;
            if (timer.time_remaining < 10) {
                $("#timer").html("Time Left: 00:0" + timer.time_remaining);
                if (timer.time_remaining <= 5) {
                    $("#timer").text("Time Left: 00:0" + timer.time_remaining).css({
                        "color": "red",
                        "font-weight": "bold"
                    });
                }
            } else {
                $("#timer").html("Time Left: 00:" + timer.time_remaining);
            }

            if (timer.time_remaining === 0) {
                timer.stopTimer();
                alert("Time has expired");
                incorrect_answers++;
                totalScore = totalScore - (points * 10);
                question.asked = true;
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
        content.html("<span id='timer'>Time Left: 00:" + timer.time_remaining + "</span>");
        content.append("<span id='score'> Total Score: " + totalScore + "</span>");

        showQuestion();
    });

    // Display questions to screen
    function showQuestion() {
        // content.html("<span id='timer'>Time Left: 00:" + timer.time_remaining + "</span>");
        // content.append("<span id='score'> Total Score: " + totalScore + "</span>");

        $("#score").text("Total Score: " + totalScore);
        index = Math.floor(Math.random() * questions.length);

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
                timer.stopTimer();
                alert("Correct.");
                correct_answers++;
                console.log(totalScore);
                totalScore = totalScore + (points * timer.time_remaining);
                console.log(totalScore);
                clearInterval(timer.intervalID);
                clearContent();
            } else {
                // $("button").hide();
                timer.stopTimer();
                alert("Incorrect.");
                incorrect_answers++;
                console.log(totalScore);
                totalScore = totalScore - (points * timer.time_remaining);
                console.log(totalScore);
                clearInterval(timer.intervalID);
                clearContent();
            }
    }

    // Clear content
    function clearContent() {
        questionDisplay.empty();
        answerDisplay.empty();
        imageDisplay.empty();
        content.html("<span id='timer'>Time Left: 00:" + timer.time_remaining + "</span>");
        content.append("<span id='score'> Total Score: " + totalScore + "</span>");
        showQuestion();
    }

    // Show Results
    function showResults() {
        $("button").off();
        clearInterval(timer.intervalID);

        content.empty();
        $("#timer").html("");

        content.html("<h2 id='results'>Your Results</h2>");
        var correct = "<p id='correct'>Correct Answers: " + correct_answers + "</p>";
        var incorrect = "<p id='incorrect'>Incorrect Answers: " + incorrect_answers + "</p>";
        var finalScore = "<p id='finalScore'>Final Score: " + totalScore + "</p>";

        content.append(correct).append(incorrect).append(finalScore);
        $("#score").html("<p>Final Score: " + totalScore + "</p>");
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
        totalScore = 0;
        for (var i = 0; i < questions.length; i++) {
            questions[i].asked = false;
        }
        clearContent();
    }
});
