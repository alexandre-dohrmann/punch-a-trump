$('document').ready(function() {

// ===============================================
// ===== GLOBAL VARIABLES & Global Functions:
// ===============================================

let time = 30;
let round = 1;
let circleNumber = [];


const setTimer = () => {
	const timer = setInterval(() => {
	time--;
	renderHeads();
	$('.time-left').text(time + '\'s');
	if ((time === 0)) {
		clearInterval(timer);
		round++;
		$('.round-number').text(round);
		$('.game-board').empty();
		}
	}, 1000)
}


const setUpRound = () => {
	$('.gameBoard').empty();
	$('.round-number').text(round);
	if(round === 1) {
		time = 30;
	} else if (round === 2) {
		time = 20;
	} else if (round === 3) {
		time = 10;
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
	console.log(circleNumber)
	setTimeout(() => {
		$(`.game-circle-${circleNumber}`).removeClass('trump').addClass('game-circle');
	}, 750)
}

function checkValidTrump () {
	if ($('.trump')) {
		playerOne.score++;
	} else {
	}
$('.score').text(playerOne.score)
}

// ===============================================
// ===== GAMEBOARD:
// ===============================================
	
let gameBoard = [	[1,2,3],
					[4,5,6],
					[7,8,9],
];
for(let i = 0; i < gameBoard.length; i++){
	let row = gameBoard[i];
	$('.game-board').append(`<div class='game-row'></div>`)
	for(let x = 0; x < row.length; x++){
		let circleNumber = row[x];
		$('.game-board').append(`<div class='game-circle game-circle-${circleNumber}'></div>`)
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
}

class Heads {
	constructor(type) {
		this.type = type;
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



})












});	