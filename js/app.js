$('document').ready(function() {

// ===============================================
// ===== GLOBAL VARIABLES & Global Functions:
// ===============================================

let time = 30;
let round = 1;

const setTimer = () => {
	const timer = setInterval(() => {
		time--;
		if ((time === 0)) {
			clearInterval(timer);
			round++;
		}
	$('.time-left').text(time + 's');
	}, 1000)
}


const setUpRound = () => {
	$('.gameBoard').empty();
	$('.round-number').text(round);
	if(round === 1) {
		time = 30;
		console.log("This is round 1");
	} else if (round === 2) {
		time = 20;
		console.log("this is round 2");
	} else if (round === 3) {
		console.log("tis is round 3");
		time = 10;
	}
}
	
let gameBoard = [	[0,0,0],
					[0,0,0],
					[0,0,0],
];

for(let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('.game-board').append(`<div class='game-row-${i} game-row'></div>`)
	for(let x = 0; x < row.length; x++){
		$(`.game-row-${i}`).append(`<div class="game-circle game-circle-${x}-${i}"></div>`)
	}
}

// ===============================================
// ===== Constructors:
// ===============================================

class Player {
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.roundsWon = 0;
	}
	checkTrumpHeadClick (trump) {
		if (trump.renderHeads = true) {
			this.score++;
		} else {
			this.score--;
		}
	$('.score').text(score)
	}
}

class Heads {
	constructor(type) {
		this.type = type;
		this.xCoordinate = 1;
		this.yCoordinate = 1;	
	}
	renderHeads() {
		$(`.game-circle-${this.xCoordinate}-1`).addClass(this.type);
	}
}
// ===============================================
// ===== Instantiate Players:
// ===============================================

let playerOne = new Player();
let playerTwo = new Player();
let trump = new Heads("trump");




// ===============================================
// ===== Event Listeners:
// ===============================================




// ===============================================
// ===== Game Start:
// ===============================================

$('body').on('click', '.begin', function() {
	$('.begin').remove();
	setTimer();
	setUpRound();
	trump.renderHeads();

})












});	