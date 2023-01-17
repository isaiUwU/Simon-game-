var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var gameStarted = false;

$(document).keypress(function () {
    if (gameStarted == false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
        
    }
});

$(".btn").click( function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(this);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("GAME OVER, Press Any Key to Restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        
        startOver()
    }
}

function nextSequence() {
    userClickedPattern = [];
        
    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound (name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress (currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(() => {
        $(currentColour).removeClass("pressed");
    }, 200);
}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0;
}