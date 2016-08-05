var me=true;
var chessBoard= [];

var wins=[];
var count=0;
var blackwin=[];
var writewin=[];
var over=false;

var chess = document.getElementById('chess');
var context = chess.getContext('2d');

context.strokeStyle = "#BFBFBF";

//棋盘数组初始化
for (var i = 0; i < 15; i++) {
	chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		chessBoard[i][j] = 0;
	}
}

//赢法数组初始化
for (var i = 0; i < 15; i++) {
	wins[i] = [];
	for (var j = 0; j < 15; j++) {
		wins[i][j] = [];
	}
}

//所有横线赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i][j + k][count] = true;
		}
		count++;
	}
}

//所有竖线赢法
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[j + k][i][count] = true;
		}
		count++;
	}
}
//所有反斜线赢法
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j + k][count] = true;
		}
		count++;
	}
}
//所有斜线赢法
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			wins[i + k][j - k][count] = true;
		}
		count++;
	}
}

//胜负判断数组初始化
for (var i = 0; i < count; i++) {
	blackwin[i] = 0;
	writewin[i] = 0;
}


var logo = new Image();
logo.src = "images/logo.png";
logo.onload = function() {
	context.drawImage(logo, 0, 0, 450, 450);
	drawChessBoard();
}

var drawChessBoard = function() {
	for (var i = 0; i <= 15; i++) {
		context.moveTo(15, 15 + i * 30);
		context.lineTo(435, 15 + i * 30);
		context.stroke();

		context.moveTo(15 + i * 30, 15);
		context.lineTo(15 + i * 30, 435);
		context.stroke();
	}
}
var oneStep = function(i, j, me) {
	context.beginPath();
	context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
	context.closePath();
	var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30 + 2, 15 + j * 30 - 2, 0);
	if (me) {
		gradient.addColorStop(0, "#0A0A0A");
		gradient.addColorStop(1, "#636766");
	} else {
		gradient.addColorStop(0, "#D1D1D1");
		gradient.addColorStop(1, "#F9F9F9");
	}
	context.fillStyle = gradient;
	context.fill();
}

var judge = function(i, j, color) {
	for (var k = 0; k < count; k++) {
		if (wins[i][j][k]) {
			if (color == 1) {
				blackwin[k]++;
				writewin[k] = 6;
				if (blackwin[k] == 5) {
					window.alert("黑棋胜利");
					over = true;
				}
			}
			if (color == 2) {
				writewin[k]++;
				blackwin[k] = 6;
				if (writewin[k] == 5) {
					window.alert("白棋胜利");
					over = true;
				}
			}
		}
	}
}

chess.onclick = function(e) {
	if (over) {
		return;
	}
	var x = e.offsetX;
	var y = e.offsetY;
	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);
	if (chessBoard[i][j] == 0) {
		oneStep(i, j, me);
		if (me) {
			chessBoard[i][j] = 1;
		} else {
			chessBoard[i][j] = 2;
		}
		judge(i, j, chessBoard[i][j]);
		me = !me;
	}
}
