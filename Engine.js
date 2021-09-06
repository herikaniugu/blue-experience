
	/**
	 * Hyperbox Engine 1.0
	 * Written by Heri Kaniugu
	 */

	(function(window) {
		function Engine() {
			var engine = new Object();
			engine.Width = function() {
				return window.innerWidth;
			};
			engine.Height = function() {
				return window.innerHeight;
			};
			engine.Reload = function() {
				return null == window.location.reload();
			};
			engine.Back = function() {
				return null == window.history.back();
			};
			engine.Go = function(a) {
				return null == window.history.go(a);
			};
			engine.Title = function(a) {
				return a != undefined ? document.title = a : document.title;
			};
			engine.Link = function(link, title) {
				try { return link ? window.history.pushState(null, title, link) : window.location.href; } catch(e) { return false; }
			};
			engine.Density = function(density) {
				return density ? window.devicePixelRatio = density : window.devicePixelRatio;
			};
			engine.Import = function(a) {
				for (var b in a) if (a.hasOwnProperty(b)) window[b] = a[b]; return true;
			};
			engine.Extension = function(name, source) {
				if (engine.Library == undefined) engine.Library = new Object();
				if (source) engine.Library [name] = source; return engine.Library [name];
			};
			engine.Wait = function(a, b) {
				return window.setTimeout(a, b == undefined ? 1500 : b);
			};
			engine.Repeat = function(a, b, c) {
				var d = 0, e = window.setInterval(function() { if (a) a(d); if (++d === c) window.clearInterval(e); }, b ? b : 1500); return e;
			};
			engine.Random = function(a, b) {
				return b != undefined ? Math.random() * (b - a) + a : (a != undefined ? Math.random() * a : Math.random());
			};
			engine.Callback = function(callback) {
				if (callback) callback(); return true;
			};
			engine.Value = function(value) {
				return String.fromCharCode(value);
			};
			engine.Identity = function() {
				return UNIQUE++;
			};
			String.prototype.Low = function() {
				return this ? this.toLowerCase() : this;
			};
			String.prototype.Up = function() {
				return this ? this.toUpperCase() : this;
			};
			String.prototype.Cap = function() {
				return this && this.length > 1 ? this[0].Up() + this.slice(1).toLowerCase() : this;
			};
			Array.prototype.Remove = function(item) {
				for (var a in this) if (this.hasOwnProperty(a)) if (this[a] == item) this.splice(a, 1); return this;
			};
			Object.prototype.Each = function(callback) {
				this.Loop(function(key, value) { if (callback) callback(key, value); }); return this;
			};
			Object.prototype.Size = function() {
				var size = 0; for (var key in this) if (this.hasOwnProperty(key)) size++; return size;
			};
			Object.prototype.Equals = function(a) {
				return this == a ? true : false;
			};
			Object.prototype.Contains = function(a) {
				return this.indexOf(a) >= 0 ? true : false;
			};
			Object.prototype.Empty = function() {
				for (var k in this) if (this.hasOwnProperty(k)) return false; return true;
			};
			Object.prototype.Loop = function(callback) {
				var index = 0;
				for (a in this) {
					if (this.hasOwnProperty(a)) {
						if (callback) callback((parseInt(a) ? parseInt(a) : a), this[a], index, (this.length ? this.length : Object.keys(this).length));
						index++;
					}
				}
				return this;
			};
			Array.prototype.Sort = function(k) {
				this.sort(function(a, b) {
					if (a[k] < b[k]) return -1; else if (a[k] > b[k]) return 1; return 0;
				});
			};
			engine.Merge = function(a) {
				var merge = new Object();
				merge.array = function(b) {
					return a && b.indexOf(a) >= 0 ? b.concat(a) : b;
				};
				merge.object = function(b) {
					for (c in b) if (a && b.hasOwnProperty(c)) a[c] = b[c]; return a;
				};
				return merge;
			};
			engine.Parse = {
				XML: function(a) {
					return new DOMParser().parseFromString(a, "text/xml");
				},
				HTML: function(a) {
					return new DOMParser().parseFromString(a, "text/html");
				},
				JSON: function(a) {
					try { return a && typeof a === "string" ? JSON.parse(a) : a || new Array(); } catch(e) { return new Array(); }
				},
				URL: function(a) {
					var b = a.split("&"), c = { }; b.forEach(function(k) { k = k.split("="); if (k[1]) c[k[0]] = decodeURIComponent(k[1]); });
					return engine.Parse.JSON(JSON.stringify(c));
				}
			};
			engine.Pixel = function(a, b, c, d) {
				var f = function(v) { return isNaN(v) ? v : new Number(v) + engine.Value(0x70) + engine.Value(0x78); };
				var k = new Array(); k.push(f(a)); k.push(f(b)); k.push(f(c)); k.push(f(d)); return k.join(" ").replace(/^\s*([\s\S]*?)\s*$/, function(m, v) { return v; });
			};
			engine.On = function(selector, a) {
				var on = new Object();
				on.response = function(b) {
					for (var index = 0; index < a.split(" ").length; index++) selector["on" + a.split(" ") [index]] = b;
					return selector;
				};
				return on;
			};
			engine.Do = function() {
				var p = true, q = true;
				return {
					case: function(a, b) {
						if (q && a) q = a;
						if (q && a && b) b(a);
						if (q && a) p = false;
						if (q && a) q = false;
						return this;
					},
					default: function(a) {
						if (p && a) a();
						if (p) p = false;
						if (q) q = false;
						return this;
					}
				};
			};
			engine.Async = function(f) {
				return function() {
					window.setTimeout(function(parameters) {
						f.apply(this, parameters);
					}, 0, arguments);
				};
			};
			engine.Task = function() {
				var task = new Object();
				task.time = 1500;
				task.condition = false;
				task.active = function() { return true; };
				task.interval = function(time) {
					task.time = time; return task;
				};
				task.when = function(f) {
					task.condition = true; task.active = f; return task;
				};
				task.stop = function() {
					window.clearInterval(task.id); task.id = null; return task;
				};
				task.response = function(callback) {
					task.id = window.setInterval(function() { if (task.active() && task.condition) task.stop(); if (task.active() && callback) callback(); }, task.time); return task;
				};
				return task;
			};
			engine.Resources = function(folder, extension) {
				return {
					files: function(array) {
						var data = new Array(); for (var index = 0; index < array.length; index++) 
							data.push((folder ? folder.replace(/[\/]+$/g, EMPTY) + engine.Type.BACKSLASH : EMPTY) + array[index] + (extension ? engine.Type.DOT + extension + (engine.App.DEBUG ? engine.Type.QUERY + engine.Random() : EMPTY) : EMPTY));
						return data;
					}
				};
			};
			engine.Cache = {
				get: function(a) {
					try { if (a && window.localStorage.getItem(window.btoa(a))) return window.atob(window.localStorage.getItem(window.btoa(a))); } catch(e) { } return EMPTY;
				},
				set: function(a, b) {
					try { if (a) window.localStorage.setItem(window.btoa(a), (b != undefined ? window.btoa(b) : EMPTY)); return true; } catch(e) { } return false;
				},
				clear: function(a) {
					try { if (a) window.localStorage.removeItem(window.btoa(a)); return true; } catch(e) { } return false;
				}
			};
			engine.Sound = function(audio) {
				var sound = new Object();
				sound.audio = audio;
				sound.volume = function(volume) {
					if (this.audio) this.audio.volume = volume; return sound;
				};
				sound.play = function() {
					var play = this.audio ? this.audio.play() : undefined; if (play) play.then(function() { }).catch(function(error) { }); return sound;
				};
				sound.stop = function() {
					if (this.audio) this.audio.currentTime = 0; if (this.audio) this.audio.pause(); this.audio = null; return sound;
				};
				sound.end = function(callback) {
					if (this.audio) this.audio.addEventListener("ended", function() { if (callback) callback(); }, false); return sound;
				};
				sound.loop = function(callback) {
					if (this.audio) if (typeof this.audio.loop == "boolean") this.audio.loop = true; else
						this.audio.addEventListener("ended", function() { this.currentTime = 0; this.play(); if (callback) callback(); }, false); return sound;
				};
				return sound;
			};
			engine.Media = {
				image: function(a) {
					return a ? engine.View("IMG").alternative(EMPTY).source(a.src ? a.src : a) : engine.View("IMG").alternative(EMPTY);
				},
				audio: function(a) {
					return a ? engine.View("AUDIO").source(a.src ? a.src : a) : engine.View("AUDIO");
				},
				video: function(a) {
					return a ? engine.View("VIDEO").source(a.src ? a.src : a) : engine.View("VIDEO");
				}
			};
			engine.Web = {
				audio: function(arraybuffer) {
					var audio = new Object();
					audio.context = new (AudioContext || webkitAudioContext || mozAudioContext || msAudioContext) ();
					audio.source = audio.context.createBufferSource(); audio.buffer = arraybuffer; audio.loop = false;
					audio.play = function(from) {
						if (audio.buffer && audio.buffer.byteLength > 0) audio.context.decodeAudioData(audio.buffer, function (buffer) {
							audio.source.buffer = buffer; audio.source.connect(audio.context.destination);
							audio.source.loop = audio.loop; audio.source.start(from || 0);
						});
						return audio;
					};
					audio.stop = function() {
						audio.context.close().then(function() { }); return audio;
					};
					audio.loop = function(a) {
						audio.loop = a || true; return audio;
					};
					return audio;
				},
				oscillator: function() {
					var oscillator = new Object();
					oscillator.context = new (AudioContext || webkitAudioContext || mozAudioContext || msAudioContext) ();
					oscillator.source = oscillator.context.createOscillator(); oscillator.gain = oscillator.context.createGain(); 
					oscillator.gain.connect(oscillator.context.destination);
					oscillator.scale = {
						c1: 32.70, d1: 36.71, e1: 41.21, f1: 43.65, g1: 49.00, a1: 55.00, b1: 61.74, 
						C1: 35, D1: 39, F1: 46, G1: 56, A1: 58, 
						c2: 65.41, d2: 73.42, e2: 82.41, f2: 87.31, g2: 98.00, a2: 110.00, b2: 123.74, 
						C2: 69, D2: 78, F2: 93, G2: 104, A2: 117, 
						c3: 130.81, d3: 146.83, e3: 164.81, f3: 174.61, g3: 196.00, a3: 220.00, b3: 246.94, 
						C3: 139, D3: 156, F3: 185, G3: 208, A3: 233, 
						c4: 261.63, d4: 293.65, e4: 329.63, f4: 349.23, g4: 392.00, a4: 440.00, b4: 493.88, 
						C4: 277, D4: 311, F4: 370, G4: 415, A4: 466, 
						c5: 523.25, d5: 587.33, e5: 659.26, f5: 698.46, g5: 783.99, a5: 880.00, b5: 987.77, 
						C5: 554, D5: 622, F5: 740, G5: 831, A5: 932, 
						c6: 1046.50, d6: 1174.70, e6: 1318.50, f6: 1396.90, g6: 1568.00, a6: 1760.00, b6: 1975.50, 
						C6: 1109, D6: 1245, F6: 1480, G6: 1661, A6: 1865, 
						c7: 2093.00, d7: 2349.30, e7: 2637.00, f7: 2793.80, g7: 3126.00, a7: 3520.00, b7: 3951.10, 
						C7: 2217, D7: 2481, F7: 2960, G7: 3322, A7: 3729, 
						c8: 4186.00, d8: 4699.00, e8: 5274.00, f8: 5588.00, g8: 6272.00, a8: 7040.00, b8: 7902.13, 
						C8: 4434, D8: 4978, F8: 5919, G8: 6644, A8: 7458
					};
					oscillator.type = function(a) {
						oscillator.source.type = a || "square"; return oscillator;
					};
					oscillator.frequency = function(value, time) {
						oscillator.source.frequency.setValueAtTime(value || 0, oscillator.context.currentTime + (time || 0)); return oscillator;
					};
					oscillator.volume = function(value, time) {
						oscillator.gain.gain.setValueAtTime(value || 0, oscillator.context.currentTime + (time || 0)); return oscillator;
					};
					oscillator.connect = function() {
						oscillator.source.connect(oscillator.gain); return oscillator;
					};
					oscillator.start = function(from) {
						oscillator.source.start(oscillator.context.currentTime + (from || 0)); return oscillator;
					};
					oscillator.stop = function(to) {
						oscillator.source.stop(oscillator.context.currentTime + (to || 0)); return oscillator;
					};
					oscillator.end = function(callback) {
						oscillator.source.onended = function() { oscillator.source.disconnect(oscillator.gain); if (callback) callback(); }; return oscillator;
					};
					return oscillator;
				},
				note: function(note) {
					var raw = note.split(/\>/).map(function(value) { return value ? value.trim() : value; }), type = raw[0], loop = raw[1] == "true", volume = parseFloat(raw[2]);
					var notes = raw[3].split(/\//).map(function(note) { var output = new Object(), array = note.split(/\:/).map(function(value) {
						return parseFloat(value); }); output.frequency = array[0]; output.wait = array[1]; output.delay = array[2]; return output; });
					var play = function(position) {
						var value = notes[position]; if (value) engine.Web.oscillator().type(type).volume(volume).frequency(value.frequency).connect().start(value.wait).stop(value.wait + value.delay).end(function() {
							if (position < notes.length - 1) play(position += 1); else if (loop) play(0);
						});
					}; play(0); return { type: type, volume: volume, loop: loop, notes: notes };
				}
			};
			engine.Preload = function(resources) {
				var preload = new Object();
				preload.index = 0;
				preload.request = function(callback) {
					var request = new (XMLHttpRequest || ActiveXObject) ("MSXML2.XMLHTTP.6.0");
					var total = resources.length, count = preload.index + 1;
					request.open("GET", resources[preload.index], true); request.responseType = "blob"; request.send();
					request.onload = request.onerror = function(event) {
						if (preload.index < total) {
							var name = resources[preload.index].replace(/^.*[\/]/, EMPTY).replace(/[\?].*$/, EMPTY);
							if (callback) callback(total, count, name, event); preload.index++;
							if (count < total) preload.request(callback);
						}
					};
					return preload;
				};
				preload.image = function(callback) {
					var image = new Image(); image.src = resources[preload.index];
					var total = resources.length, count = preload.index + 1;
					image.onload = image.onerror = function(event) {
						if (preload.index < total) {
							var name = resources[preload.index].replace(/^.*[\/]/, EMPTY).replace(/[\?].*$/, EMPTY);
							if (callback) callback(total, count, name, event); preload.index++;
							if (count < total) preload.image(callback);
						}
					};
					return preload;
				};
				preload.audio = function(callback) {
					var audio = new Audio(); audio.src = resources[preload.index]; audio.preload = true;
					var total = resources.length, count = preload.index + 1;
					if (preload.index < total) {
						var name = resources[preload.index].replace(/^.*[\/]/, EMPTY).replace(/[\?].*$/, EMPTY);
						if (callback) callback(total, count, name, audio); preload.index++;
						if (count < total) preload.audio(callback);
					}
					return preload;
				};
				preload.script = function(callback) {
					var script = document.createElement("script"); script.src = resources[preload.index];
					var total = resources.length, count = preload.index + 1;
					script.onload = script.onerror = function(event) {
						if (preload.index < total) {
							var name = resources[preload.index].replace(/^.*[\/]/, EMPTY).replace(/[\?].*$/, EMPTY);
							if (callback) callback(total, count, name, event); preload.index++;
							if (count < total) preload.script(callback);
						}
					};
					document.documentElement.appendChild(script); return preload;
				};
				preload.source = function(callback) {
					var request = new (XMLHttpRequest || ActiveXObject) ("MSXML2.XMLHTTP.6.0");
					var total = resources.length, count = preload.index + 1;
					request.open("GET", resources[preload.index], true); request.responseType = "blob"; request.send();
					request.onload = request.onerror = function(event) {
						var source = document.createElement("script"), url = window.URL.createObjectURL(event.target.response);
						source.onload = source.onerror = function() {
							if (preload.index < total) {
								var name = resources[preload.index].replace(/^.*[\/]/, EMPTY).replace(/[\?].*$/, EMPTY);
								if (callback) callback(total, count, name, event); preload.index++;
								if (count < total) preload.source(callback);
							}
						};
						source.src = url; document.head.appendChild(source);
					};
					return preload;
				};
				return preload;
			};
			engine.Device = {
				media: function(constraints, callback, error) {
					navigator.mediaDevices.getUserMedia(constraints).then(callback).catch(error ? error : function(error) { }); return this;
				},
				leave: function() {
					document.body.onkeydown = function(event) {
						if (event.key == "Backspace") {
							event.preventDefault(); window.close();
						}
					};
				},
				touch: function(target) {
					var input = new Object();
					input.move = function(callback) {
						engine.On(target || window, "mousemove touchmove").response(function(event) {
							event.preventDefault();
							var touches = event.changedTouches, rectangle = event.target.getBoundingClientRect();
							for (var position = 0; position < (touches ? touches.length : 1); position++) {
								var id = (touches ? touches[position].identifier : 0), value = input.each[id];
								var x = (touches ? touches[position].pageX - rectangle.left : event.offsetX);
								var y = (touches ? touches[position].pageY - rectangle.top : event.offsetY);
								if (value) {
									var dx = value.dx - x, dy = value.dy - y, offset = Math.abs(dx) + Math.abs(dy) > 10; value.move = true; value.click = false;
									value.x = x; value.y = y; value.left = false; value.right = false; value.up = false; value.down = false;
									if (Math.abs(dx) > Math.abs(dy)) dx > 0 ? value.left = true : value.right = true;
										else if (offset) dy > 0 ? value.up = true : value.down = true; if (offset) value.dx = value.x; if (offset) value.dy = value.y; input.each[id] = value;
								}
							}
							if (callback) callback(event, input);
						}, false);
						return input;
					};
					input.down = function(callback) {
						engine.On(target || window, "mousedown touchstart").response(function(event) {
							event.preventDefault();
							var touches = event.changedTouches, rectangle = event.target.getBoundingClientRect();
							for (var position = 0; position < (touches ? touches.length : 1); position++) {
								var id = (touches ? touches[position].identifier : 0);
								var x = (touches && touches[position] ? touches[position].pageX - rectangle.left : event.offsetX), y = (touches ? touches[position].pageY - rectangle.top : event.offsetY);
								input.each[id] = { id: id, active: true, click: true, move: false, left: false, right: false, up: false, down: false, x: x, y: y, dx: x, dy: y };
							}
							if (callback) callback(event, input);
						}, false);
						return input;
					};
					input.up = function(callback) {
						engine.On(target || window, "mouseup mouseleave touchend touchcancel").response(function(event) {
							event.preventDefault();
							var touches = event.changedTouches;
							for (var position = 0; position < (touches ? touches.length : 1); position++) input.clear(touches ? touches[position].identifier : 0);
							if (callback) callback(event, input);
						}, false);
						return input;
					};
					input.clear = function(id) { input.each[id] = { id: id, active: false, click: false, move: false }; };
					input.each = new Array();
					return input;
				},
				key: function(target) {
					var input = new Object();
					input.down = function() {
						(target || window).addEventListener("keydown", function (event) {
							event.preventDefault(); var id = event.which || event.keyCode; input.each[id] = { id: id, active: true };
						});
						return input;
					};
					input.up = function() {
						(target || window).addEventListener("keyup", function (event) {
							event.preventDefault(); var id = event.which || event.keyCode; input.each[id] = { id: id, active: false };
						});
						return input;
					};
					input.clear = function(id) { input.each[id] = { id: id, active: false }; };
					input.each = new Array();
					return input;
				},
				pad: function() {
					var input = new Object();
					input.connection = function(callback) {
						var update;
						window.addEventListener("gamepadconnected", function(event) {
							event.preventDefault(); if (callback) callback(event);
							var id = event.gamepad.index, name = event.gamepad.id;
							input.each[id] = { id: id, name: name, active: true, axe: new Array(), button: new Array() };
							update = window.setInterval(function() {
								var gamepad = navigator.getGamepads() [id ? id : 0];
								if (gamepad) {
									var axes = gamepad.axes, buttons = gamepad.buttons, axe = Math.round(axes[9] * 10) / 10;
									([axes[0] == 1, axes[1] == 1, axes[0] == -1, axes[1] == -1, axes[5] == 1, axes[2] == 1, axes[5] == -1, axes[2] == -1, 
										axe == -0.4, axe == 0.1, axe == 0.7, axe == -1]).forEach(function(value, index) {
										input.each[id].axe[index] = { id: index, active: value };
									});
									buttons.forEach(function(value, index) {
										input.each[id].button[index] = { id: index, active: value.pressed };
									});
								}
							}, input.time || 100);
						});
						window.addEventListener("gamepaddisconnected", function(event) {
							event.preventDefault(); window.clearInterval(update); update = undefined;
							var id = event.gamepad.index, name = event.gamepad.id;
							input.each[id] = { id: id, name: name, active: false, axe: new Array(), button: new Array() };
						});
						return input;
					};
					input.clear = function(id) {
						input.each.forEach(function(pad) {
							if (pad.id == id) {
								pad.axe.forEach(function(axe) { axe.active = false; });
								pad.button.forEach(function(button) { button.active = false; });
							}
						});
					};
					input.sensitivity = function(value) { input.time = value; return input; };
					input.each = new Array();
					return input;
				}
			};
			engine.Script = function() {
				var script = new Object();
				script.get = function(params, callback) {
					var worker = new Worker(document.head.getAttribute("bridge:source")); worker.addEventListener("message", function(event) { if (callback) callback(event.data); }, false);
					if (params) worker.postMessage(params); return script;
				};
				script.preload = function(resources) {
					var preload = new Object();
					preload.index = 0;
					preload.response = function(callback) {
						var request = new (XMLHttpRequest || ActiveXObject) ("MSXML2.XMLHTTP.6.0");
						var total = resources.length, count = preload.index + 1;
						request.open("GET", resources[preload.index], true); request.send();
						request.onload = request.onerror = function(event) {
							script.source(this.response, function() {
								if (preload.index < total) {
									var name = resources[preload.index].replace(/^.*[\/]/, EMPTY).replace(/[\?].*$/, EMPTY);
									if (callback) callback(total, count, name, event); preload.index++;
									if (count < total) preload.response(callback);
								}
							});
						};
						return preload;
					};
					return preload;
				};
				script.data = function(data, callback) {
					if (data) script.get({ data: data }, function(data) { engine.Execute(data.source).response(callback); }); return script;
				};
				script.source = function(source, callback) {
					if (source) script.get({ source: source }, function(data) { engine.Execute(data.source).response(callback); }); return script;
				};
				script.compile = function(source, callback) {
					if (source) script.get({ source: source }, function(data) { if (callback) callback(data.data, data.source); }); return script;
				};
				script.execute = function(source) {
					if (source) script.get({ source: source }, function(data) { new Function(data.source) (); }); return script;
				};
				script.bridge = function(callback) {
					script.get({ bridge: true }, callback); return script;
				};
				script.create = function() {
					var source = document.querySelectorAll("script[type=\"text\/bridge\"]"); script.execute(document.body.getAttribute("bridge:execute"));
					for (var index = 0; index < source.length; index++) script.source(source[index].innerText); return script;
				};
				return script;
			};
			engine.View = function(name) {
				var view = new Object(), tag = (typeof name == "string" ? document.createElement(name) : (name.get ? name.get() : name));
				view.id = function(a) { if (a != undefined) tag.id = a; return a != undefined ? view : tag.id; };
				view.tag = function(a) { if (a != undefined) view.label = a; return a != undefined ? view : view.label; };
				view.text = function(a) { if (a != undefined) tag.innerText = a; return a != undefined ? view : tag.innerText; };
				view.content = function(a) { if (a != undefined) tag.textContent = a; return a != undefined ? view : tag.textContent; };
				view.attribute = function(a, b) { if (b != undefined) tag.setAttribute(a, b); return b != undefined ? view : tag.getAttribute(a); };
				view.html = function(a) { if (a != undefined) tag.innerHTML = a; return a != undefined ? view : tag.innerHTML; };
				view.value = function(a) { if (a != undefined) tag.value = a; return a != undefined ? view : tag.value; };
				view.source = function(a) { if (a != undefined) tag.src = a.src ? a.src : a; return a != undefined ? view : tag.src; };
				view.object = function(a) { if (a != undefined) tag.srcObject = a.srcObject ? a.srcObject : a; return a != undefined ? view : tag.srcObject; };
				view.style = function(a) { tag.style.cssText += a; return a != undefined ? view : tag.style.cssText; };
				view.back = function(a) { tag.style.background = a; return a != undefined ? view : tag.style.background; };
				view.color = function(a) { tag.style.color = a; return a != undefined ? view : tag.style.color; };
				view.width = function(a) { tag.style.width = engine.Pixel(a); return a != undefined ? view : tag.style.width; };
				view.height = function(a) { tag.style.height = engine.Pixel(a); return a != undefined ? view : tag.style.height; };
				view.margin = function(a, b, c, d) { tag.style.margin = engine.Pixel(a, b, c, d); return a != undefined ? view : tag.style.margin; };
				view.padding = function(a, b, c, d) { tag.style.padding = engine.Pixel(a, b, c, d); return a != undefined ? view : tag.style.padding; };
				view.weight = function(a) { tag.style.flex = a; return a != undefined ? view : tag.style.flex; };
				view.index = function(a) { tag.style.zIndex = a; return a != undefined ? view : tag.style.zIndex; };
				view.top = function(a) { tag.style.top = engine.Pixel(a); return a != undefined ? view : tag.style.top; };
				view.bottom = function(a) { tag.style.bottom = engine.Pixel(a); return a != undefined ? view : tag.style.bottom; };
				view.right = function(a) { tag.style.right = engine.Pixel(a); return a != undefined ? view : tag.style.right; };
				view.left = function(a) { tag.style.left = engine.Pixel(a); return a != undefined ? view : tag.style.left; };
				view.cursor = function(a) { tag.style.cursor = a; return a != undefined ? view : tag.style.cursor; };
				view.family = function(a) { tag.style.fontFamily = a; return a != undefined ? view : tag.style.fontFamily; };
				view.size = function(a) { tag.style.fontSize = engine.Pixel(a); return a != undefined ? view : tag.style.fontSize; };
				view.line = function(a) { tag.style.lineHeight = engine.Pixel(a); return a != undefined ? view : tag.style.lineHeight; };
				view.tab = function(a) { tag.style.tabSize = a; return a != undefined ? view : tag.style.tabSize; };
				view.decoration = function(a) { tag.style.textDecoration = a; return a != undefined ? view : tag.style.textDecoration; };
				view.indent = function(a) { tag.style.textIndent = a; return a != undefined ? view : tag.style.textIndent; };
				view.display = function(a) { tag.style.display = a; return a != undefined ? view : tag.style.display; };
				view.float = function(a) { tag.style.cssFloat = a; return a != undefined ? view : tag.style.cssFloat; };
				view.opacity = function(a) { tag.style.opacity = a; return a != undefined ? view : tag.style.opacity; };
				view.overflow = function(a) { tag.style.overflow = a; return a != undefined ? view : tag.style.overflow; };
				view.overflowLeft = function(a) { tag.style.overflowX = a; return a != undefined ? view : tag.style.overflowX; };
				view.overflowTop = function(a) { tag.style.overflowY = a; return a != undefined ? view : tag.style.overflowY; };
				view.valign = function(a) { tag.style.verticalAlign = a; return a != undefined ? view : tag.style.verticalAlign; };
				view.justify = function(a) { tag.style.justifyContent = a; return a != undefined ? view : tag.style.justifyContent; };
				view.alignItems = function(a) { tag.style.alignItems = a; return a != undefined ? view : tag.style.alignItems; };
				view.alignContent = function(a) { tag.style.alignContent = a; return a != undefined ? view : tag.style.alignContent; };
				view.alignSelf = function(a) { tag.style.alignSelf = a; return a != undefined ? view : tag.style.alignSelf; };
				view.flow = function(a) { tag.style.flexFlow = a; return a != undefined ? view : tag.style.flexFlow; };
				view.direction = function(a) { tag.style.flexDirection = a; return a != undefined ? view : tag.style.flexDirection; };
				view.grow = function(a) { tag.style.flexGrow = a; return a != undefined ? view : tag.style.flexGrow; };
				view.shrink = function(a) { tag.style.flexShrink = a; return a != undefined ? view : tag.style.flexShrink; };
				view.fit = function(a) { tag.style.objectFit = a; return a != undefined ? view : tag.style.objectFit; };
				view.outline = function(a) { tag.style.outline = a; return a != undefined ? view : tag.style.outline; };
				view.position = function(a) { tag.style.position = a; return a != undefined ? view : tag.style.position; };
				view.image = function(a) { tag.style.backgroundImage = a; return a != undefined ? view : tag.style.backgroundImage; };
				view.clip = function(a) { tag.style.backgroundClip = a; return a != undefined ? view : tag.style.backgroundClip; };
				view.border = function(a) { tag.style.border = a; return a != undefined ? view : tag.style.border; };
				view.radius = function(a) { tag.style.borderRadius = engine.Pixel(a); return a != undefined ? view : tag.style.borderRadius; };
				view.borderTop = function(a) { tag.style.borderTop = engine.Pixel(a); return a != undefined ? view : tag.style.borderTop; };
				view.borderLeft = function(a) { tag.style.borderLeft = engine.Pixel(a); return a != undefined ? view : tag.style.borderLeft; };
				view.borderRight = function(a) { tag.style.borderRight = engine.Pixel(a); return a != undefined ? view : tag.style.borderRight; };
				view.borderBottom = function(a) { tag.style.borderBottom = engine.Pixel(a); return a != undefined ? view : tag.style.borderBottom; };
				view.visibility = function(a) { tag.style.visibility = a; return a != undefined ? view : tag.style.visibility; };
				view.resize = function(a) { tag.style.resize = a; return a != undefined ? view : tag.style.resize; };
				view.maxWidth = function(a) { tag.style.maxWidth = engine.Pixel(a); return a != undefined ? view : tag.style.maxWidth; };
				view.maxHeight = function(a) { tag.style.maxHeight = engine.Pixel(a); return a != undefined ? view : tag.style.maxHeight; };
				view.minWidth = function(a) { tag.style.minWidth = engine.Pixel(a); return a != undefined ? view : tag.style.minWidth; };
				view.minHeight = function(a) { tag.style.minHeight = engine.Pixel(a); return a != undefined ? view : tag.style.minHeight; };
				view.animation = function(a) { tag.style.animation = a; return a != undefined ? view : tag.style.animation; };
				view.delay = function(a) { tag.style.animationDelay = a; return a != undefined ? view : tag.style.animationDelay; };
				view.transform = function(a) { tag.style.transform = a; return a != undefined ? view : tag.style.transform; };
				view.space = function(a) { tag.style.whiteSpace = a; return a != undefined ? view : tag.style.whiteSpace; };
				view.select = function(a) { tag.style.userSelect = a; return a != undefined ? view : tag.style.userSelect; };
				view.shadow = function(a) { tag.style.textShadow = engine.Pixel(a); return a != undefined ? view : tag.style.textShadow; };
				view.elevation = function(a) { tag.style.boxShadow = engine.Pixel(a); return a != undefined ? view : tag.style.boxShadow; };
				view.wrap = function(a) { tag.style.wordWrap = a; tag.style.wordBreak = a; return a != undefined ? view : tag.style.wordWrap || tag.style.wordBreak; };
				view.font = function(a, b) { tag.style.font = a ? a : tag.style.font; if (b != undefined) tag.style.fontWeight = b; return a != undefined || b != undefined ? view : tag.style.font; };
				view.class = function(a) { tag.setAttribute("class", a); return a != undefined ? view : tag.getAttribute("class"); };
				view.type = function(a) { tag.setAttribute("type", a); return a != undefined ? view : tag.getAttribute("type"); };
				view.method = function(a) { tag.setAttribute("method", a); return a != undefined ? view : tag.getAttribute("method"); };
				view.action = function(a) { tag.setAttribute("action", a); return a != undefined ? view : tag.getAttribute("action"); };
				view.name = function(a) { tag.setAttribute("name", a); return a != undefined ? view : tag.getAttribute("name"); };
				view.url = function(a) { tag.setAttribute("href", a); return a != undefined ? view : tag.getAttribute("href"); };
				view.hint = function(a) { tag.setAttribute("placeholder", a); return a != undefined ? view : tag.getAttribute("placeholder"); };
				view.rows = function(a) { tag.setAttribute("rows", a); return a != undefined ? view : tag.getAttribute("rows"); };
				view.cols = function(a) { tag.setAttribute("cols", a); return a != undefined ? view : tag.getAttribute("cols"); };
				view.min = function(a) { tag.setAttribute("min", a); return a != undefined ? view : tag.getAttribute("min"); };
				view.max = function(a) { tag.setAttribute("max", a); return a != undefined ? view : tag.getAttribute("max"); };
				view.maxlength = function(a) { tag.setAttribute("maxlength", a); return a != undefined ? view : tag.getAttribute("maxlength"); };
				view.spell = function(a) { tag.setAttribute("spellcheck", a); return view; };
				view.complete = function(a) { tag.setAttribute("autocomplete", a); return view; };
				view.correct = function(a) { tag.setAttribute("autocorrect", a); return view; };
				view.full = function(a) { tag.setAttribute("allowfullscreen", a); return view; };
				view.editable = function(a) { tag.setAttribute("contenteditable", a); return view; };
				view.capitalize = function(a) { tag.setAttribute("autocapitalize", a); return view; };
				view.alternative = function(a) { tag.setAttribute("alt", a ? a : EMPTY); return view; };
				view.selected = function() { tag.setAttribute("selected", "selected"); return view; };
				view.changed = function(a) { tag.onchange = a; return view; };
				view.clicked = function(a) { tag.onclick = a; return view; };
				view.error = function(a) { tag.onerror = a; return view; };
				view.scroll = function(a) { tag.onscroll = a; return view; };
				view.keydown = function(a) { tag.onkeydown = a; return view; };
				view.keyup = function(a) { tag.onkeyup = a; return view; };
				view.focus = function(a) { tag.onfocus = a; return view; };
				view.blur = function(a) { tag.onblur = a; return view; };
				view.paste = function(a) { tag.onpaste = a; return view; };
				view.cut = function(a) { tag.oncut = a; return view; };
				view.autoplay = function(a) { tag.autoplay = a; return view; };
				view.align = function(a) { engine.Align.gravity(tag, a); return view; };
				view.head = function() { document.head.appendChild(tag); return view; };
				view.body = function() { document.body.appendChild(tag); return view; };
				view.hide = function() { tag.style.display = engine.Type.NONE; return view; };
				view.show = function() { tag.style.display = engine.Type.BLOCK; return view; };
				view.kill = function() { if (tag.parentNode) tag.parentNode.removeChild(tag); return view; };
				view.clear = function() { if (tag.value) tag.value = EMPTY; tag.innerHTML = EMPTY; return view; };
				view.into = function(a) { if (a) (a.get ? a.get().appendChild(tag) : a.appendChild(tag)); return view; };
				view.add = function(a) { if (a) tag.appendChild(a.get ? a.get() : a); else document.body.appendChild(tag); return view; };
				view.put = function(a, b) {
					if (b && tag.getAttribute(a)) tag.setAttribute(a, tag.getAttribute(a) + b); else if (tag.value != undefined) tag.value += a; else tag.innerHTML += a;
					return view;
				};
				view.replace = function(a, b, c) {
					if (c && tag.getAttribute(a)) tag.setAttribute(a, tag.getAttribute(a).replace(new RegExp(b, "g"), c));
						else if (tag.value != undefined) tag.value = tag.value.replace(new RegExp(a, "g"), b); else tag.innerHTML = tag.innerHTML.replace(new RegExp(a, "g"), b);
					return view;
				};
				view.toggle = function(a, b, c) {
					if (c && tag.getAttribute(a)) tag.setAttribute(a, (tag.getAttribute(a).indexOf(b) >= 0 ? tag.getAttribute(a).replace(new RegExp(b, "g"), c) : tag.getAttribute(a).replace(new RegExp(c, "g"), b)));
						else if (tag.value != undefined) tag.value = (tag.value.indexOf(a) >= 0 ? tag.value.replace(new RegExp(a, "g"), b) : tag.value.replace(new RegExp(b, "g"), a));
							else tag.innerHTML = ((tag.innerHTML || EMPTY).indexOf(a) >= 0 ? tag.innerHTML.replace(new RegExp(a, "g"), b) : (tag.innerHTML || EMPTY).replace(new RegExp(b, "g"), a));
					return view;
				};
				view.hover = function(callback) {
					var style = tag.style.cssText; engine.On(tag, "mouseover touchstart").response(function() { if (callback) callback(view, tag); });
					engine.On(tag, "mouseout touchend").response(function() { engine.Wait(function() { tag.style.cssText += style; }, 60); }); return view;
				};
				view.children = function(index) { return index == undefined ? tag.children : tag.children[index]; };
				view.parent = function() { return tag.parentElement; };
				view.child = function() { return tag.firstChild; };
				view.get = function() { return tag; };
				return view;
			};
			engine.Search = function(a) {
				return engine.View(engine.Selector(a));
			};
			engine.Selector = function(a) {
				return a && document.querySelector(a) ? document.querySelector(a) : false;
			};
			engine.All = function(a) {
				return a && document.querySelectorAll(a).length > 0 ? document.querySelectorAll(a) : false;
			};
			engine.Kill = function(a) {
				var selector = engine.Selector(a); if (selector) selector.parentNode.removeChild(selector); return selector;
			};
			engine.Clear = function(a) {
				var selector = engine.Selector(a); if (selector.value) selector.value = EMPTY; (a ? selector : document.body).innerHTML = EMPTY; return selector;
			};
			engine.Newline = function(a) {
				return a ? engine.View("br").into(a) : engine.View("br").add();
			};
			engine.Frame = function() {
				return engine.View("iframe").position("relative").full("true");
			};
			engine.Section = function(tag) {
				return engine.View("section").position("relative").display("flex").flow("column");
			};
			engine.Layout = function(tag) {
				return engine.View(tag || "div").position("relative").display("flex").flow("column");
			};
			engine.Relative = function(tag) {
				return engine.View(tag || "div").position("absolute").display("flex").flow("column");
			};
			engine.Main = function(tag) {
				return engine.View(tag || "main").position("relative").display("flex").flow("column");
			};
			engine.Inline = function(tag) {
				return engine.View(tag || "div").position("relative").display("flex").flow("row");
			};
			engine.Scroll = function(tag) {
				return engine.View(tag || "div").display("flex").overflowTop("scroll").overflowLeft("hidden").flow("column");
			};
			engine.Vertical = function(tag) {
				return engine.View(tag || "div").display("block").overflowTop("scroll");
			};
			engine.Horizontal = function(tag) {
				return engine.View(tag || "div").display("inline-block").overflowLeft("scroll");
			};
			engine.Table = function(tag) {
				return engine.View(tag || "div").display("table");
			};
			engine.Row = function(tag) {
				return engine.View(tag || "div").display("table-row");
			};
			engine.Cell = function(tag) {
				return engine.View(tag || "div").display("table-cell");
			};
			engine.Input = function(tag) {
				return engine.View(tag || "input").spell("false").outline("none");
			};
			engine.Edit = function(tag) {
				return engine.View(tag || "textarea").spell("false").outline("none").resize("none").tab(4);
			};
			engine.Button = function(tag) {
				return engine.View(tag || "button").type("button").cursor("pointer");
			};
			engine.Block = function(tag) {
				return engine.View(tag || "div");
			};
			engine.Range = function(min, max, step) {
				var A = engine.View("input").type("range"), V = A.get(); V.min = min; V.max = max; V.step = step; return A;
			};
			engine.Option = function(a) {
				var A = engine.View("select").border("none").outline("none");
				for (var index = 0; index < a.length; index++) { var V = engine.View("option").value(a[index].name || a[index].text).text(a[index].text || a[index].name).into(A); if (a[index].selected) V.selected(); }
				return A;
			};
			engine.Font = function(name, file, callback, error) {
				(new FontFace(name, "url(\""  + file + "\")")).load().then(function(face) {
					if (callback) callback(face); document.fonts.add(face);
				}).catch(function(e) {
					if (callback) callback(false); if (error) error(e); Style("@font-face").add("font-family", name).add("src", "url(\"" + file + "\")");
				}); return this;
			};
			engine.Style = function(query) {
				var style = new Object();
				style.text = function(a) {
					(query || document.querySelector("STYLE") || document.head.appendChild(document.createElement("STYLE"))).textContent += a; return style;
				};
				style.data = function(selector) {
					if (document.styleSheets) {
						if (document.styleSheets.length < 1) engine.View("STYLE").head();
						for (var index = 0; index < document.styleSheets.length; index++) {
							var sheet = document.styleSheets[index], rules = sheet.cssRules ? sheet.cssRules : sheet.rules;
							for (var index = 0; index < rules.length; index++)
								if (rules[index].selectorText == selector) return { active: true, index: index, size: rules.length, sheet: sheet, rule: rules[index] };
							return { active: false, size: rules.length, sheet: sheet, rules: rules };
						}
					}
				};
				style.add = function(k, v) {
					query.split(/(?:\s*\,\s*)/).forEach(function(selector) {
						var data = style.data(selector); if (data && data.active == false) { try { data.sheet.addRule(selector, EMPTY, data.size); data = style.data(selector); } catch(e) { } }
						if (data && data.rule && data.active == true) data.rule.style.setProperty(k, v); }); return this;
				};
				style.get = function(k) {
					var array = new Array(); query.split(/(?:\s*\,\s*)/).forEach(function(selector) {
						var a = ((style.data(selector) || {}).rule || {}).style; if (a && k) array.push({ key: k, value: a.getPropertyValue(k) }); else if (a) array.push(a); }); return array;
				};
				style.remove = function(k) {
					query.split(/(?:\s*\,\s*)/).forEach(function(selector) { var a = ((style.data(selector) || {}).rule || {}).style; if (a != undefined) a.removeProperty(k); }); return this;
				};
				style.delete = function() {
					query.split(/(?:\s*\,\s*)/).forEach(function(selector) { var data = style.data(selector) || {}; if (data.matches) data.sheet.deleteRule(data.index); }); return this;
				};
				return style;
			};
			engine.Draw = function() {
				var draw = new Object();
				draw.canvas = document.createElement("canvas");
				draw.create = function(width, height) {
					draw.width = width;
					draw.height = height;
					draw.canvas.width = width;
					draw.canvas.height = height;
					draw.canvas.height = height;
					draw.viewport = { x: 0, y: 0, width: width, height: height, density: 1 };
					draw.context = draw.canvas.getContext("2d");
					draw.each = new Array(); draw.value = new Object(); draw.item = new Object(); draw.input = new Object(); draw.button = new Object();
					draw.resource = new Object({ image: new Object(), audio: new Object(), video: new Object() }); return draw;
				};
				draw.into = function(tag) {
					if (tag && draw.canvas) (tag.get ? tag.get().appendChild(draw.canvas) : tag.appendChild(draw.canvas)); return draw;
				};
				draw.add = function() {
					if (draw.canvas) document.body.appendChild(draw.canvas); return draw;
				};
				draw.full = function() {
					document.body.scrollTop = 0; document.body.style.overflow = "hidden"; return draw;
				};
				draw.open = function(source) {
					var now = 0, previous = 0, vendors = ["ms", "moz", "webkit", "o"], script = (source ? new source() : new Object()); draw.frames = 0; draw.now = 0; draw.time = 0;
					var loop = function() {
						previous = now; now = performance.now(); draw.frames = 1000 / (now - previous); draw.delta = 1 / draw.frames; draw.interpolation = 60 / draw.frames; draw.now += (now - previous) / 1000; draw.time += (now - previous) / 1000 / draw.interpolation;
						previous = now; draw.id = window.requestAnimationFrame(loop, draw.canvas);
						if (script.input) script.input(); if (script.update) script.update(); if (script.render) script.render(); if (script.end) script.end(); draw.frame += 1;
					};
					for (var index = 0; index < vendors.length && window.requestAnimationFrame == undefined; ++index) window.requestAnimationFrame = window[vendors[index] + "RequestAnimationFrame"];
					for (var index = 0; index < vendors.length && window.cancelAnimationFrame == undefined; ++index) window.cancelAnimationFrame = window[vendors[index] + "RequestAnimationFrame"];
					if (draw.id) window.cancelAnimationFrame(draw.id); draw.id = undefined; draw.reset(); if (script.create) script.create(); draw.id = window.requestAnimationFrame(loop);
				};
				draw.reset = function() {
					draw.width = draw.canvas.width; draw.height = draw.canvas.height; draw.viewport.x = 0; draw.viewport.y = 0; draw.each = new Array(); draw.frame = 0;
				};
				draw.collision = function(item, a) {
					var left = (item.x + item.width / 2) - (a.x + a.width / 2), top = (item.y + item.height / 2) - (a.y + a.height / 2);
					var right = item.width / 2 + a.width / 2, bottom = item.height / 2 + a.height / 2; var direction = null;
					if (Math.abs(left) < right && Math.abs(top) < bottom) {
						var dx = right - Math.abs(left), dy = bottom - Math.abs(top);
						if (dx < dy) {
							if (left > 0) { direction = "left"; item.x += dx; } else { direction = "right"; item.x -= dx; }
						} else {
							if (top > 0) { direction = "top"; item.y += dy; } else { direction = "bottom"; item.y -= dy; }
						}
					}
					return direction;
				};
				draw.intersection = function(a, b) {
					return a && a.radius >= 0 || b && b.radius >= 0 ? Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y)) < (a.radius || 0) + (b.radius || 0) : 
						!(a.x + (a.width || 0) < b.x || a.x > b.x + (b.width || 0) || a.y + (a.height || 0) < b.y || a.y > b.y + (b.height || 0));
				};
				draw.click = function(touch, item) {
					if (draw.intersection(item, { x: (draw.viewport.x + touch.x / draw.viewport.density), y: (draw.viewport.y + touch.y / draw.viewport.density) })) return true; return false;
				};
				draw.vector = function(x, y) {
					var vector = { x: x, y: y };
					vector.set = function(x, y) { vector.x = x; vector.y = y; return vector; };
					vector.add = function(v) { vector.x += v.x; vector.y += v.y; return vector; };
					vector.minus = function(v) { vector.x = vector.x - v.x; vector.y = vector.y - v.y; return vector; };
					vector.multiply = function(x) { vector.x *= x; vector.y *= x; return vector; };
					vector.divide = function(x) { vector.x /= x; vector.y /= x; return vector; };
					vector.direction = function(direction) {
						if (direction == undefined) {
							return Math.atan2(vector.y, vector.x);
						} else {
							var magnitude = vector.magnitude();
							vector.x = Math.cos(angle) * magnitude;
							vector.y = Math.sin(angle) * magnitude;
							return vector;
						}
					};
					vector.magnitude = function(magnitude) {
						if (magnitude == undefined) {
							return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
						} else {
							var direction = vector.direction();
							vector.x = Math.cos(direction) * magnitude;
							vector.y = Math.sin(direction) * magnitude;
							return vector;
						}
					};
					vector.normalize = function() {
						var magnitude = vector.magnitude(); if (magnitude > 0) vector.divide(magnitude); return vector;
					};
					return vector;
				};
				draw.radians = function(degrees) {
					return degrees * (Math.PI / 180);
				};
				draw.random = function(max) {
					return Math.floor(Math.random() * max);
				};
				draw.direction = function(angle) {
					return draw.vector(Math.cos(angle), Math.sin(angle));
				};
				draw.map = function(value, start1, stop1, start2, stop2) {
					return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
				};
				draw.clamp = function(value, min, max) {
					return value < min ? min : value > max ? max : value;
				};
				draw.neighbours = function(points, max) {
					points.sort(function(a, b) { return draw.distance(a) - draw.distance(b); }); return points.slice(0, max);
				};
				draw.distance = function(point, destination) {
					if (destination) return Math.sqrt(Math.pow(point.x - destination.x, 2) + Math.pow(point.y - destination.y, 2));
						else return (point.x * point.x) + (point.y * point.y);
				};
				draw.scale = function(width, height) {
					draw.viewport.width = width; draw.viewport.height = height;
					draw.viewport.density = Math[width > height ? "max" : "min"] (draw.canvas.width / draw.viewport.width, draw.canvas.height / draw.viewport.height);
					if (draw.width < draw.canvas.width / draw.viewport.density) draw.width = draw.canvas.width / draw.viewport.density;
					if (draw.height < draw.canvas.height / draw.viewport.density) draw.height = draw.canvas.height / draw.viewport.density; return draw;
				};
				draw.camera = function(target, x, y) {
					draw.viewport.x = -draw.clamp(-target.x + (x == undefined ? draw.canvas.width / 2 : x), draw.canvas.width / draw.viewport.density - draw.width, 0);
					draw.viewport.y = -draw.clamp(-target.y + (y == undefined ? draw.canvas.height / 2 : y), draw.canvas.height / draw.viewport.density - draw.height, 0);
					draw.context.setTransform(draw.viewport.density, 0, 0, draw.viewport.density, 0, 0); draw.context.translate(-draw.viewport.x, -draw.viewport.y);
				};
				draw.center = function(item) {
					item.x = draw.viewport.x + (draw.canvas.width / draw.viewport.density) / 2 - item.width / 2;
					item.y = draw.viewport.y + (draw.canvas.height / draw.viewport.density) / 2 - item.height / 2; return draw;
				};
				draw.top = function(item, top) {
					item.y = draw.viewport.y + (top || 0); return draw;
				};
				draw.left = function(item, left) {
					item.x = draw.viewport.x + (left || 0); return draw;
				};
				draw.right = function(item, right) {
					item.x = draw.viewport.x + draw.canvas.width / draw.viewport.density - (right || 0); return draw;
				};
				draw.bottom = function(item, bottom) {
					item.y = draw.viewport.y + draw.canvas.height / draw.viewport.density - (bottom || 0); return draw;
				};
				draw.wait = function(a) {
					if (draw.frame == 1 || (draw.frame / a) % 1 == 0) return true; return false;
				};
				draw.clear = function() {
					draw.context.clearRect(0, 0, draw.width, draw.height); return draw;
				};
				draw.view = function(x, y) {
					draw.context.setTransform(draw.viewport.density, 0, 0, draw.viewport.density, 0, 0); draw.context.translate(x || -draw.viewport.x, y || -draw.viewport.y); return draw;
				};
				draw.transform = function(x, y, sx, sy, kx, ky) {
					draw.context.setTransform(sx, kx, ky, sy, x, y); return draw;
				};
				draw.opacity = function(a) {
					if (a != undefined) draw.context.globalAlpha = a; return a != undefined ? draw : draw.context.globalAlpha;
				};
				draw.quality = function(a) {
					if (a != undefined) draw.context.imageSmoothingQuality = a; return a != undefined ? draw : draw.context.imageSmoothingQuality;
				};
				draw.composite = function(a) {
					if (a) draw.context.globalCompositeOperation = a; return a ? draw : draw.context.globalCompositeOperation;
				};
				draw.translate = function(x, y) {
					draw.context.translate(x, y); return draw;
				};
				draw.rotate = function(a) {
					draw.context.rotate(a); return draw;
				};
				draw.begin = function() {
					draw.context.beginPath(); return draw;
				};
				draw.close = function() {
					draw.context.closePath(); return draw;
				};
				draw.save = function() {
					draw.context.save(); return draw;
				};
				draw.restore = function() {
					draw.context.restore(); return draw;
				};
				draw.size = function(a) {
					draw.context.lineWidth = a; return draw;
				};
				draw.len = function(a) {
					return draw.context.measureText(a).width;
				};
				draw.cap = function(a) {
					if (a) draw.context.lineCap = a; return draw;
				};
				draw.stroke = function(a) {
					a ? draw.context.strokeStyle = a : draw.context.stroke(); return draw;
				};
				draw.fill = function(a) {
					a ? draw.context.fillStyle = a : draw.context.fill(); return draw;
				};
				draw.from = function(x, y) {
					draw.context.moveTo(x, y); return draw;
				};
				draw.to = function(x, y) {
					draw.context.lineTo(x, y); return draw;
				};
				draw.rectangle = function(x, y, width, height) {
					draw.context.fillRect(x, y, width, height); return draw;
				};
				draw.border = function(x, y, width, height) {
					draw.context.strokeRect(x, y, width, height); return draw;
				};
				draw.arc = function(x, y, radius, sAngle, eAngle, counterclockwise) {
					draw.context.arc(x, y, radius, sAngle, eAngle, counterclockwise); return draw;
				};
				draw.font = function(a) {
					if (a) draw.context.font = a; return a ? draw : draw.context.font;
				};
				draw.baseline = function(a) {
					if (a) draw.context.textBaseline = a; return a ? draw : draw.context.textBaseline;
				};
				draw.align = function(a) {
					if (a) draw.context.textAlign = a; return a ? draw : draw.context.textAlign;
				};
				draw.circle = function(x, y, radius) {
					draw.context.arc(x, y, radius, 0, 2 * Math.PI); return draw;
				};
				draw.text = function(x, y, a) {
					if (Array.isArray(a)) a.forEach(function(k, v) { draw.context.fillText(v, x, y + (k * (parseInt(draw.context.font) + 5))); });
						else draw.context.fillText(a, x, y); return draw;
				};
				draw.image = function(image, x, y, width, height) {
					if (width != undefined && height != undefined) draw.context.drawImage(image.get ? image.get() : image, 0, 0, image.width, image.height, x, y, width, height); 
						else draw.context.drawImage(image.get ? image.get() : image, x || 0, y || 0); return draw;
				};
				draw.data = function(x, y, width, height) {
					return draw.context.getImageData(x || 0, y || 0, width == undefined ? draw.canvas.width : width, height == undefined ? draw.canvas.height : height).data;
				};
				draw.shadow = function(a) {
					if (a.color != undefined) draw.context.shadowColor = a.color;
					if (a.size != undefined) draw.context.shadowBlur = a.size; else draw.context.shadowBlur = 0;
					if (a.x != undefined) draw.context.shadowOffsetX = a.x; if (a.y != undefined) draw.context.shadowOffsetY = a.y; return draw;
				};
				draw.gradient = function(x, y, r) {
					var gradient = new Object(); gradient.context = draw.context; gradient.index = 0;
					gradient.linear = function(x1) { gradient.item = gradient.context.createLinearGradient(x, y, r, x1); return gradient; };
					gradient.radial = function(x1, y1, r1) { gradient.item = gradient.context.createRadialGradient(x, y, r, x1, y1, r1); return gradient; };
					gradient.color = function(color) { if (gradient.item) gradient.item.addColorStop(gradient.index, color); if (gradient.item) gradient.index++; return gradient; };
					gradient.get = function() { return gradient.item; }; return gradient;
				};
				draw.render = function(item) {
					draw.context.save();
					if (item.opacity) draw.context.globalAlpha = item.opacity;
					if (item.size) draw.context.lineWidth = item.size;
					if (item.color) draw.context.fillStyle = item.color;
					if (item.border) draw.context.strokeStyle = item.border;
					if (item.font) draw.context.font = item.font;
					if (item.cap) draw.context.lineCap = item.cap;
					if (item.radius) draw.context.beginPath();
					if (item.color) draw.context.fillRect(item.x, item.y, item.width, item.height);
					if (item.border) draw.context.strokeRect(item.x, item.y, item.width, item.height);
					if (item.radius) draw.context.arc(item.x, item.y, item.radius, 0, 2 * Math.PI);
					if (item.text) draw.context.fillText(item.text, item.x, item.y);
					if (item.image) draw.context.drawImage(item.image, 0, 0, item.image.width, item.image.height, item.x, item.y, item.width, item.height); 
					if (item.color) draw.context.fill();
					if (item.border) draw.context.stroke();
					draw.context.restore();
				};
				draw.lines = function(text, width) {
					var lines = new Array(), paragraphs = text.split("\n");
					for (var i = 0; i < paragraphs.length; i++) {
						var words = paragraphs[i].split(" "), line = words[0];
						for (var j = 1; j < words.length; j++) {
							if (context.measureText(line + " " + words[j]).width <= width) line += " " + words[j]; 
								else if (width) lines.push(line); line = words[j];
						}
						if (width) lines.push(line); else lines.push(paragraphs[i]);
					}
					return lines;
				};
				draw.angle = function(dx, dy) {
					var angle = Math.atan2(dy, dx) * 180 / Math.PI; return angle < 0 ? angle + 360 : angle;
				};
				draw.vibrate = function(a, callback) {
					var x = Math.random() * a, y = Math.random() * a;
					if (callback) context.save(); draw.context.translate(x, y); if (callback) callback(draw); if (callback) context.restore(); return draw;
				};
				draw.rotation = function(angle, x, y, width, height, callback) {
					draw.context.save();
					draw.context.translate(x + width / 2, y + height / 2);
					draw.context.rotate(angle * Math.PI / 180);
					if (callback) callback({ x: -width / 2, y: -height / 2, width: width, height: height });
					draw.context.restore();
				};
				draw.print = function() {
					var print = new Object();
					print.x = 0;
					print.y = 0;
					print.size = 1;
					print.width = 0;
					print.height = 0;
					print.padding = 0;
					print.opacity = 1;
					print.value = null;
					print.each = new Array();
					print.canvas = document.createElement("canvas");
					print.context = print.canvas.getContext("2d");
					print.color = engine.Color.BLACK;
					print.update = function() {
						var value = (print.value ? print.value.toString().toUpperCase().split(EMPTY) : []);
						print.each = new Array(); print.width = 0; print.height = 0;
						for (var index = 0; index < value.length; index++) {
							var character = value[index], position = CHARACTER.indexOf(character);
							if (position >= 0) {
								var matrix = MATRIX[position], width = 0, height = 0;
								matrix.forEach(function(row, y, rows) {
									width = print.size * row.length; height = print.size * rows.length;
									row.forEach(function(id, x) {
										if (id) print.each.push({ x: x * print.size + print.width, y: y * print.size, height: print.size, width: print.size });
									});
								});
								print.width = print.width + width + (index < value.length - 1 ? print.size : 0); print.height = height;
							}
						}
						print.canvas.width = print.width; print.canvas.height = print.height;
						if (print.opacity < 1) print.context.globalAlpha = print.opacity;
						print.each.forEach(function(each) {
							print.context.fillStyle = print.color;
							print.context.fillRect(each.x, each.y, each.width, each.height);
						});
					};
					print.render = function() {
						draw.context.drawImage(print.canvas, 0, 0, print.canvas.width, print.canvas.height, print.x, print.y, print.width, print.height); 
					};
					return print;
				};
				draw.polygon = function() {
					var polygon = new Object();
					polygon.x = 0;
					polygon.y = 0;
					polygon.width = 0;
					polygon.height = 0;
					polygon.opacity = 1;
					polygon.left = false;
					polygon.id = 0;
					polygon.index = 0;
					polygon.frame = 0;
					polygon.frames = [0];
					polygon.compare = [0];
					polygon.duration = 20;
					polygon.size = { width: 0, height: 0 };
					polygon.each = new Array();
					polygon.data = new Array();
					polygon.canvas = document.createElement("canvas");
					polygon.context = polygon.canvas.getContext("2d");
					polygon.source = function(source) {
						var width = new Array(), height = new Array();
						var point = function(value) {
							var vector = value.split(/\:/);
							return { x: polygon.size.width * parseFloat(vector[0]), y: polygon.size.height * parseFloat(vector[1]) };
						};
						source.split(/\>/).forEach(function(data, id) {
							polygon.data[id] = new Array();
							data.split(/\//).forEach(function(item) {
								var color = engine.Color.BLACK, opacity = 1, vector = new Array();
								item.split(/\s+/).forEach(function(value, index) {
									if (index == 0) color = engine.Type.HASHTAG + value;
									if (index == 1) opacity = parseFloat(value);
									if (index > 1) {
										var dot = point(value); width.push(dot.x); height.push(dot.y);
										vector.push({ x: dot.x, y: dot.y });
									}
								});
								polygon.data[id].push({ color: color, opacity: opacity, vector: vector });
							});
						});
						if (polygon.width == 0) polygon.width = Math.max.apply(Math, width);
						if (polygon.height == 0) polygon.height = Math.max.apply(Math, height);
					};
					polygon.animate = function() {
						if (polygon.frames.join(EMPTY) != polygon.compare.join(EMPTY)) { polygon.compare = polygon.frames; polygon.frame = 0; polygon.index = 0; }
						if ((polygon.frame / polygon.duration) % 1 == 0) polygon.id = polygon.frames[++polygon.index % polygon.frames.length]; polygon.frame += 1;
					};
					polygon.update = function() {
						polygon.each = new Array();
						if (polygon.data[polygon.id]) polygon.data[polygon.id].forEach(function(value) {
							var vector = new Array();
							value.vector.forEach(function(point) {
								vector.push({ x: (polygon.left ? polygon.width - point.x : point.x), y: point.y });
							});
							polygon.each.push({ color: value.color, opacity: value.opacity, vector: vector });
						});
						polygon.canvas.width = polygon.width; polygon.canvas.height = polygon.height;
						if (polygon.opacity < 1) polygon.context.globalAlpha = polygon.opacity;
						polygon.each.forEach(function(value) {
							polygon.context.beginPath();
							polygon.context.fillStyle = value.color;
							polygon.context.globalAlpha = value.opacity;
							value.vector.forEach(function(point, index) {
								if (index == 0) polygon.context.moveTo(point.x, point.y);
								if (index > 0) polygon.context.lineTo(point.x, point.y);
							});
							polygon.context.fill();
							polygon.context.closePath();
						});
					};
					polygon.render = function() {
						draw.context.drawImage(polygon.canvas, 0, 0, polygon.canvas.width, polygon.canvas.height, polygon.x, polygon.y, polygon.width, polygon.height);
					};
					return polygon;
				};
				draw.colorset = function() {
					var colorset = new Object();
					colorset.x = 0;
					colorset.y = 0;
					colorset.width = 0;
					colorset.height = 0;
					colorset.opacity = 1;
					colorset.left = false;
					colorset.id = 0;
					colorset.index = 0;
					colorset.frame = 0;
					colorset.frames = [0];
					colorset.compare = [0];
					colorset.duration = 20;
					colorset.each = new Array();
					colorset.data = new Array();
					colorset.color = new Object();
					colorset.canvas = document.createElement("canvas");
					colorset.context = colorset.canvas.getContext("2d");
					colorset.size = { width: 1, height: 1 };
					colorset.source = function(source) {
						var color = source.split(/\>/).reduce(function(value) { return value; }).split(/\//).map(function(value) { return value.split(/\s+/); });
						var data = source.split(/\>/).map(function(value, index) { if (value && index > 0) return value.split(/\//); }).filter(Boolean);
						for (var index in color) if (color.hasOwnProperty(index)) colorset.color[color[index][0]] = engine.Type.HASHTAG + color[index][1];
						for (var index in data) if (data.hasOwnProperty(index)) colorset.data[index] = data[index].map(function(value) { return value.split(/\s+/).map(function(v) { return new Number(v).valueOf(); }); });
					};
					colorset.animate = function() {
						if (colorset.frames.join(EMPTY) != colorset.compare.join(EMPTY)) { colorset.compare = colorset.frames; colorset.frame = 0; colorset.index = 0; }
						if ((colorset.frame / colorset.duration) % 1 == 0) colorset.id = colorset.frames[++colorset.index % colorset.frames.length]; colorset.frame += 1;
					};
					colorset.update = function() {
						var data = colorset.data[colorset.id]; colorset.width = 0; colorset.height = 0; colorset.each = new Array();
						if (colorset.opacity < 1) colorset.context.globalAlpha = colorset.opacity;
						if (data) {
							var width = colorset.size.width, height = colorset.size.height;
							colorset.cols = data.reduce(function(value) { return value; }).length; colorset.rows = data.length;
							colorset.width = colorset.cols * width; colorset.height = colorset.rows * height;
							colorset.canvas.width = colorset.width; colorset.canvas.height = colorset.height;
							data.forEach(function(value, y) {
								value.forEach(function(id, x) {
									var color = colorset.color[id];
									if (color) {
										var transformation = x * width; if (colorset.left) transformation = (colorset.width - width) - x * width;
										colorset.each.push({ id: id, color: color, x: colorset.x + transformation, y: colorset.y + y * height, width: width, height: height });
										colorset.context.fillStyle = color; colorset.context.fillRect(transformation, y * height, width, height);
									}
								});
							});
						}
					};
					colorset.render = function() {
						draw.context.drawImage(colorset.canvas, 0, 0, colorset.canvas.width, colorset.canvas.height, colorset.x, colorset.y, colorset.width, colorset.height);
					};
					return colorset;
				};
				draw.imageset = function() {
					var imageset = new Object();
					imageset.x = 0;
					imageset.y = 0;
					imageset.width = 0;
					imageset.height = 0;
					imageset.opacity = 1;
					imageset.left = false;
					imageset.id = 0;
					imageset.index = 0;
					imageset.frame = 0;
					imageset.frames = [0];
					imageset.compare = [0];
					imageset.duration = 20;
					imageset.resource = null;
					imageset.each = new Array();
					imageset.data = new Array();
					imageset.image = new Object();
					imageset.size = { width: 1, height: 1 };
					imageset.canvas = document.createElement("canvas");
					imageset.context = imageset.canvas.getContext("2d");
					imageset.source = function(source) {
						var image = source.split(/\>/).reduce(function(value) { return value; }).split(/\//).map(function(value) { return value.split(/\s+/).map(function(v) { return new Number(v).valueOf(); }); });
						var data = source.split(/\>/).map(function(value, index) { if (value && index > 0) return value.split(/\//); }).filter(Boolean);
						for (var index in image) if (image.hasOwnProperty(index)) imageset.image[image[index][0]] = { x: image[index][1], y: image[index][2] };
						for (var index in data) if (data.hasOwnProperty(index)) imageset.data[index] = data[index].map(function(value) { return value.split(/\s+/).map(function(v) { return new Number(v).valueOf(); }); });
					};
					imageset.animate = function() {
						if (imageset.frames.join(EMPTY) != imageset.compare.join(EMPTY)) { imageset.compare = imageset.frames; imageset.frame = 0; imageset.index = 0; }
						if ((imageset.frame / imageset.duration) % 1 == 0) imageset.id = imageset.frames[++imageset.index % imageset.frames.length]; imageset.frame += 1;
					};
					imageset.update = function() {
						var data = imageset.data[imageset.id]; imageset.width = 0; imageset.height = 0; imageset.each = new Array();
						if (imageset.opacity < 1) imageset.context.globalAlpha = imageset.opacity;
						if (data) {
							var width = imageset.size.width, height = imageset.size.height;
							imageset.cols = data.reduce(function(value) { return value; }).length; imageset.rows = data.length;
							imageset.width = imageset.cols * width; imageset.height = imageset.rows * height;
							imageset.canvas.width = imageset.width; imageset.canvas.height = imageset.height; if (imageset.left) imageset.context.setTransform(-1, 0, 0, 1, imageset.width, 0);
							data.forEach(function(value, y) {
								value.forEach(function(id, x) {
									var image = imageset.image[id];
									if (image) {
										var transformation = x * width; if (imageset.left) transformation = (imageset.width - width) - x * width;
										imageset.each.push({ id: id, x: imageset.x + transformation, y: imageset.y + y * height, width: width, height: height });
										imageset.context.drawImage(imageset.resource, image.x, image.y, width, height, x * width, y * height, width, height);
									}
								});
							});
						}
					};
					imageset.render = function() {
						draw.context.drawImage(imageset.canvas, 0, 0, imageset.canvas.width, imageset.canvas.height, imageset.x, imageset.y, imageset.width, imageset.height);
					};
					return imageset;
				};
				draw.particle = function() {
					var particle = new Object();
					particle.generation = 1;
					particle.each = new Array();
					particle.context = draw.context;
					particle.item = function() {
						var item = new Object();
						item.x = 0;
						item.y = 0;
						item.width = 0;
						item.height = 0;
						item.force = 0.0;
						item.friction = 0.8;
						item.gravity = 0.98;
						item.color = engine.Color.BLACK;
						item.velocity = { x: 0, y: 0 };
						item.alive = { value: 0, range: 0 };
						item.death = function() {
							return item.alive.value <= 0;
						};
						item.update = function() {
							item.x += item.velocity.x;
							item.y += item.velocity.y;
							item.velocity.x += item.force;
							item.velocity.x *= item.friction;
							item.velocity.y += item.gravity;
							item.alive.value -= item.alive.range;
						};
						item.render = function() {
							particle.context.save();
							particle.context.globalAlpha = item.alive.value;
							particle.context.fillStyle = item.color;
							particle.context.fillRect(item.x, item.y, item.width, item.height);
							particle.context.restore();
						};
						return item;
					};
					particle.create = function() {
						for (var index = 0; index < particle.generation; index++) particle.each.push(particle.item());
					};
					particle.update = function() {
						particle.each.forEach(function(value, index) {
							value.update(); if (value.death()) particle.each.splice(index, 1);
						});
					};
					particle.render = function() {
						particle.each.forEach(function(value) { value.render(); });
					};
					return particle;
				};
				draw.platformer = function() {
					var platformer = new Object();
					platformer.x = 0;
					platformer.y = 0;
					platformer.width = 0;
					platformer.height = 0;
					platformer.opacity = 1;
					platformer.friction = 0.8;
					platformer.gravity = 0.98;
					platformer.color = engine.Color.BLACK;
					platformer.velocity = { x: 0, y: 0 };
					platformer.context = draw.context;
					platformer.update = function() {
						platformer.x += platformer.velocity.x;
						platformer.y += platformer.velocity.y;
						platformer.velocity.x *= platformer.friction;
						platformer.velocity.y += platformer.gravity;
					};
					platformer.render = function() {
						platformer.context.save();
						platformer.opacity < 1 ? platformer.context.globalAlpha = platformer.opacity : null;
						platformer.context.fillStyle = platformer.color;
						platformer.context.fillRect(platformer.x, platformer.y, platformer.width, platformer.height);
						platformer.context.restore();
					};
					return platformer;
				};
				draw.raycast = function() {
					var raycast = new Object();
					raycast.width = draw.width;
					raycast.height = draw.height;
					raycast.data = new Array();
					raycast.wall = new Object();
					raycast.image = new Object();
					raycast.texture = new Array();
					raycast.wall = { texture: new Object() };
					raycast.step = { x: -1, y: 1 };
					raycast.plane = { x: 0, y: 0.66 };
					raycast.viewport = { x: 0, y: 0 };
					raycast.distance = { x: 0, y: 0 };
					raycast.direction = { x: 0, y: 0 };
					raycast.camera = { x: 0, y: 0, direction: { x: -1, y: 0 } };
					raycast.canvas = document.createElement("canvas");
					raycast.context = raycast.canvas.getContext("2d");
					raycast.background = {
						opacity: 0,
						color: "black",
						render: function() {
							draw.context.save();
							draw.context.fillStyle = this.color;
							draw.context.fillRect(0, 0, raycast.width, raycast.height);
							draw.context.restore();
						}
					};
					raycast.move = function(move) {
						var value = move / draw.frames;
						if (raycast.data[Math.floor(raycast.camera.x + raycast.camera.direction.x * value)][Math.floor(raycast.camera.y)] == false) raycast.camera.x += raycast.camera.direction.x * value;
						if (raycast.data[Math.floor(raycast.camera.x)][Math.floor(raycast.camera.y + raycast.camera.direction.y * value)] == false) raycast.camera.y += raycast.camera.direction.y * value;
					};
					raycast.rotate = function(rotate) {
						var direction = raycast.camera.direction.x, plane = raycast.plane.x, value = rotate / draw.frames;
						raycast.camera.direction.x = raycast.camera.direction.x * Math.cos(value) - raycast.camera.direction.y * Math.sin(value);
						raycast.camera.direction.y = direction * Math.sin(value) + raycast.camera.direction.y * Math.cos(value);
						raycast.plane.x = raycast.plane.x * Math.cos(value) - raycast.plane.y * Math.sin(value);
						raycast.plane.y = plane * Math.sin(value) + raycast.plane.y * Math.cos(value);
					};
					raycast.update = function() {
						raycast.canvas.width = raycast.width;
						raycast.canvas.height = raycast.height;
						for (var x = 0; x < raycast.width; x++) {
							raycast.wall.hit = 0; raycast.wall.distance = new Object();
							raycast.viewport.x = 2 * x / raycast.width - 1;
							raycast.direction.x = raycast.camera.direction.x + raycast.plane.x * raycast.viewport.x;
							raycast.direction.y = raycast.camera.direction.y + raycast.plane.y * raycast.viewport.x;
							raycast.x = Math.floor(raycast.camera.x);
							raycast.y = Math.floor(raycast.camera.y);
							raycast.distance.x = Math.abs(1 / raycast.direction.x);
							raycast.distance.y = Math.abs(1 / raycast.direction.y);
							if (raycast.direction.x < 0) {
								raycast.step.x = -1; raycast.wall.distance.x = (raycast.camera.x - raycast.x) * raycast.distance.x;
							} else {
								raycast.step.x = 1; raycast.wall.distance.x = (raycast.x + 1 - raycast.camera.x) * raycast.distance.x;
							}
							if (raycast.direction.y < 0) {
								raycast.step.y = -1; raycast.wall.distance.y = (raycast.camera.y - raycast.y) * raycast.distance.y;
							} else {
								raycast.step.y = 1; raycast.wall.distance.y = (raycast.y + 1 - raycast.camera.y) * raycast.distance.y;
							}
							while (raycast.wall.hit == 0) {
								if (raycast.wall.distance.x < raycast.wall.distance.y) {
									raycast.wall.distance.x += raycast.distance.x;
									raycast.x += raycast.step.x; raycast.wall.side = 0;
								} else {
									raycast.wall.distance.y += raycast.distance.y;
									raycast.y += raycast.step.y; raycast.wall.side = 1;
								}
								if (raycast.data[raycast.x][raycast.y] > 0) raycast.wall.hit = 1;
							}
							if (raycast.wall.side == 0) raycast.wall.perp = (raycast.x - raycast.camera.x + (1 - raycast.step.x) / 2) / raycast.direction.x;
								else raycast.wall.perp = (raycast.y - raycast.camera.y + (1 - raycast.step.y) / 2) / raycast.direction.y;
							raycast.wall.height = Math.floor(raycast.height / raycast.wall.perp); raycast.wall.begin = -raycast.wall.height / 2 + raycast.height / 2;
							raycast.wall.end = raycast.wall.height / 2 + raycast.height / 2;
							if (raycast.wall.end >= raycast.height) raycast.wall.end = raycast.height - 1;
							raycast.wall.texture.value = raycast.texture[(raycast.data[raycast.x][raycast.y]) - 1];
							if (raycast.wall.texture.value) {
								raycast.context.save();
								raycast.context.globalAlpha = (raycast.wall.height / raycast.height) * raycast.background.opacity;
								if (raycast.wall.texture.value.substring(0, 1) == "#") {
									raycast.context.fillStyle = raycast.wall.texture.value;
									raycast.context.fillRect(x, raycast.wall.begin, 1, raycast.wall.height);
								} else {
									var image = raycast.image[raycast.wall.texture.value];
									if (raycast.wall.side == 0) raycast.wall.x = raycast.camera.y + raycast.wall.perp * raycast.direction.y;
										else raycast.wall.x = raycast.camera.x + raycast.wall.perp * raycast.direction.x; raycast.wall.x -= Math.floor(raycast.wall.x);
									raycast.wall.texture.x = Math.floor(raycast.wall.x * raycast.wall.texture.width);
									if (raycast.wall.side == 0 && raycast.direction.x > 0) raycast.wall.texture.x = raycast.wall.texture.width - raycast.wall.texture.x - 1;
									if (raycast.wall.side == 1 && raycast.direction.y < 0) raycast.wall.texture.x = raycast.wall.texture.width - raycast.wall.texture.x - 1;
									if (image) raycast.context.drawImage(image, raycast.wall.texture.x, 0, 1, image.height, x, raycast.wall.begin, 1, raycast.wall.height);
								}
								raycast.context.restore();
							}
						}
					};
					raycast.render = function() {
						raycast.background.render();
						draw.context.drawImage(raycast.canvas, 0, 0, raycast.canvas.width, raycast.canvas.height, 0, 0, raycast.width, raycast.height);
					};
					return raycast;
				};
				return draw;
			};
			engine.Socket = function(source) {
				var socket = new Object(), websocket = new WebSocket(source);
				socket.open = function(callback) {
					if (websocket) websocket.onopen = function() { if (callback) callback(websocket); }; return socket;
				};
				socket.message = function(callback) {
					if (websocket) websocket.onmessage = function(message) { if (callback) callback(message); }; return socket;
				};
				socket.error = function(callback) {
					if (websocket) websocket.onerror = function(error) { if (callback) callback(error); }; return socket;
				};
				socket.close = function(callback) {
					if (websocket) websocket.onclose = function() { if (callback) callback(); }; return socket;
				};
				socket.send = function(message) { if (websocket) websocket.send(message); return socket; };
				socket.get = function() { if (websocket) return websocket; };
				return socket;
			};
			engine.Execute = function(source) {
				var execute = new Object();
				execute.response = function(callback) {
					var script = document.createElement("script"), blob = new Blob([source], {type: "text/plain"}), object = window.URL.createObjectURL(blob);
					script.onload = function() { window.URL.revokeObjectURL(object); if (callback) callback(source); };
					script.src = object; document.head.appendChild(script); return execute;
				}
				return execute;
			}
			engine.Read = function(array, type) {
				var read = new Object();
				read.response = function(callback, error) {
					var data = new Array(), total = array.length, count = 1;
					for (var index = 0; index < total; index++) {
						data[index] = new FileReader();
						data[index].onerror = function(event) { if (error) error(event); };
						data[index].onload = function() {
							if (callback) callback(total, count, this); count++;
						};
						data[index].readAsArrayBuffer(type ? new Blob([array[index]], { "type": type }) : array[index]);
					}
					return array;
				};
				return read;
			};
			engine.Files = function(array) {
				var files = new Object();
				files.response = function(callback, error) {
					var data = new Array(), total = array.length, count = 1;
					for (var index = 0; index < total; index++) {
						data[index] = new (XMLHttpRequest || ActiveXObject) ("MSXML2.XMLHTTP.6.0");
						data[index].open("GET", array[index], true); data[index].responseType = "arraybuffer";
						data[index].onerror = function(event) { if (error) error(event); };
						data[index].onload = function(file) {
							var buffer = this.response, name = array[count].replace(/^.*[\\\/]/, EMPTY);
							if (callback) callback(total, count, name, buffer); count++;
						};
						data[index].send();
					}
					return array;
				};
				return files;
			};
			engine.Request = function(input, params) {
				var request = new Object();
				request.response = function(callback, error) {
					var server = new (XMLHttpRequest || ActiveXObject) ("MSXML2.XMLHTTP.6.0");
					var data = (typeof input === "string" ? { source: input } : input), source = data.source;
					try {
						if (data.title) document.title = data.title;
						if (data.title) window.history.pushState(null, data.title, source);
						if (data.type) server.responseType = data.type;
						if (params) server.open("POST", source, true); else server.open("GET", source, true);
						if (params) server.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						if (params) server.send(engine.Params(params)); else server.send();
						server.onload = function() {
							if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
								var response = this.response;
								if (callback) callback(data.type == "json" && typeof response !== "object" ? engine.Parse.JSON(response) : response, source);
							}
						};
					} catch(event) { if (error) error(event); }
					return server;
				};
				return request;
			};
			engine.Include = function(a) {
				var include = new Object();
				include.tag = document.createElement("iframe"); if (a) include.tag.src = a; document.head.appendChild(include.tag);
				include.response = function(callback) {
					include.tag.onload = function(e) {
						if (callback) callback(this.contentWindow || this.contentDocument, this, e);
					};
					return include.tag;
				};
				return include;
			};
			engine.Params = function(a) {
				var b = new Array(); for (var k in a) if (a.hasOwnProperty(k)) b.push(encodeURIComponent(k) + engine.Value(0x3D) + encodeURIComponent(a[k]));
				return typeof a === "string" ? a : b.join("&");
			};
			engine.Path = function(folders, filename) {
				if (folders) return folders.join("/") + (filename ? "/" + filename : EMPTY);
			};
			engine.Speech = {
				recognizer: function(a) {
					var recognizer =  new Object();
					recognizer.response = function(callback) {
						var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition) ();
						recognition.interimResults = a && a.interim ? a.interim : false; if (a && a.max) recognition.maxAlternatives = a.max; 
						recognition.lang = a && a.lang ? a.lang : "en-US"; if (a && a.continuous) recognition.continuous = a.continuous; if (a && a.grammars) recognition.grammars = a.grammars;
						recognition.onresult = function(e) { if (callback) callback(e.results[0][0].transcript); }; recognition.start(); return recognition;
					};
					return recognizer;
				},
				synthesizer: function(a) {
					var synthesizer = new (window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance || window.mozSpeechSynthesisUtterance || window.msSpeechSynthesisUtterance) ();
					synthesizer.text = a && a.text ? a.text : a; synthesizer.pitch = a && a.pitch ? a.pitch : 2; synthesizer.rate = a && a.rate ? a.rate : 1;
					synthesizer.volume = a && a.volume ? a.volume : 1; synthesizer.lang = a && a.lang ? a.lang : "en-US";
					synthesizer.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == a && a.voice ? a.voice : "Agnes"; })[0];
					speechSynthesis.speak(synthesizer); return synthesizer;
				}
			};
			engine.Vector = function(width, height) {
				var vector = new Object();
				var tag = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				if (width != undefined) tag.setAttributeNS(null, "width", width);
				if (height != undefined) tag.setAttributeNS(null, "height", height);
				vector.attribute = function(key, value) {
					if (key && value != undefined) tag.setAttributeNS(null, key, value); return this;
				};
				vector.view = function(a) {
					vector.attribute("viewBox", a); return this;
				};
				vector.add = function() {
					document.body.appendChild(tag); return this;
				};
				vector.into = function(a) {
					a.get ? a.get().appendChild(tag) : a.appendChild(tag); return this;
				};
				vector.put = function(name, callback) {
					var child = document.createElementNS("http://www.w3.org/2000/svg", name);
					if (callback) callback(function(k, v) { child.setAttributeNS(null, k, v); }); tag.appendChild(child); return this;
				};
				vector.get = function() {
					return tag;
				};
				return vector;
			};
			Object.prototype.Fullscreen = function(a) {
				var element = this || document.documentElement;
				var lock = function(a) {
					var orientation = (screen.unlockOrientation || screen.mozLockOrientation || screen.msLockOrientation || (screen.orientation && screen.orientation.lock));
					if (orientation) orientation(a).then(function() { }).catch(function() { });
				};
				var unlock = function() {
					var orientation = (screen.lockOrientation || screen.mozUnLockOrientation || screen.msUnLockOrientation || (screen.orientation && screen.orientation.unlock));
					if (orientation) orientation().then(function() { }).catch(function() { });
				};
				if (element.requestFullscreen) {
					document.fullScreenElement ? document.cancelFullScreen() : element.requestFullscreen();
					document.fullScreenElement ? unlock() : lock(a); return element.RequestFullscreen;
				} else if (element.msRequestFullscreen) {
					document.msFullscreenElement ? document.msExitFullscreen() : element.msRequestFullscreen();
					document.msFullscreenElement ? unlock() : lock(a); return element.msRequestFullscreen;
				} else if (element.mozRequestFullScreen) {
					document.mozFullScreenElement ? document.mozCancelFullScreen() : element.mozRequestFullScreen();
					document.mozFullScreenElement ? unlock() : lock(a); return element.mozRequestFullScreen;
				} else if (element.webkitRequestFullscreen) {
					document.webkitFullscreenElement ? document.webkitCancelFullScreen() : element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					document.webkitFullscreenElement ? unlock() : lock(a); return element.webkitRequestFullscreen;
				}
				return false;
			};
			engine.Mobile = function(a) {
				var a = (a ? a : 640), b = navigator.userAgent || navigator.vendor || window.opera;
				return window.orientation >- 1 || screen.width <= a ||
					(window.matchMedia && window.matchMedia("only screen and (max-width: " + a + "px)").matches) || 
					/Mobi/i.test(b) || !(/Windows NT|Macintosh|Mac OS X|Linux/i.test(b)) || 
					/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile/i.test(b) || 
					/Opera Mini|Opera Mobile|Kindle|Windows Phone|PSP/i.test(b) || 
					/AvantGo|Atomic Web Browser|Blazer|Chrome Mobile/i.test(b) || 
					/Dolphin|Dolfin|Doris|GO Browser|Jasmine|MicroB/i.test(b) || 
					/Mobile Firefox|Mobile Safari|Mobile Silk|Motorola Internet Browser/i.test(b) || 
					/NetFront|NineSky|Nokia Web Browser|Obigo|Openwave Mobile Browser/i.test(b) || 
					/Palm Pre web browser|Polaris|PS Vita browser|Puffin|QQbrowser/i.test(b) || 
					/SEMC Browser|Skyfire|Tear|TeaShark|UC Browser|uZard Web/i.test(b) || 
					/wOSBrowser|Yandex.Browser mobile/i.test(b);
			};
			engine.Open = window.open;
			engine.Debug = {
				log: console.log,
				error: console.error
			};
			engine.Color = {
				TRANSPARENT: "transparent",
				WHITE: "#FFFFFF",
				BLACK: "#000000",
				DARK: "#222222",
				GRAY: "#808080",
				IRON: "#484848",
				CLOUD: "#C8C8C8",
				SILVER: "#AAAAAA",
				SHADOW: "#363636",
				DARKER: "#111111",
				value: function(value) {
					return parseInt(value, 10) == value ? engine.Type.HASHTAG + new Array((6 - value.toString(16).length) + 1).join(0x00) + value.toString(16) : value;
				},
				rgb: function(red, green, blue) {
					return engine.Type.HASHTAG + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1, 7);
				}
			};
			engine.Align = {
				TOP: "top",
				LEFT: "left",
				RIGHT: "right",
				BOTTOM: "bottom",
				CENTER: "center",
				MIDDLE: "middle",
				gravity: function(tag, value) {
					var direction = value == "middle" ? "center" : value; if (value == "middle") tag.style.margin = "auto";
					var align = direction == "left" || direction == "top" ? "flex-start" : (direction == "right" || direction == "bottom" ? "flex-end" : (direction == "center" ? direction : null));
					if (align) tag.style.alignSelf = align; if (align) tag.style.alignItems = align; tag.style.textAlign = direction; return align;
				}
			};
			engine.Type = {
				FIT: "100%",
				AUTO: "auto",
				NONE: "none",
				BOLD: "bold",
				BLOCK: "block",
				BOTTON: "botton",
				POINTER: "pointer",
				BREAKxWORD: "break-word",
				NEWxPASSWORD: "new-password",
				PASSWORD: "password",
				CONTAIN: "contain",
				NOWRAP: "nowrap",
				WRAP: "wrap",
				NORMAL: "normal",
				HIDDEN: "hidden",
				SCROLL: "scroll",
				COVER: "cover",
				COLUMN: "column",
				ROW: "row",
				FILL: "fill",
				TEXT: "text",
				PRE: "pre",
				OFF: "off",
				ON: "on",
				NULL: null,
				UNKOWN: undefined,
				OR: engine.Value(0x7C),
				AND: engine.Value(0x26),
				DOT: engine.Value(0x2E),
				DASH: engine.Value(0x2D),
				HASHTAG: engine.Value(0x23),
				QUERY: engine.Value(0x3F),
				LOWER: engine.Value(0x3C),
				HIGHER: engine.Value(0x3E),
				SPACE: engine.Value(0x20),
				BACKSLASH: engine.Value(0x2F),
				BLANK: new String().toString()
			};
			var UNIQUE = 0;
			var EMPTY = new String().toString();
			var CHARACTER = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"\'_-,./:?".split(EMPTY);
			var VECTOR = "000000 0 0:0 24:0 24:24 0:24/ffffff 1 4:4 4:16 8:16 8:8 12:8 12:4/ffffff 1 20:20 20:8 16:8 16:16 12:16 12:20";
			var MATRIX = [
				[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 1, 1, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]],
				[[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
				[[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [1, 1, 1, 0, 0]],
				[[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 0], [1, 0, 0, 1, 0], [1, 0, 0, 0, 1]],
				[[1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 1, 0, 1], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 0], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
				[[1, 1, 1, 1, 1], [1, 0, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
				[[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1]],
				[[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [0, 1, 0, 1, 0], [0, 0, 1, 0, 0]],
				[[1, 0, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1], [0, 1, 1, 1, 1, 1, 0]],
				[[1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1]],
				[[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]],
				[[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 1, 1, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [1, 1, 1, 1, 1]],
				[[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
				[[1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
				[[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1]],
				[[1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [0, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
				[[1, 0, 0, 0], [1, 0, 0, 0], [1, 0, 1, 0], [1, 1, 1, 1], [0, 0, 1, 0], [0, 0, 1, 0]],
				[[1, 1, 1, 1], [1, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
				[[1, 1, 1, 1], [1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
				[[1, 1, 1, 1, 0], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0], [0, 1, 1, 1, 1], [0, 0, 0, 1, 0], [0, 0, 0, 1, 0]],
				[[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1]],
				[[1, 1, 1, 1], [1, 0, 0, 1], [1, 0, 0, 1], [1, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]],
				[[1], [1], [1], [1], [0], [1]],
				[[1], [1], [1], [0], [0], [0]],
				[[1], [1], [1], [0], [0], [0]],
				[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1]],
				[[0, 0, 0], [0, 0, 0], [0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
				[[0, 0], [0, 0], [0, 0], [0, 0], [0, 1], [1, 0]],
				[[0], [0], [0], [0], [0], [1]],
				[[0, 0, 0, 0, 1], [0, 0, 0, 1, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 1, 0, 0, 0], [1, 0, 0, 0, 0]],
				[[0], [1], [0], [0], [1], [0]],
				[[1, 1, 1, 1, 1], [0, 0, 0, 0, 1], [0, 0, 0, 0, 1], [0, 0, 1, 1, 1], [0, 0, 0, 0, 0], [0, 0, 1, 0, 0]]
			];
			engine.App = {
				value: new Object(),
				source: new Object(),
				manifest: function(a) {
					if (a.name) this.NAME = a.name; this.VERSION = (a.version || "1.0");
					if (a.description) this.DESCRIPTION = a.description; this.DEBUG = (a.debug || false);
					if (a.author) this.AUTHOR = a.author; engine.Preload(engine.Resources(engine.Path(["Source", this.VERSION]), "js" + (this.DEBUG ? engine.Type.QUERY + engine.Random() : EMPTY)).files(["Setup"])).source(function() { if (Setup) Setup (); });
					if (a.hint) engine.Style().text("::placeholder, ::-webkit-input-placeholder, ::-ms-input-placeholder, :-ms-input-placeholder" + "{" + "color" + ":" + a.hint + ";" + "opacity: 1" + ";" + "}");
					if (a.fullscreen) engine.Style().text("* { scrollbar-width: none; -ms-overflow-style; none; } ::-webkit-scrollbar { width: 0px; height: 0px; display: none; }");
					engine.Style().text("html { box-sizing: border-box; width: 100%; height: 100%; } body { position: absolute; display: flex; flex-flow: column; width: 100%; height: 100%; }");
					engine.Style().text("*, ::before, ::after { margin: 0px; padding: 0px; box-sizing: inherit; border: none; border-radius: 0px; outline: none; webkit-touch-callout: none; " +
						"-webkit-tap-highlight-color: transparent; -webkit-appearance: none; user-select: none; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; }");
				},
				navigation: function() {
					var app = this; window.onhashchange = function() { if (app.source[app.get()]) app.source[app.get()] (); };
				},
				title: function(a, b) {
					window.location.hash = engine.Value(0x23) + a; document.title = b;
				},
				get: function() {
					return window.location.hash.replace(/^(\#\!*)+/g, EMPTY);
				},
				back: function() {
					engine.Wait(function() { engine.Back(); }, 0);
				}
			};
			engine.Engine = {
				VERSION: "1.0",
				NAME: "Hyperbox Engine",
				AUTHOR: "Heri Kaniugu",
				DESCRIPTION: "(c) 2020 Hyperbox Engine for Web Application.",
				ICON: VECTOR
			};
			return engine;
		}
		var engine = Engine(); for (var a in engine) if (engine.hasOwnProperty(a)) window[a] = engine[a]; window.onload = function() { engine.Script().create(); };
		window.onorientationchange = window.onresize = function() { if (window.Device.change) window.Device.change(); };
	}) (window);