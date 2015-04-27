var isScroll = false;

function getHeight() {
	var body = document.body,
		html = document.documentElement;

	return Math.max(body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight);
}

var audio = new Audio();
audio.setAttribute("type", "audio/mpeg");
audio.setAttribute("src", "music/whereIsMyMind.mp3");

window.onload = function() {
	audio.play();
}

window.onmousewheel = function(e) {
	if (e.deltaY > 0) {
		scrollPage();
	}
}


function scrollPage() {
	if (isScroll) {
		return;
	}
	var y = document.getElementById("first").offsetHeight;
	
	var points = [0];
	
	for (var i = 1; i < 14; i++) {
		points.push(y*i);
	}

	isScroll = true;
	var height = getHeight() - y;
	var endPoint = window.scrollY + y;
	
	for (var i = 1; i < points.length; i++) {
		if (points[i] - endPoint > 0) {
			endPoint = points[i - 1];
			break;
		}
	}
	
	if (endPoint > height) {
		endPoint = height;
	}
	var delay = 7;
	var chunks = 100;
	var step = y / chunks;


	var loop = setInterval(function() {
		if (window.scrollY + step < endPoint) {
			window.scrollBy(0, step);
		}
		else {
			window.scrollTo(0, endPoint);
			clearInterval(loop);
			isScroll = false;
		}
	}, delay);
}