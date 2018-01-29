const PLAYER_SPEED = 5;
var keysOwned = 0;

function playerClass() {

	this.x = 75;
	this.y = 75;
	this.myPlayerPic; // which picture to use
	this.name = "Untitled Player";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) { // use this different notation when the function is a part of a class
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, playerName) {
		this.name = playerName;
		this.myPlayerPic = whichImage;

		for (var eachRow = 0; eachRow < TILE_ROWS; eachRow++) {
			for(var eachCol=0; eachCol<TILE_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == PLAYERSTART) {
					worldGrid[arrayIndex] = GROUND;
					this.x = eachCol * TILE_W + TILE_W/2;
					this.y = eachRow * TILE_H + TILE_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of playerReset func

	this.move = function() {
		var nextX = this.x;
		var nextY = this.y;

		if (this.keyHeld_Gas) {
			nextY -= PLAYER_SPEED;
		}
		if (this.keyHeld_Reverse) {
			nextY += PLAYER_SPEED;
		}
		
		if (this.keyHeld_TurnLeft) {
			nextX -= PLAYER_SPEED;
		}
		if (this.keyHeld_TurnRight) {
			nextX += PLAYER_SPEED;
		}

		var walkIntoTileIndex = getTileType(nextX, nextY);

		if (walkIntoTileIndex == CHALICE) {
			console.log(greenPlayer.name + " You WIN. Good jerb.");
			loadLevel(levelOne);		
		} else if (walkIntoTileIndex == KEY) {
			keysOwned++;
			console.log(keysOwned);
		} else if (walkIntoTileIndex == GROUND  ) { // Only moves if there's ground ahead
			this.x = nextX;
			this.y = nextY;
		} 
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myPlayerPic, this.x, this.y, this.ang);
	}
}
