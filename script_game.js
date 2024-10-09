let times = 0;
let w = window.innerWidth;
let h = window.innerHeight;
let request1;
let request2;
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
	let left = document.querySelector("#left");
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

document.addEventListener('keypress', move)

function isTouchLeft(ball) {
	let left = document.querySelector("#left");
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
	x = 0;
	y = 0;
	ball.style.visibility = "hidden";
	left.style.visibility = "hidden";
	ball.style.left = `${x}px`;
	ball.style.top = `${y}px`;
	document.querySelector("#visible").innerHTML = 3;
	setTimeout(() => {
		clearInterval(timer);
		dx = 5;
		yx = 5;
		x_speed = dx;
		y_speed = dy;
		document.querySelector("#ball_spd").innerHTML = `x speed: ${Math.abs(x_speed)}<br>y speed: ${Math.abs(y_speed)}`;
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
			document.querySelector('#right_score').innerHTML = '';
			document.querySelector('#your_score').innerHTML = '';
			start();">
			restart
		</button>
		`
	}, 3000);
	visible.style.visibility = "visible";
	let timer = setInterval(() => {
		document.querySelector("#visible").innerHTML -= 1;
	}, 1000);
}