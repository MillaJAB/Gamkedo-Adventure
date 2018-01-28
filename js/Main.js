var canvas, canvasContext;
var greenCar = new carClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, "black");
	colorText("Loading Images", canvas.width/2, canvas.height/2, "white");

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();
	
	loadLevel(levelOne);
}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice(); // Copies levelOne grid to the empty track grid
	greenCar.reset(playerPic, "Green Machine");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	greenCar.move();
}
	
function drawAll() {
	drawTracks();
	greenCar.draw();
}