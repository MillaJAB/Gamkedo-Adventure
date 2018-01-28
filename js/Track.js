const TRACK_W = 50;
const TRACK_H = 50;
const TRACK_COLS = 16;
const TRACK_ROWS = 12;
const TRACK_GAP = 2;
var levelOne = [4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
				 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				 1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1,
				 1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0,
				 1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0,
				 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0,
				 1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0,
				 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0,
				 1, 0, 2, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0,
				 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0]
				 // 0 = empty space, 1 = wall, 2 = starting spot, 3 = goal line, 4 = trees, 5 = flags

var trackGrid = [];

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;

function returnTileTypeAtColRow(col, row) {
	if (col >= 0 && col < TRACK_COLS && 
		row >= 0 && row < TRACK_ROWS) {
		var trackIndexUnderCoord = rowColToArrayIndex(col, row);
		return trackGrid[trackIndexUnderCoord];
	} else {
		return TRACK_WALL;
	}
}

function getTileType(currentX, currentY) {
	var carTrackCol = Math.floor(currentX / TRACK_W);
	var carTrackRow = Math.floor(currentY / TRACK_H);
	var trackIndexUnderCar = rowColToArrayIndex(carTrackCol, carTrackRow);
	

	if (carTrackCol >= 0 && carTrackCol < TRACK_COLS && 
		carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {
		var tileHere = returnTileTypeAtColRow(carTrackCol, carTrackRow)
		
		return tileHere;
	}

	return TRACK_WALL;
} // end of carTrackHandling();

function rowColToArrayIndex(col, row) {
	return col + TRACK_COLS * row;
}

function drawTracks() {

	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
		for(var eachCol=0;eachCol<TRACK_COLS;eachCol++) {
			var tileKindHere = trackGrid[arrayIndex];
			var useImg = trackPics[tileKindHere];
			canvasContext.drawImage(useImg, drawTileX,drawTileY);

			drawTileX += TRACK_W;
			arrayIndex++;
		} // Goes through each column
		drawTileX = 0;
		drawTileY += TRACK_H;
	} // Above bits are incremented when you exit the last column and start a new row
} // end of drawTracks func