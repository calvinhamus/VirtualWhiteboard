var canvas, ctx, flag = false,
	prevX = 0,
	currX = 0,
	prevY = 0,
	currY = 0,
	dot_flag = false;

var strokeColor = "black",fillColor="black",strokeWidth = 1;

function initCanvas() {
	canvas = document.getElementById('layer0');
	ctx = canvas.getContext("2d");
	w = canvas.width;
	h = canvas.height;

	canvas.addEventListener("mousemove", function (e) {
		findxy('move', e);
	}, false);
	canvas.addEventListener("mousedown", function (e) {
		findxy('down', e);
	}, false);
	canvas.addEventListener("mouseup", function (e) {
		findxy('up', e);
	}, false);
	canvas.addEventListener("mouseout", function (e) {
		findxy('out', e);
	}, false);
}

function draw() {
	socket.emit('drawing',prevX,prevY,currX,currY);
	/*ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;
	ctx.stroke();
	ctx.closePath();*/
}

function erase() {
	var m = confirm("Want to clear");
	if (m) {
		ctx.clearRect(0, 0, w, h);
		document.getElementById("canvasimg").style.display = "none";
	}
}
socket.on("draw",function(drawData){

	var draw = JSON.parse(drawData);
	var prevX = draw.prevX;
	var prevY = draw.prevY;
	var currX = draw.currX;
	var currY =  draw.currY;
	var strokeColor = draw.strokeColor;
	var strokeWidth = draw.strokeWidth
	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = strokeColor;
	ctx.lineWidth = strokeWidth;
	ctx.stroke();
	ctx.closePath();

});
function save() {
	document.getElementById("canvasimg").style.border = "2px solid";
	var dataURL = canvas.toDataURL();
	document.getElementById("canvasimg").src = dataURL;
	document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
	if (res == 'down') {
		prevX = currX;
		prevY = currY;
		currX = e.clientX - canvas.offsetLeft;
		currY = e.clientY - canvas.offsetTop;

		flag = true;
		dot_flag = true;
		if (dot_flag) {
			ctx.beginPath();
			ctx.fillStyle = fillColor;
			ctx.fillRect(currX, currY, 2, 2);
			ctx.closePath();
			dot_flag = false;
		}
	}
	if (res == 'up' || res == "out") {
		flag = false;
	}
	if (res == 'move') {
		if (flag) {
			prevX = currX;
			prevY = currY;
			currX = e.clientX - canvas.offsetLeft;
			currY = e.clientY - canvas.offsetTop;
			draw();
		}
	}
}
