var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).keypress(function () {
    if (level === 0) nextSequence();
});

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function startOver() {
    gamePattern = [];
    level = 0;
}

function checkAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function playSound(currentColor) {
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var newColor = buttonColors[randomNumber];
    gamePattern.push(newColor);
    $("#" + newColor)
        .fadeOut(100)
        .fadeIn(100);

    playSound(newColor);
}
