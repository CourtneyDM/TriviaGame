$(document).ready(function () {
    var content = $("#content");
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

    var intervalId;
    var timerRunning = false;



    $("#start").click(showQuestion);
    var index = Math.floor(Math.random() * questions.length);


    function showQuestion() {

        content.empty();
        $("button").off();

        $("button").removeAttr("id");
        $("button").text("Submit Answers");
        $("button").attr("id", "submit");

        content.append("<div id='timer'></div>");
        var question = questions[index].question;
        var asked = questions[index].asked;

        content.append(question);
        asked = true;
        showAnswers();
    }

    function showAnswers() {
        var answers = questions[index].choices;
        var correct = questions[index].answer;

        console.log(answers);
        console.log(correct);

        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            $("#answers").append("<input type='radio' name='answer' value='" + answer + "'/>" + answer);
        }


        $("#submit").click(function () {
            var chosen = $("input:checked").val();
            if (!chosen) {
                console.log("no answer selected");
            }
            else
                if (chosen === correct) {
                    // console.log("Correct answer");
                    $("button").hide();
                    $("#answers").append("<img src='https://media3.giphy.com/media/l8HFdR4jE4SM8/200w.webp'/>")
                }
                else {
                    $("button").hide();
                    $("#answers").append("<img src='https://media3.giphy.com/media/yhWfYEaF7TkQ0/giphy.gif'/>")
                }

        });
    }


});
