const PLAYER_SPEED = 5;

function carClass() {

	this.x = 75;
	this.y = 75;
	this.myCarPic; // which picture to use
	this.name = "Untitled Car";

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

	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;

		for (var eachRow = 0; eachRow < WORLD_ROWS; eachRow++) {
			for(var eachCol=0; eachCol<WORLD_COLS;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (worldGrid[arrayIndex] == PLAYERSTART) {
					worldGrid[arrayIndex] = GROUND;
					this.x = eachCol * WORLD_W + WORLD_W/2;
					this.y = eachRow * WORLD_H + WORLD_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of carReset func

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
			console.log(greenCar.name + " You WIN. Good jerb.");
			loadLevel(levelOne);		
		} else if (walkIntoTileIndex == GROUND  ) {
			this.x = nextX;
			this.y = nextY;
		}
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
	}
}
