const buttonColours = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let newGame = true;

function nextSequence() {
    userClickedPattern = [];
    $('h1').text('Level ' + (gamePattern.length + 1));
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    buttonClick(randomChosenColor)
}

function validation() {
    let index = userClickedPattern.length - 1
    if(gamePattern[index] != userClickedPattern[index]) {
        new Audio('./sounds/wrong.mp3').play();
        $('h1').text('Game Over, Press Any Key to Restart');
        newGame = true;
    } else if (gamePattern.length == userClickedPattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000)
    }
}

function buttonClick(id) {
    $('#' + id).addClass('pressed');
    setTimeout(function() {
        $('#' + id).removeClass('pressed');
    }, 100)
    let source_path = './sounds/' + id + '.mp3';
    new Audio(source_path).play();
}

function handler(id) {
    let userChosenColour = id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    validation();
}

$('.btn').on('click', function() {
    buttonClick($(this).attr('id'));
    handler(this.id);
});


$(document).on('keypress', function() {
    if (newGame) {
        gamePattern = [];
        nextSequence();
        newGame = false;
    }
})