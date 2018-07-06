$('document').ready(function() {

// ======================================================
// ===== GAMEBOARD, GLOBAL VARIABLES, & GLOBAL FUNCTIONS:
// ======================================================

let gameBoard = [	[1,2,3],
					[4,5,6],
					[7,8,9],
];
let time = 0;
let round = 1;
let circleNumber = [];

const setTimerP1 = () => {
	const timer = setInterval(() => {
	time--;
	renderHeads();
	$('.time-left-p1').text(time + '\'s');
	if ((time === 0)) {
		clearInterval(timer);
		$('.game-background').remove();
		$('body').append($(`<button class="next-player" onclick="punch.play()">${playerTwo.name}'s Turn!</button>`))
		}
	}, 1000)
}

const setTimerP2 = () => {
	const timer = setInterval(() => {
		time--;
		renderHeads();
		$('.time-left-p2').text(time + '\'s');
		if (time === 0) {
			clearInterval(timer);
			if (round === 3) {
				endRound();
				endGame();
			} else {
				round++;
				$('.game-background').remove();
				$('body').append($(`<button class="next-round" onclick="punch.play()">Round ${round} - START!</button>`));
			}
		}
	}, 1000)
}

// ===============================================
// ===== Constructors & Objects:
// ===============================================

class Player {
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.roundsWon = 0;	
	}
}

class Heads {
	constructor(type) {
		this.type = type;
	}

}

// ===============================================
// ===== Instantiate Players:
// ===============================================

const playerOne = new Player();
const playerTwo = new Player();
const trump = new Heads("trump");


const game = {
	activePlayer: playerOne,
}

// ===============================================
// ===== Functions:
// ===============================================


function setUpRound() {
	$('.round-number').text(round);
	if(round === 1) {
		time = 5;
	} else if (round === 2) {
		time = 5;
	} else if (round === 3) {
		time = 5;
	} else if (round ===4) {

	}
}

function endRound () {
	if (playerOne.score > playerTwo.score) {
		playerOne.roundsWon++;
		$('.rounds-won-p1').text(playerOne.roundsWon).css('color', 'white');
	} else if (playerTwo.score > playerOne.score) {
		playerTwo.roundsWon++;
		$('.rounds-won-p2').text(playerTwo.roundsWon).css('color', 'white');
	} else if (playerOne.score == playerTwo.score) {
		return
	}
}

function endGame () {
		$('.game-background').remove();
		const $restartButton = $('<button class="refresh" value="Refresh Page" onClick="window.location.reload()">Play Again!</button>');
		if (playerOne.roundsWon > playerTwo.roundsWon) {
			const $restartButton = $('<button class="refresh" value="Refresh Page" onClick="window.location.reload()">Start Over</button>');
			$('body').append($('<br>')).append($restartButton).append(`<h2 class="winner">${playerOne.name} has won!</h2`);
			$('.winner').append(`<h3>${playerTwo.name}, maybe next time you'll show more patriotism and punch a bit harder.</h3>`);
			$('h3').append('<div class="birdsDiv"></div>');
			$('.birdsDiv').append(("<img class='birds' src='images/birds.gif'/>"));
			$('.birdsDiv').append('<div class="dizzyTrump"></div>');
			$('.dizzyTrump').append("<img class='dizzy' src ='images/dizzy.png'/>");
		} else if (playerTwo.roundsWon > playerOne.roundsWon) {
			$('body').append($('<br>')).append($restartButton).append(`<h2 class="winner">${playerTwo.name} has won!</h2>`);
			$('.winner').append(`<h3>${playerOne.name}, maybe next time you'll show more patriotism and punch a bit harder.</h3>`);
			$('h3').append('<div class="birdsDiv"></div>');
			$('.birdsDiv').append(("<img class='birds' src='images/birds.gif'/>"));
			$('.birdsDiv').append('<div class="dizzyTrump"></div>');
			$('.dizzyTrump').append("<img class='dizzy' src ='images/dizzy.png'/>");

		} else if (playerOne.roundsWon === playerTwo.roundsWon) {
			$('body').append($('<br>')).append($restartButton).append('<h2 class="winner">Both Players Have Tied!</h2>').append($('<br>')).append($restartButton);
			$('.winner').append(`<h3>${playerOne.name} & ${playerTwo.name}, you're both heroes to this country!</h3>`);
			$('h3').append('<div class="birdsDiv"></div>');
			$('.birdsDiv').append(("<img class='birds' src='images/birds.gif'/>"));
			$('.birdsDiv').append('<div class="dizzyTrump"></div>');
			$('.dizzyTrump').append("<img class='dizzy' src ='images/dizzy.png'/>");
	}
}

function renderHeads() {
	$('.trump').off();
	let randNums = [];
	while (randNums.length < 3) {
		let randomNumber = Math.floor(Math.random() * 9) + 1;
			if(randNums.includes(randomNumber) == false) {
			randNums.push(randomNumber);
			console.log(randNums);
		}
	}
	for (let i = 0; i < randNums.length; i++) {
		circleNumber = randNums[i];
		$(`.game-circle-${circleNumber}`).addClass(trump.type);
	}
	$('.trump').on('click', (e) => {
		$(e.currentTarget).removeClass('trump').addClass('game-circle').off();
		checkValidTrump();		
	});
	removeHeads();
};

function removeHeads() {
	setTimeout(() => {
		$(`.game-circle-${circleNumber}`).removeClass('trump').addClass('game-circle');
	}, 600)
}

function checkValidTrump () {
	if (game.activePlayer == playerOne) {
		if ($('.trump')) {
			game.activePlayer.score++;
		} else { 
		}
	$('.score-p1').text(game.activePlayer.score).css('color', 'white');
	} else if (game.activePlayer == playerTwo) {
		if ($('.trump')) {
			game.activePlayer.score++;
		} else {
		}
	$('.score-p2').text(game.activePlayer.score).css('color', 'white');
	}
}

function switchActivePlayer(){
    if (game.activePlayer == playerOne) {
        game.activePlayer = playerTwo;
    } else {
        game.activePlayer = playerOne;
    }
}

// ===============================================
// ===== GAMEBOARD Render:
// ===============================================
	
function createGameboard() {
	for(let i = 0; i < gameBoard.length; i++){
		let row = gameBoard[i];
		$('.game-board').append(`<div class='game-row'></div>`)
		for(let x = 0; x < row.length; x++){
			let circleNumber = row[x];
			$('.game-board').append(`<div class='game-circle game-circle-${circleNumber}'></div>`)
		}
	}
}


// ===============================================
// ===== Event Listeners & GAME START:
// ===============================================

$('body').on('click', '.begin', function() {
	if (round === 1) {
		let userName1 = prompt("What's player one's name?");
		let userName2 = prompt("What's player two's name?")
		playerOne.name = userName1;
		playerTwo.name = userName2;
		$('.meter-name-p1').empty();
		$('.meter-name-p2').empty();
		$('.meter-name-p1').append(`<span class="p1">${playerOne.name}</span>`);
		$('.meter-name-p2').append(`<span class="p2">${playerTwo.name}</span>`);
	}
	$('.button-row').remove();
	createGameboard();
	setUpRound();
	setTimerP1();
})

$('body').on('click', '.next-player', function() {
	switchActivePlayer();
	$('.next-player').remove();
	$('body').append('<div class="game-background" onclick="punch.play()"></div>');
	$('.game-background').append('<div class="container" onclick="punch.play()"></div>').css("background-image", "url(images/whitehouse.png)");
	$('.container').append('<div class="game-board" onclick="punch.play()"></div>');
	createGameboard();
	setUpRound();
	setTimerP2();
})

$('body').on('click', '.next-round', function() {
	endRound();
	switchActivePlayer();
	$('.next-round').remove();
	$('body').append('<div class="game-background" onclick="punch.play()"></div>');
	$('.game-background').append('<div class="container" onclick="punch.play()"></div>').css("background-image", "url(images/whitehouse.png)");
	$('.container').append('<div class="game-board" onclick="punch.play()"></div>');
	createGameboard();
	setUpRound();
	setTimerP1();
});





});	