$(document).ready(function () {

    // Object to hold questions and answers
    var questions = [
        {
            image: "../images/Cowboys.png",
            question: "Who is the current quarterback for this team?",
            answers: ["Tony Romo", "Dak Prescott", "Rush Cooper", "Danny Manziel"]
        },
        {
            image: "../images/Bears.png",
            question: "In what city is this team located?",
            answers: ["Peoria", "Joilet", "Rockford", "Chicago"]
        },
        {
            image: "../images/Bills.png",
            question: "What famous food originated in this team's city?",
            answers: ["Buffalo Wings", "Philly Cheesesteak", "Deep Dish Pizza", "Cheesecake"]
        },
        {
            image: "../images/Broncos.png",
            question: "Which former QB of this team enjoys Chicken Parmesan?",
            answers: ["John Elway", "Tim Tebow", "Peyton Manning", "Brock Osweiler"]
        },
        {
            image: "../images/Browns.png",
            question: "Select the NBA team that shares this team city. Hint: they won the 2016 NBA Championship Title",
            answers: ["Boston Celtics", "Golden State Warriors", "Miami Heat", "Cleveland Cavaliers"]
        },
        {
            image: "../images/Falcons.png",
            question: "This team had a dance back in 1998 called the \"Dirty Bird\", where is team located?",
            answers: ["Atlanta", "Seattle", "Philadelphia", "Arizona"]
        },

        function displayAnswers(question) {
            for (var i = 0; i < answers; i++) {
                // Enter code here to display the answers whenever a question is chosen
                $("#content").append().html("<p id=\"answers\">" + questions.displayAnswers(question) + "</p>");
            }
        }
    ];

    // Used to select question at random index in array
    var index = Math.floor(Math.random() * questions.length);

    $("#start").click(function () {
        $("#content").append().html('<p id="question"></p>');
        var question = $("#question");
        console.log(index);
        console.log(questions.length);
        question.text(questions[index].question);
    });


});
