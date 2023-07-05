window.onload = function() {
	var a = document.getElementById('alert');
	var W = window.innerWidth;
	var H = window.innerHeight;

	var start = document.getElementById('start');
	var cvs = document.getElementsByTagName('canvas')[0];
	var freq = document.getElementById('freq');
	var items = document.getElementsByClassName('items');
	var enter = document.getElementById('enter');
	var arrAmt = document.getElementById('arrAmt');
	var demo = document.getElementsByClassName('demo')[0];
	var box0 = document.getElementsByClassName('item-box')[0];
	var box1 = document.getElementsByClassName('item-box')[1];
	var frq = document.getElementsByClassName('frq')[0];
	var waves = document.getElementsByClassName('wave');

	var cCtx = cvs.getContext('2d');

	var aCtx = new(window.AudioContext ||
		window.webkitAudioContext)();
	var master = aCtx.createGain();
	var oscOut = aCtx.createGain();
	var analyser = aCtx.createAnalyser();
	var osc = aCtx.createOscillator();
	var buffer = analyser.frequencyBinCount;
	var dArray = new Uint8Array(buffer);
	analyser.fftSize = 2048;

	osc.connect(analyser);
	oscOut.connect(master);
	master.gain.setValueAtTime(0.03, aCtx.currentTime);
	master.connect(aCtx.destination);

	var arr0 = [];
	var arr1 = [];
	var playing = false;
	var started = false;
	var demoing = false;
	var color = 135;
	a.addEventListener('click', function() {
		a.style.display = 'none';
	})

	function draw() {
		cCtx.clearRect(0, 0, W, H);
		requestAnimationFrame(draw);

		analyser.getByteTimeDomainData(dArray);

		cCtx.beginPath();
		cCtx.lineWidth = .5;
		cCtx.moveTo(0, cvs.height / 2);
		cCtx.lineTo(cvs.width, cvs.height / 2);
		cCtx.strokeStyle = 'grey';
		cCtx.stroke();
		cCtx.closePath();

		var slice = W * 1.0 / buffer;
		var x = 0;

		cCtx.beginPath();
		cCtx.lineWidth = 2;

		for (i = 0; i < buffer; i++) {
			var y = (dArray[i] / 256.0) * cvs.height / 2 + cvs.height / 4;
			cCtx.strokeStyle = 'hsl(' + color + ',100%,50%)';

			if (i === 0) {
				cCtx.moveTo(x, y);
			} else {
				cCtx.lineTo(x, y);
			}
			x += slice;
		}

		cCtx.lineTo(cvs.width, cvs.height / 2);
		cCtx.stroke();
		color += 10;
	}

	demo.addEventListener('click', function() {
		reset();
		demo.style.background = 'lime';
		demo.style.color = 'black';
		demoing = true;
		if (started === false || playing === false) {
			startUp();
		}
		initArray(17);
	})

	enter.addEventListener('click', function() {
		initArray(arrAmt.value);
	});

	freq.oninput = function() {
		osc.frequency.setValueAtTime(this.value, aCtx.currentTime);
		frq.innerHTML = "Wave Frequency: " + this.value + 'Hz';
	};
	waves[0].addEventListener('click', function() {
		osc.type = 'sine';
		reset();
		waves[0].style.background = 'lime';
		waves[0].style.color = 'black';
	});
	waves[1].addEventListener('click', function() {
		osc.type = 'triangle';
		reset();
		waves[1].style.background = 'lime';
		waves[1].style.color = 'black';
	});
	waves[2].addEventListener('click', function() {
		osc.type = 'sawtooth';
		reset();
		waves[2].style.background = 'lime';
		waves[2].style.color = 'black';
	});
	waves[3].addEventListener('click', function() {
		osc.type = 'square';
		reset();
		waves[3].style.background = 'lime';
		waves[3].style.color = 'black';
	});
	waves[4].addEventListener('click', function() {
		initArray(arrAmt.value);
		reset();
		waves[4].style.background = 'lime';
		waves[4].style.color = 'black';
	});

	start.addEventListener('click', startUp);

	function startUp() {
		if (started === false) {
			osc.start();
			started = true;
		}
		if (playing) {
			playing = false;
			osc.disconnect(oscOut);
			start.style.background = 'red';
			start.innerHTML = 'Stopped';
		} else {
			playing = true;
			osc.connect(oscOut);
			osc.connect(analyser);
			start.style.background = 'lime';
			start.innerHTML = 'Started';
		}
	}

	function reset() {
		for (i = 0; i < waves.length; i++) {
			waves[i].style.background = 'none';
			waves[i].style.color = 'white'
		}
	}

	function initArray(num) {
		box0.innerHTML = '';
		box1.innerHTML = '';

		arr0 = [0];
		arr1 = [0];

		for (i = 0; i < num; i++) {
			arr0.push(0);
			arr1.push(0);

			box0.innerHTML += "<div class='item'>0</div>";
			box1.innerHTML += "<div class='item'>0</div>";
		}
		var items = document.getElementsByClassName('item');

		for (i = 0; i < items.length / 2; i++) {
			update(items[i], i, 0);
			update(items[i + items.length / 2], i, 1)
		}

		setWave();
		reset();
		waves[4].style.background = 'lime';
		waves[4].style.color = 'black';

		if (demoing) {
			demo.style.pointerEvents = 'none';
			setTimeout(function() {
				items[18].innerHTML = ".1";
				items[18].style.background = 'lime';
				arr1[1] = 0.1;
				setWave();
			}, 1000);
			setTimeout(function() {
				items[20].innerHTML = ".1";
				items[20].style.background = 'lime';
				arr1[3] = 0.1;
				setWave();
			}, 2000);
			setTimeout(function() {
				items[21].innerHTML = ".1";
				items[21].style.background = 'lime';
				arr1[4] = 0.1;
				setWave();
			}, 3000);
			setTimeout(function() {
				items[23].innerHTML = ".1";
				items[23].style.background = 'lime';
				arr1[5] = 0.1;
				setWave();
			}, 4000);
			setTimeout(function() {
				items[25].innerHTML = ".1";
				items[25].style.background = 'lime';
				arr1[7] = 0.1;
				setWave();
			}, 5000);
			setTimeout(function() {
				items[27].innerHTML = ".1";
				items[27].style.background = 'lime';
				arr1[9] = 0.1;
				setWave();
			}, 6000);
			setTimeout(function() {
				items[29].innerHTML = ".1";
				items[29].style.background = 'lime';
				arr1[11] = 0.1;
				setWave();
			}, 7000);
			setTimeout(function() {
				items[33].innerHTML = ".1";
				items[33].style.background = 'lime';
				arr1[16] = 0.1;
				setWave();
				demoing = false;
				reset();
				demo.style.background = 'none';
				demo.style.color = 'white';
				waves[4].style.background = 'lime';
				waves[4].style.color = 'black';
				demo.style.pointerEvents = '';

			}, 8000);
			setTimeout(function() {
				initArray(17);
			}, 9000);
		}
		return;
	}

	function update(elem, num, id) {

		elem.addEventListener("click",
			function() {
				reset();
				waves[4].style.background = 'lime';
				waves[4].style.color = 'black';
				if (id == 0) {
					if (arr0[num] == 0) {
						elem.innerHTML = ".1";
						elem.style.background = 'lime';
						arr0[num] = 0.1;
						setWave();
						return;
					}
					if (arr0[num] == 0.1) {
						elem.innerHTML = ".2";
						elem.style.background = 'lime';
						arr0[num] = 0.2;
						setWave();
						return;
					}
					if (arr0[num] == 0.2) {
						elem.innerHTML = ".3";
						elem.style.background = 'lime';
						arr0[num] = 0.3;
						setWave();
						return;
					}
					if (arr0[num] == 0.3) {
						elem.innerHTML = ".4";
						elem.style.background = 'lime';
						arr0[num] = 0.4;
						setWave();
						return;
					}
					if (arr0[num] == 0.4) {
						elem.innerHTML = ".5";
						elem.style.background = 'lime';
						arr0[num] = 0.5;
						setWave();
						return;
					}
					if (arr0[num] == 0.5) {
						elem.innerHTML = ".6";
						elem.style.background = 'lime';
						arr0[num] = 0.6;
						setWave();
						return;
					}
					if (arr0[num] == 0.6) {
						elem.innerHTML = ".7";
						elem.style.background = 'lime';
						arr0[num] = 0.7;
						setWave();
						return;
					}
					if (arr0[num] == 0.7) {
						elem.innerHTML = ".8";
						elem.style.background = 'lime';
						arr0[num] = 0.8;
						setWave();
						return;
					}
					if (arr0[num] == 0.8) {
						elem.innerHTML = ".9";
						elem.style.background = 'lime';
						arr0[num] = 0.9;
						setWave();
						return;
					}
					if (arr0[num] == 0.9) {
						elem.innerHTML = "1";
						elem.style.background = 'lime';
						arr0[num] = 1;
						setWave();
						return;
					}
					if (arr0[num] == 1) {
						elem.innerHTML = "0";
						elem.style.background = 'none';
						arr0[num] = 0;
						setWave();
						return;
					}
				}

				if (id == 1) {
					if (arr1[num] == 0) {
						elem.innerHTML = ".1";
						elem.style.background = 'lime';
						arr1[num] = 0.1;
						setWave();
						return;
					}
					if (arr1[num] == 0.1) {
						elem.innerHTML = ".2";
						elem.style.background = 'lime';
						arr1[num] = 0.2;
						setWave();
						return;
					}
					if (arr1[num] == 0.2) {
						elem.innerHTML = ".3";
						elem.style.background = 'lime';
						arr1[num] = 0.3;
						setWave();
						return;
					}
					if (arr1[num] == 0.3) {
						elem.innerHTML = ".4";
						elem.style.background = 'lime';
						arr1[num] = 0.4;
						setWave();
						return;
					}
					if (arr1[num] == 0.4) {
						elem.innerHTML = ".5";
						elem.style.background = 'lime';
						arr1[num] = 0.5;
						setWave();
						return;
					}
					if (arr1[num] == 0.5) {
						elem.innerHTML = ".6";
						elem.style.background = 'lime';
						arr1[num] = 0.6;
						setWave();
						return;
					}
					if (arr1[num] == 0.6) {
						elem.innerHTML = ".7";
						elem.style.background = 'lime';
						arr1[num] = 0.7;
						setWave();
						return;
					}
					if (arr1[num] == 0.7) {
						elem.innerHTML = ".8";
						elem.style.background = 'lime';
						arr1[num] = 0.8;
						setWave();
						return;
					}
					if (arr1[num] == 0.8) {
						elem.innerHTML = ".9";
						elem.style.background = 'lime';
						arr1[num] = 0.9;
						setWave();
						return;
					}
					if (arr1[num] == 0.9) {
						elem.innerHTML = "1";
						elem.style.background = 'lime';
						arr1[num] = 1;
						setWave();
						return;
					}
					if (arr1[num] == 1) {
						elem.innerHTML = "0";
						elem.style.background = 'none';
						arr1[num] = 0;
						setWave();
						return;
					}
				}
			});


	}

	function setWave() {
		var x = new Float32Array(arr0);
		var y = new Float32Array(arr1);
		var wave = aCtx.createPeriodicWave(x, y);
		osc.setPeriodicWave(wave);
	}

	initArray(17);

	draw();
}