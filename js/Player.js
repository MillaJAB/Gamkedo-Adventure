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
		this.speed = 0;

		for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
			for(var eachCol=0; eachCol<TRACK_COLS;eachCol++) {

				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if (trackGrid[arrayIndex] == TRACK_PLAYERSTART) {
					trackGrid[arrayIndex] = TRACK_ROAD;
					this.ang = -Math.PI/2;
					this.x = eachCol * TRACK_W + TRACK_W/2;
					this.y = eachRow * TRACK_H + TRACK_H/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of carReset func

	this.move = function() {
		if (this.keyHeld_Gas) {
			this.y -= PLAYER_SPEED;
		}
		if (this.keyHeld_Reverse) {
			this.y += PLAYER_SPEED;
		}
		
		if (this.keyHeld_TurnLeft) {
			this.x -= PLAYER_SPEED;
		}
		if (this.keyHeld_TurnRight) {
			this.x += PLAYER_SPEED;
		}

		carTrackHandling(this);
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
	}
}
