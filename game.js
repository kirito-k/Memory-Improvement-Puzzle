// Colors on the board
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
// Flag to indicate new game
let newGame = true;


// If new game, initialize variables to default and start
$(document).on('keypress', function() {
    if (newGame) {
        gamePattern = [];
        nextSequence();
        newGame = false;
    }
})


// On each button click, show click animation, play respective sound
// and check if the pattern is valid
$('.btn').on('click', function() {
    buttonClick($(this).attr('id'));
    handler(this.id);
});


// Introduce new step to follow
function nextSequence() {
    // Reset user pattern for every new level
    userClickedPattern = [];
    $('h1').text('Level ' + (gamePattern.length + 1));
    
    // Generate a random color and show it to player
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    // Show animation and play sound
    buttonClick(randomChosenColor)
}


// Check validity of recently clicked button
function validation() {
    // Get last index of user pattern and check it against game board pattern
    let index = userClickedPattern.length - 1
   
    if(gamePattern[index] != userClickedPattern[index]) {
        // If the pattern is invalid, start a new game
        new Audio('./sounds/wrong.mp3').play();
        $('h1').text('Game Over, Press Any Key to Restart');
        newGame = true;
    } else if (gamePattern.length == userClickedPattern.length) {
        // If user reached complete pattern, introduce next button in sequence
        setTimeout(function() {
            nextSequence();
        }, 1000)
    }
}


// Show animation and play sound for specified button color
function buttonClick(color) {
    $('#' + color).addClass('pressed');
    setTimeout(function() {
        $('#' + color).removeClass('pressed');
    }, 100)
    
    let source_path = './sounds/' + color + '.mp3';
    new Audio(source_path).play();
}


// Insert user clicked pattern and check if its valid
function handler(color) {
    let userChosenColour = color;
    userClickedPattern.push(userChosenColour);
    
    validation();
}