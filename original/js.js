function move() {

	if (keys && keys.length > 0) {

		var desu = document.getElementById("desu");

		var top = parseInt(desu.style.top);
		var left = parseInt(desu.style.left);

		if (in_array(37,keys))
			if (!collision(top, left - step))
				desu.style.left = (left - step) + "px";

		if (in_array(38,keys))
			if (!collision(top - step, left))
				desu.style.top = (top - step) + "px";

		if (in_array(39,keys))
			if (!collision(top, left + step))
				desu.style.left = (left + step) + "px";

		if (in_array(40,keys))
			if (!collision(top + step, left))
				desu.style.top = (top + step) + "px";

		if (parseInt(top) > 1)
			desu.style.zIndex = top;
		else
			desu.style.zIndex = 1;

		var new_top = parseInt(desu.style.top);
		var new_left = parseInt(desu.style.left)

		var dx = top - new_top;
		var dy = left - new_left;

		var cl = [];

		if (dx < 0)
			cl.push('down');
		else if (dx > 0)
			cl.push('up');

		if (dy < 0)
			cl.push('right');
		else if (dy > 0)
			cl.push('left');

		if (cl.length)
			desu.className = cl.join('-');

		//log(top+' '+left,1);

		if (318 < new_top && 419 < new_left && new_top < 328 && new_left < 523) {
			dirty_boots = true;
      clearTimeout(dirty_foot_timeout);
      dirty_foot_timeout = setTimeout("clear_boots()",14000);
    }

		if (dirty_boots)
			footsteps(new_top,new_left,cl.join('-'));

	}

}


function footsteps(top,left,cl) {

	steps++;
  
	if (steps%15 == 0) {

		var rnd_id = 'f' + 10000 + Math.ceil(Math.random()*100000);

		var div = document.createElement("div");
		div.id = rnd_id;
		div.className = 'footstep fs-'+cl;
		div.style.opacity = 1;

		if (cl == 'down' || cl == 'up') {

			var rnd_top = 2 - Math.ceil(Math.random()*5);
			var rnd_left = 7 + Math.ceil(Math.random()*5);

			div.style.top = desu_top+top+rnd_top+'px';

			if (steps%30 == 0) {
				div.style.left = desu_left+left-rnd_left+'px';
			} else {
				div.style.left = desu_left+left+rnd_left+'px';
			}

		} else if (cl == 'left' || cl == 'right') {

			var rnd_top = 7 + Math.ceil(Math.random()*5);
			var rnd_left = 2 - Math.ceil(Math.random()*5);

			div.style.left = desu_left+left+rnd_left+'px';

			if (steps%30 == 0) {
				div.style.top = desu_top+top-rnd_top+'px';
			} else {
				div.style.top = desu_top+top+rnd_top+'px';
			}

		} else if (cl == 'down-left' || cl == 'up-right') {

			var rnd_top = 7 - Math.ceil(Math.random()*5);
			var rnd_left = 7 - Math.ceil(Math.random()*5);

			if (steps%30 == 0) {
				div.style.top = desu_top+top-rnd_top+'px';
				div.style.left = desu_left+left-rnd_left+'px';
			} else {
				div.style.top = desu_top+top+rnd_top+'px';
				div.style.left = desu_left+left+rnd_left+'px';
			}

		} else {

			var rnd_top = 7 - Math.ceil(Math.random()*5);
			var rnd_left = 7 - Math.ceil(Math.random()*5);

			if (steps%30 == 0) {
				div.style.top = desu_top+top+rnd_top+'px';
				div.style.left = desu_left+left-rnd_left+'px';
			} else {
				div.style.top = desu_top+top-rnd_top+'px';
				div.style.left = desu_left+left+rnd_left+'px';
			}

		}

		document.getElementById("log").parentNode.appendChild(div);

		var q = setTimeout("fade_footstep('"+rnd_id+"')",5000);

	}

}


function clear_boots() {

  dirty_boots = false;

}



function fade_footstep(id) {

	div = document.getElementById(id);
	if (div.style.opacity > 0) {
		div.style.opacity -= .1;
		var q = setTimeout("fade_footstep('"+id+"')",1000);
	} else {
		div.parentNode.removeChild(div);
	}

}


function stop() {

	var desu = document.getElementById("desu");
	desu.className += ' stand';

}

function in_array(needle, haystack) {

	if (haystack) {
		var l = haystack.length;
		for ( var x = 0 ; x <= l ; x++ )
			if ( haystack[x] == needle ) return true;
		return false;
	}

}


function handleKeydown(evt) {

	evt = (evt) ? evt : ((window.event) ? event : null);

	if (evt) {

		var k = evt.keyCode;

		if (k < 41 && k > 36) {

			var flag = false;

			for (var i = 0; i < keys.length; ++i) {

				if (keys[i] == k)
					flag = true;

			}

			if (!flag)
				keys.push(k);

		}

	}

}

function handleKeyup(evt) {

	evt = (evt) ? evt : ((window.event) ? event : null);

	if (evt) {

		for (var i = 0; i < keys.length; ++i) {

			if (keys[i] == evt.keyCode)
				keys.splice(i, 1);

		}

		if (keys.length == 0)
			stop();

	}

}


function loaded() {
	preloaded++;
	if (preloaded == preload_images) {
		show_scene();
	}
}

function show_scene() {
	document.getElementById("loader").style.display = 'none';
	document.getElementById("desu").style.display = 'block';
  document.getElementById("desc").style.display = 'block';
}

function chatter_on() {

	var rnd = Math.ceil(Math.random()*10);

	if (rnd > 7) {

		var bubble = document.getElementById("bubble");
		var bubbletext = document.getElementById("bubbletext");
		var phrases = ["Desu!", "Did someone just say 'desu'? 'Cause I think I just heard someone say 'desu'!", "Fuck off, I'm tired-desu!", "Desu, desu!", "Now what-desu?", "...", "Okay, let's go there-desu!", "...", "Who's there-desu?!", "If I hear this fucking 'desu' one more time...","I'm hungry-desu."];

		rnd = Math.ceil(Math.random()*10);

		bubbletext.innerHTML = phrases[rnd];
		bubble.style.display = 'block';

		turn_bubble_off = setTimeout("chatter_off()",3000);

	}


}

function chatter_off() {

	var bubble = document.getElementById("bubble");
	bubble.style.display = 'none';
	clearTimeout(turn_bubble_off);

}


function collision(top, left) {

	top += desu_top;
	left += desu_left;

	for (var i = 0; i < obstacles.length; i++) {

		var o = obstacles[i];

		var x1 = o[1] - desu_h;
		var y1 = o[2] - desu_w;
		var x2 = o[1] + o[3] + desu_h;
		var y2 = o[2] + o[4] + desu_w;

		if (x1 < top && y1 < left && top < x2 && left < y2) {
			//log ('collision with '+o[0]+' in '+top+','+left);
			return true;
		}

	}

	return false;

}


function log(message,mode) {

	var log = document.getElementById("log");
	if (mode == 1)
		log.innerHTML = message;
	else
		log.innerHTML += message+'<br>';

}


function close_desc() {

  document.getElementById("desc").style.display = 'none';

}




var obstacles = [];
obstacles.push(['Rod1', 406, 702, 36, 28]);
obstacles.push(['Rod2', 310, 510, 36, 28]);
obstacles.push(['Rod3', 550, 30, 36, 28]);
obstacles.push(['Rod4', 406, 799, 36, 28]);
obstacles.push(['Paint', 470, 398, 50, 35]);
// name, top, left, width, height

var step = 1;

var keys = [];
var preloaded = 0;
var preload_images = 12;
var walking_history = [];
var turn_bubble_off = 0;
var steps = 0;
var dirty_boots = false;
var dirty_foot_timeout = 0;

var desu_top = 170;
var desu_left = 75;
// center of Desu

var desu_w = 50;
var desu_h = 10;
// base of Desu


