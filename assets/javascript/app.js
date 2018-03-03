$(document).ready(function () {
    var answerDisplay = $("#answers");
    var questionDisplay = $("#questions");

    // Object to hold questions and choices
    var questions = [
        {
            image: "../images/Cowboys.png",
            question: "Who is the current quarterback for this team?",
            choices: ["Tony Romo", "Dak Prescott", "Rush Cooper", "Danny Manziel"],
            answer: "Dak Prescott",
            asked: false
        },
        {
            image: "../images/Bears.png",
            question: "In what city is this team located?",
            choices: ["Peoria", "Joilet", "Rockford", "Chicago"],
            answer: "Chicago",
            asked: false
        },
        {
            image: "../images/Bills.png",
            question: "What famous food originated in this team's city?",
            choices: ["Buffalo Wings", "Philly Cheesesteak", "Deep Dish Pizza", "Cheesecake"],
            answer: "Buffalo Wings",
            asked: false
        },
        {
            image: "../images/Broncos.png",
            question: "Which former QB of this team enjoys Chicken Parmesan?",
            choices: ["John Elway", "Tim Tebow", "Peyton Manning", "Brock Osweiler"],
            answer: "Peyton Manning",
            asked: false
        },
        {
            image: "../images/Browns.png",
            question: "Select the NBA team that shares this team city. Hint: they won the 2016 NBA Championship Title",
            choices: ["Boston Celtics", "Golden State Warriors", "Miami Heat", "Cleveland Cavaliers"],
            answer: "Cleveland Cavaliers",
            asked: false
        },
        {
            image: "../images/Falcons.png",
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

    // Timer Object
    var timer = {
        time_remaining: 0,

        decrementTimer: function () {
            timer.time_remaining--;
            if (timer.time_remaining < 10) {
                $("#timer").html("<p>00:0" + timer.time_remaining + "</p>");
            }
            else {
                $("#timer").html("<p>00:" + timer.time_remaining + "</p>");
            }
            if (timer.time_remaining === 0) {
                timer.stopTimer();
                alert("Time has expired");
                clearContent();
            }
        },

        startTimer: function () {
            intervalID = setInterval(timer.decrementTimer, 1000);
        },

        stopTimer: function () {
            clearInterval(intervalID)
        }
    }

    // Start game when button has been clicked
    $("#start").click(showQuestion);

    // Display questions to screen
    function showQuestion() {
        index = Math.floor(Math.random() * questions.length);

        var question = questions[index].question;
        var asked = questions[index].asked;

        console.log("counter: " + counter);
        console.log(asked);

        if (asked === true) {
            counter++;
            if (counter === questions.length) {
                // create a function to show the results
                console.log(counter + " questions have been asked.");
            }
            else {
                index++;
                console.log(counter);
            }
        }

        $("#questions").empty();
        timer.time_remaining = 5;
        timer.startTimer();

        $("#instructions").hide();
        $("button").off();

        $("button").removeAttr("id");
        $("button").text("Submit Answers");
        $("button").attr("id", "submit");


        $("#questions").html("<p>" + question + "</p>");

        showAnswers();
        questions[index].asked = true;
    }

    // Display answers to screen
    function showAnswers() {
        var answers = questions[index].choices;
        var correct = questions[index].answer;

        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            $("#answers").append("<input type='radio' name='answer' value='" + answer + "'/>" + answer);
        }
        $("#submit").on("click", checkAnswer);
    }

    // Check answers
    function checkAnswer() {
        var correct = questions[index].answer;
        var chosen = $("input:checked").val();

        if (!chosen) {
            alert("no answer selected");
        }
        else
            if (chosen === correct) {
                // console.log("Correct answer");
                $("button").hide();
                timer.stopTimer();
                alert("Correct.");
                // $("#answers").append("<img src='https://media3.giphy.com/media/l8HFdR4jE4SM8/200w.webp'/>");
                clearInterval(timer.intervalID);
                clearContent();
            }
            else {
                $("button").hide();
                alert("Incorrect.");
                timer.stopTimer();
                // $("#answers").append("<img src='https://media3.giphy.com/media/yhWfYEaF7TkQ0/giphy.gif'/>");
                clearInterval(timer.intervalID);
                clearContent();
            }
    }

    // Clear content
    function clearContent() {
        questionDisplay.empty();
        answerDisplay.empty();
        // clearInterval(timer.intervalID);
        $("button").css("display", "inherit");
        $("#timer").html("<p>00:20</p>");
        showQuestion();
    }
});
