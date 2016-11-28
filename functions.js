//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Local Variables
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var board = []; //board array to see which tiles are 
var isRed = true; //If true then it is player x's turn
var svgNS = "http://www.w3.org/2000/svg";//svg ns specification
var gameWon = false;
var tilesClicked = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * Click square is called when a tile is clicked
 */
function clickSquare(tile, x, y) {
	if(canClick(tile) == false || gameWon == true) {return;}//Checks to see if tile is clickable
	
	if(isRed === true) {
		board[tile] = "RED";
		isRed = false;
	} else {
		board[tile] = "BLUE";
		isRed = true;
	}
	var message =  isRed ? "RED" : "BLUE";
	document.getElementById("gameMessage").innerHTML = "IT IS PLAYER " + message + "'S TURN";
	document.getElementById("extraMessage").innerHTML = "";
	addShape(tile, !isRed, x, y);
	tilesClicked += 1;
	checkGameWon();
}


/*
 *  Checks all patterns to see who won game
 */
function checkGameWon() {
	if(board[0] === "BLUE" && board[1] === "BLUE" && board[2] === "BLUE" ||
	   board[0] === "BLUE" && board[4] === "BLUE" && board[8] === "BLUE" ||
	   board[6] === "BLUE" && board[4] === "BLUE" && board[2] === "BLUE" ||
	   board[6] === "BLUE" && board[7] === "BLUE" && board[8] === "BLUE" ||
	   board[0] === "BLUE" && board[3] === "BLUE" && board[6] === "BLUE" ||
	   board[3] === "BLUE" && board[4] === "BLUE" && board[5] === "BLUE" ||
	   board[1] === "BLUE" && board[4] === "BLUE" && board[7] === "BLUE" ||
	   board[2] === "BLUE" && board[5] === "BLUE" && board[8] === "BLUE") {
			document.getElementById("gameMessage").innerHTML = "GAME OVER: PLAYER BLUE WON!";
			document.getElementById("extraMessage").innerHTML = "Please restart game to play again!";
			gameWon = true;
	} else if(board[0] === "RED" && board[1] === "RED" && board[2] === "RED" ||
	   board[0] === "RED" && board[4] === "RED" && board[8] === "RED" ||
	   board[6] === "RED" && board[4] === "RED" && board[2] === "RED" ||
	   board[6] === "RED" && board[7] === "RED" && board[8] === "RED" ||
	   board[0] === "RED" && board[3] === "RED" && board[6] === "RED" ||
	   board[3] === "RED" && board[4] === "RED" && board[5] === "RED" ||
	   board[1] === "RED" && board[4] === "RED" && board[7] === "RED" ||
	   board[2] === "RED" && board[5] === "RED" && board[8] === "RED") {
			document.getElementById("gameMessage").innerHTML = "GAME OVER: PLAYER RED WON!";
			document.getElementById("extraMessage").innerHTML = "Please restart game to play again!";
			gameWon = true;
	} else {
		if(tilesClicked == 9) {
			document.getElementById("gameMessage").innerHTML = "GAME OVER: ITS A TIE";
			document.getElementById("extraMessage").innerHTML = "Please restart game to play again!";
			gameWon = true;
		}
	}
}

/*
 * Checks tile location and adds shape accordingly
 * If playerRed = true then RED shape is added
 */
function addShape(tile, playerRed, x, y) {
	var shape = getCircleShape(tile, playerRed, x, y);
	document.getElementById("canvas").appendChild(shape);
}

/*
 * Creates Circle shape
 */
function getCircleShape(tile, playerRed, x, y) {
	var shape = document.createElementNS(svgNS, "circle");
	shape.setAttribute("cx", x+25);
	shape.setAttribute("cy", y+17.5);
	shape.setAttribute("r",  10);
	shape.setAttribute("stroke", playerRed ? "red" : "blue");
	shape.setAttribute("stroke-width", 3);
	shape.setAttribute("fill", playerRed ? "red" : "transparent");
	return shape;
}

/*
 * Checks to see if index within board array is null. 
 * If index in array is null then you can click
 */
function canClick(tile) {
	if(board[tile] == null) {
		return true;
	}
	document.getElementById("extraMessage").innerHTML = "THAT SPOT IS ALREADY CLICKED";
	return false;
}

/*
 * Refreshes web page... restarting the game
 */
function restart() {
	location.reload();
}