
let clos = function(){
	document.querySelector('#help_cont').innerHTML = `
		<div id="unvisible">
				
		</div>
	`;
	document.querySelector('#helper').disabled = false;
}

let time_out;
let time = 30;
let time_interval = 3
let rand = function(){
	let random = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
	return `btn${random}`;
}

let func_btn = function(){
	let btn = document.querySelectorAll(".btn");
	let random = rand();
	document.querySelector(`#${random}`).classList.add("red");
	time_out = setTimeout(() => document.querySelector(`#${random}`).classList.remove("red"), Number(`${time_interval}000`))
}

let score = 0;
let on_get_score = function(btn){
	if (time !== 30){
		if (document.querySelector(`#btn${btn}`).classList.contains("red")){
			score += 10;
			document.querySelector(`#btn${btn}`).classList.remove("red");
			document.querySelector("#score").innerHTML = score;
		}
		else {
			score -= 5;
			document.querySelector("#score").innerHTML = score;
		}
	}
}

let start = function(){
	document.querySelector("#score").innerHTML = `${score}`;
	document.querySelector("#time").innerHTML = `${time}`;
	document.querySelector("#start_button").disabled = true;
	let interval = setInterval(func_btn, 500)
	let timer = setInterval(() => {
		document.querySelector("#time").innerHTML = time;
		time -= 1;
		if (time === 20 || time === 10){
			time_interval = Number(`${time}`) / 10
		}
	}, 1000);
	setTimeout(() => {
		let name = document.querySelector("#name").value
		clearTimeout(time_out);
		clearInterval(interval);
		if (name === ""){
			name = "anonymous"
		}
		clearInterval(timer);
		let name_score = {}
		if (localStorage.getItem("user") !== ""){
			name_score = JSON.parse(localStorage.getItem("user"));
		}
		if (Number(name_score[`${name}`]) <= score || !Number(name_score[`${name}`])){
			name_score[`${name}`] = `${score}`;
		}
		let sortable = [];
		for (let val in name_score) {
			sortable.push([val, name_score[val]]);
		}
		sortable.sort((a, b) => {
			return b[1] - a[1];
		});
		let obj = Object.fromEntries(sortable);
		localStorage.setItem("user", JSON.stringify(obj));
		let usr = ``;
		for (let val in obj) {
			usr += `${val}: ${obj[val]}<br>`;
		}
		document.body.innerHTML = `<br><div><h1>history:</h1></div><div class="history">${usr}<br><br><button onclick="location.reload()">play again</button></div>`;
}, Number(`${time}000`))
}
