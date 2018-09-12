
$(window).on("load", function() {
	$(".loader .inner").fadeOut(1600, function() {
		$(".loader").fadeOut(750);
	});
});


$(document).ready(function() {


var scores, roundScore, activePlayer, gamePlaying;
init();
 
function pigPlay() { 
	var snort = document.getElementById("pigSound");
    snort.play(); 
} 

function whistlePlay() {
	var whistle = document.getElementById("whistleSound");
	whistle.play();
}

function victoryPlay() {
	var victory = document.getElementById("victorySound");
	var pigCry = document.getElementById("pigCry");
	victory.play();
	pigCry.play();
}

function victoryStop() {
	var victory = document.getElementById("victorySound");
	var pigCry = document.getElementById("pigCry");
	victory.pause();
	pigCry.pause();
	victory.currentTime = 0;
	pigCry.currentTime = 0;
}


document.getElementById("suspense").addEventListener("click", whistlePlay);




document.querySelector(".btn-roll").addEventListener("click", function() {
	if(gamePlaying) {
		//1. Random number
		var dice =  Math.floor(Math.random() * 6) + 1;
		//var dice2 = ( Math.floor.Math.random() * 6) + 1;

		//2. Display the result
		var diceDOM = document.querySelector(".dice");

		diceDOM.style.display = "block";
		diceDOM.src = 'images/dice-' + dice + ".png";



		//3. Update the round score IF the rolled number was NOT a 1
		if(dice !== 1 ) {
			//Add score 
			roundScore += dice;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		} else {
			pigPlay();
			nextPlayer();
		}
	}
	
});

document.querySelector(".btn-hold").addEventListener("click", function() {

	if(gamePlaying) {
			//ADD current score to global score
		scores[activePlayer] += roundScore;
		// same as : -->  scores[activePlayer] = scores[activePlayer] + roundScore;
		//UPDATE the UI
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		//Check if the player won the game
		if(scores[activePlayer] >= 50) {
			//end the game
			document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
			document.querySelector(".dice").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			pigPlay();
			victoryPlay();
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}	
});

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	document.querySelector(".player-0-panel").classList.toggle("active");
	document.querySelector(".player-1-panel").classList.toggle("active");


	// document.querySelector(".player-0-panel").classList.remove("active");
	// document.querySelector(".player-1-panel").classList.add("active");

	document.querySelector(".dice").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;
	victoryStop();

	document.querySelector(".dice").style.display = "none";

	document.getElementById("score-0").textContent = "0";
	document.getElementById("score-1").textContent = "0";
	document.getElementById("current-0").textContent = "0";
	document.getElementById("current-1").textContent = "0";

	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";
	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}

});
