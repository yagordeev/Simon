$(document).ready(function() {
	new_colour();
	if(bestrecord > 0) {
		$('#record').text('Ваш рекорд: ' + bestrecord);
	} else {}
});

var gamePattern = [];
var userPattern = [];
var mylevel = 1;
var bestrecord = $('#gR').val();

function game() {
	$('#level-title').text('Level 1');
	new_colour();
	mylevel = 1;
}

$('.btn').on('click', function() {
	var colour = $(this).attr('id');
	userPattern.push(colour);
	record(userPattern.length - 1);
	checkSimon(userPattern.length - 1);
	$('.' + colour).addClass('active');
	setTimeout(function() {
		$('.' + colour).removeClass('active');
	}, 200);
});



function checkSimon(level) {
	if(userPattern[level] === gamePattern[level]) {
		if(level === gamePattern.length - 1) {
			if(gamePattern[level] === userPattern[level]) {
				mylevel++;
				$('#level-title').text('Level ' + mylevel);
				$('#play').text('Play again');
				userPattern = [];
				new_colour();
			} else {
				$('html').addClass('game-over');
				$('#level-title').text('GAME OVER');
				$('#record').text('Ваш рекорд: ' + bestrecord);
				gamePattern = [];
				userPattern = [];
				$('html').removeClass('red');
				setTimeout(function() {
					$('#gamerRecord').submit();
				}, 500);
			}
		}
	} else {
		$('html').addClass('game-over');
		$('#level-title').text('GAME OVER');
		$('#record').text('Ваш рекорд: ' + bestrecord);
		$('#play').text('Play again');
		gamePattern = [];
		userPattern = [];
		setTimeout(function() {
			$('#gamerRecord').submit();
		}, 500);
	}
}

function record() {
	if(mylevel > bestrecord) {
		bestrecord = mylevel;
		console.log('Рекорд' + bestrecord);
		$('#gamerRecord>#gR').val(bestrecord);
	}
}

function new_colour() {
	var randomNumber = Math.floor(Math.random() * 4);
	var buttonColours = ["red", "blue", "green", "yellow"];
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	setTimeout(function() {
		setTimeout(function() {
			$('.' + randomChosenColour).removeClass('glow');
		}, 500);
		$('.' + randomChosenColour).addClass('glow');
		//window.navigator.vibrate(200);
	}, 500);
};
