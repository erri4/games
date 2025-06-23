let times = 0;
let w = window.innerWidth;
let h = window.innerHeight;
let request1;
let request2;
let out;
let interv;
let dx = 5;
let dy = 5;
let xl = 50;
let x = 0;
let y = 0;
let x_speed = 0;
let y_speed = 0;
let score_right = 0;
let stopped = false;
let started = false;

let clos = function(){
	if (!stopped){
		x_speed = dx;
		y_speed = dy;
		if (started){
			document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
		}
	}
	document.querySelector('#help_cont').innerHTML = `
		<div id="unvisible">
			
		</div>
	`;
	document.querySelector('#helper').disabled = false;
}

let move = function(e) {
	let left = document.querySelector("#realleft");
	let key = e.key;
	if (x_speed && y_speed) {
		if (key === "ArrowUp") {
			if (xl > 10){
				request2 = window.requestAnimationFrame(() => {
					xl -= 40;
					left.style.top = `${xl}px`;
				});
			}
		}
		else if (key === "ArrowDown") {
			if (xl + 140 < window.innerHeight - 1){
				request2 = window.requestAnimationFrame(() => {
					xl += 40;
					left.style.top = `${xl}px`;
				});
			}
		}
	}
}

document.addEventListener('keydown', move)

function isTouchLeft(ball) {
	let left = document.querySelector("#realleft");
	left.style.right = "90px";
	
	let posr = String(left.style.right).split("p");
	posr = Number(posr[0]);
	let left_down = xl + 100;
	let ball_left = String(ball.style.left).split("p");
	ball_left = Number(ball_left[0]);
	let ball_top = String(ball.style.top).split("p");
	ball_top = Number(ball_top[0]);
	let ball_down = ball_top + 50;
	if (ball_left <= posr && ball_left >= posr - 40){
		if (xl == ball_top){
			times ++;
			document.querySelector('#your_score').innerHTML = `your score: ${times}`;
			if (times % 10 === 0){
				x_speed += Math.abs(x_speed)/x_speed;
				y_speed += Math.abs(y_speed)/y_speed;
				dx += Math.abs(dx)/dx;
				dy += Math.abs(dy)/dy;
			}
			document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
			return true;
		}
		else if (xl > ball_top){
			if (ball_down > xl){
				if (xl >= ball_top){
					times ++;
					document.querySelector('#your_score').innerHTML = `your score: ${times}`;
					if (times % 10 === 0){
						x_speed += Math.abs(x_speed)/x_speed;
						y_speed += Math.abs(y_speed)/y_speed;
						dx += Math.abs(dx)/dx;
						dy += Math.abs(dy)/dy;
					}
					document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
					return true;
				}
			}
		}
		else if (xl < ball_top){
			if (ball_top < left_down){
				if (xl <= ball_top){
					times ++;
					document.querySelector('#your_score').innerHTML = `your score: ${times}`;
					if (times % 10 === 0){
						x_speed += Math.abs(x_speed)/x_speed;
						y_speed += Math.abs(y_speed)/y_speed;
						dx += Math.abs(dx)/dx;
						dy += Math.abs(dy)/dy;
					}
					document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
					return true;
				}
			}
		}
	}
	return false;
}

function animate() {
	let ball = document.querySelector("#ball");
	x += x_speed;
	y += y_speed;
	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;
	if (window.innerHeight !== h || window.innerWidth !== w){
		if (x_speed && y_speed){
			x = 0;
			y = 0;
			ball.style.left = `${x}px`;
			ball.style.top = `${y}px`;
			h = window.innerHeight;
			w = window.innerWidth;
		}
	}
	if (x + 59 > window.innerWidth || x < 0) {
		if (x + 59 > window.innerWidth) {
			x_speed = -x_speed;
			dx = -dx;
		}
		if (x < 0) {
			score_right ++;
			document.querySelector("#right_score").innerHTML = `your fails: ${score_right}`;
			document.querySelector("#your_score").innerHTML = '';
			times = 0;
			x = window.innerWidth / 2;
			x_speed = -x_speed
			dx = -dx;
			y = 0;
		}
	}
	if (y + 64 > window.innerHeight || y < 0) {
		y_speed = -y_speed;
		dy = -dy;
	}
	if(x_speed < 0){
		if(isTouchLeft(ball)){
			x_speed = -x_speed;
			dx = -dx;
		}
	}

	request1 = window.requestAnimationFrame(animate);
}

let change = function(t) {
	document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
	if (t) {
		document.querySelector("#btn_cont").innerHTML = `
			<button id="start" onclick="
				x_speed = dx;
				y_speed = dy;
				stopped = false;
				change(false);
			">
				continue
			</button>
			<button id="restart" onclick="
				score_right = 0;
				times = 0;
				document.querySelector('#right_score').innerHTML = '';
				document.querySelector('#your_score').innerHTML = '';
				start();">
				restart
			</button>
			`
	}
	if (!t) {
		document.querySelector("#btn_cont").innerHTML = `
			<button id="stop" onclick="
				x_speed = 0;
				y_speed = 0;
				change(true);
			">
				stop
			</button>
			<button id="restart" onclick="
				score_right = 0;
				times = 0;
				document.querySelector('#right_score').innerHTML = '';
				document.querySelector('#your_score').innerHTML = '';
				start();">
				restart
			</button>
			`
	}
}

let start = function() {
	window.cancelAnimationFrame(request1);
	clearInterval(interv);
	clearTimeout(out);
	left = document.querySelector("#realleft")
	x = 0;
	y = 0;
	document.querySelector("#visible").innerHTML = 3;
	ball.style.visibility = "hidden";
	left.style.visibility = "hidden";
	left.style.top = "50px";
	document.querySelector("#ball_spd").style.visibility = 'hidden';
	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;
	dx = 5;
	dy = 5;
	document.querySelector("#visible").innerHTML = 3;
	out = setTimeout(() => {
		clearInterval(interv);
		x_speed = dx;
		y_speed = dy;
		document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
		document.querySelector("#ball_spd").style.visibility = 'visible';
		ball.style.visibility = "visible";
		left.style.visibility = "visible";
		visible.style.visibility = "hidden";
		animate();
		document.querySelector("#btn_cont").innerHTML = `
		<button id="stop" onclick="
			x_speed = 0;
			y_speed = 0;
			stopped = true;
			change(true);">
			stop
		</button>
		<button id="restart" onclick="
			score_right = 0;
			times = 0;
			document.querySelector('#right_score').innerHTML = '';
			document.querySelector('#your_score').innerHTML = '';
			start();">
			restart
		</button>
		`
	}, 3000);
	visible.style.visibility = "visible";
	interv = setInterval(() => {
		document.querySelector("#visible").innerHTML -= 1;
	}, 1000);
}

let drag = function(left) {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	left.onmousedown = dragStart;
	left.ontouchstart = dragStart;

	function dragStart(e) {
		e.preventDefault();
		if (x_speed && y_speed){
			if (e.type === 'touchstart') {
				pos3 = e.touches[0].clientX;
				pos4 = e.touches[0].clientY;
				document.ontouchend = closeDragElement;
				document.ontouchmove = elementDrag;
			} else {
				pos3 = e.clientX;
				pos4 = e.clientY;
				document.onmouseup = closeDragElement;
				document.onmousemove = elementDrag;
			}
		}
	}

	function elementDrag(e) {
		e.preventDefault();

		let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

		pos1 = pos3 - clientX;
		pos2 = pos4 - clientY;
		pos3 = clientX;
		pos4 = clientY;

		let newTop = document.querySelector("#realleft").offsetTop - pos2;

		if (newTop >= 10 && newTop + 140 <= window.innerHeight - 1) {
			xl = newTop;
			document.querySelector("#realleft").style.top = xl + "px";
		}
	}

	function closeDragElement(e) {
		document.onmouseup = null;
		document.onmousemove = null;
		document.ontouchend = null;
		document.ontouchmove = null;
	}
};

drag (document.querySelector("#left"));