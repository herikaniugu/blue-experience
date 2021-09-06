
	/**
	 * Hyperbox Bridge 1.0
	 * Written by Heri Kaniugu
	 */

(function(self) {
	function Bridge() {
		var bridge = new Object();
		bridge.Script = function() {
			var script = new Object();
			script.get = function(text) {
				var data = script.data(text), source = script.source(data); return { data: data, source: source };
			};
			script.validate = function(value) {
				return JSON.parse(value.replace(/([{,])(\s*\w+\s*):([\s\S]*?)/g, function(m, p, v, a) { return p + " \"" + script.clear(v) + "\"" + "\:" + a }));
			};
			script.clear = function(value) {
				return (value || new String().toString()).replace(/^\s*([\s\S]*?)\s*$/, function(m, v) { return v; });
			};
			script.splitter = function(splitter) {
				return new RegExp("\\s*" + splitter + "\\s*(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)(?![^\\(\\[\\{]*[\\}\\]\\)])", "g");
			};
			script.lines = function(text, splitter) {
				var line = new String().toString(), left = 0, right = 0, output = [], text = (text ? text : new String().toString()), splitter = (splitter ? splitter : "\n");
				var update = function() { if (script.clear(line)) output.push(script.clear(line).replace(new RegExp("^[" + splitter + "]+", "g"), new String().toString())); line = new String().toString(); return output; };
				for (var i = 0; i < text.length; i++) {
					var value = text[i];
					if (splitter == splitter.split(new String().toString()).map(function(value, index) { return text[i + index]; }).join(new String().toString())) {
						if (left === right) { update(); left = 0; right = 0; } else { line += value; }
					} else if (["(", "[", "{"].indexOf(value) >= 0 || ["/#"].indexOf(value + text[i + 1]) >= 0) {
						left++; line += value;
					} else if ([")", "]", "}"].indexOf(value) >= 0 || ["#/"].indexOf(text[i - 1] + value) >= 0) {
						right++; line += value;
					} else {
						line += value;
					}
				}
				return update();
			};
			script.data = function(input) {
				return script.parse(script.lines(input));
			};
			script.statements = function(value) {
				return script.parse(script.lines(value));
			};
			script.parameters = function(value) {
				return value.split(/\s?[\,\;]\s?/).map(function(v) { return script.clear(v); });
			};
			script.arguments = function(value) {
				return value.split(script.splitter("\\,")).map(function(v) { return script.clear(v); });
			};
			script.operator = function(value) {
				var output = new Object({ type: "unknown" });
				if (value.match(script.splitter("\\|\\|"))) output = { type: "or", value: value.split(script.splitter("\\|\\|")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\&\\&"))) output = { type: "and", value: value.split(script.splitter("\\&\\&")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\=\\="))) output = { type: "equal", value: value.split(script.splitter("\\=\\=")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\!\\="))) output = { type: "not", value: value.split(script.splitter("\\!\\=")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\>\\="))) output = { type: "greater_equal", value: value.split(script.splitter("\\>\\=")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\<\\="))) output = { type: "less_equal", value: value.split(script.splitter("\\<\\=")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\+\\+"))) output = { type: "increment", value: value.split(script.splitter("\\+\\+")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\-\\-"))) output = { type: "decrement", value: value.split(script.splitter("\\-\\-")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\*\\*"))) output = { type: "exponent", value: value.split(script.splitter("\\*\\*")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\>"))) output = { type: "greater", value: value.split(script.splitter("\\>")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\<"))) output = { type: "less", value: value.split(script.splitter("\\<")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\%"))) output = { type: "modulus", value: value.split(script.splitter("\\%")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\/"))) output = { type: "divide", value: value.split(script.splitter("\\/")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\*"))) output = { type: "multiply", value: value.split(script.splitter("\\*")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\+"))) output = { type: "addition", value: value.split(script.splitter("\\+")).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("\\-"))) output = { type: "minus", value: value.split(script.splitter("\\-")).map(function(v) { return script.expression(v); }) };
				return output;
			};
			script.expression = function(value) {
				var type = { none: /^()$/, empty: /^(empty)$/, unknown: /^(unknown)$/, boolean: /^(true|false)$/, number: /^(\d*\.*\d+|0x[\d\w]+)$/, string: /^\"([\s\S]*?)\"$/, array: /^(\[[\s\S]*?\])$/, object: /^(\{[\s\S]*?\})$/, item: /^(\w+\:\w+.*)/, function: /^\(([\s\S]*?)\)\:\{([\s\S]*?)\}$/ };
				if (value.match(type.none)) return { type: "none" };
					else if (value.match(type.empty)) return { type: "empty", value: null };
					else if (value.match(type.unknown)) return { type: "unknown", value: undefined };
					else if (value.match(type.boolean)) return { type: "boolean", value: (value === "true") };
					else if (value.match(type.number)) return { type: "number", value: Number(value) };
					else if (value.match(type.string)) return { type: "string", value: value.replace(type.string, function(m, v) { return v; }) };
					else if (value.match(type.array)) return { type: "array", value: value.replace(type.array, function(m, v) { return v; }) };
					else if (value.match(type.object)) return { type: "object", value: value.replace(type.object, function(m, v, p) { return v; }) };
					else if (value.match(type.function)) return { type: "function", parameters: script.parameters(value.replace(type.function, function(m, v) { return v; })),
						value: script.statements(value.replace(type.function, function(m, p, v) { return v; })) };
					else if (value.match(script.splitter("\\,"))) return { type: "arguments", value: script.arguments(value).map(function(v) { return script.expression(v); }) };
					else if (value.match(script.splitter("(?:\\||\\&|\\=|\\!|\\<|\\>|\\%|\\+|\\-|\\*|\\/)"))) return { type: "operator", value: script.operator(value) };
					// else if (value.match(script.splitter("(?<!\\w+\\s*\\:*)(?:\\(([\\s\\S]*?)\\))"))) return { type: "parentheses", value: script.expression(value.replace(script.splitter("(?<!\\w+\\s*\\:*)(?:\\(([\\s\\S]*?)\\))"), function(m, v) { return v; })) };
					else if (value) return { type: "item", value: script.parse([value]).reduce(function(v) { return v; }) };
			};
			script.item = function(value) {
				var output = new Object({ type: "unknown", value: undefined });
				var type = { keyword: /^(\w+)$/, invocation: /^(\w+)\(([\s\S]*?)\)$/, notation: /^(\w+)\[([\s\S]*?)\]$/, expression: /^\(([\s\S]*?)\)$/, statements: /^\{([\s\S]*?)\}$/ };
				if (value.match(type.keyword)) output = { type: "keyword", value: value };
					else if (value.match(type.invocation)) output = { type: "invocation", name: value.replace(type.invocation, function(m, v) { return v; }),
						value: script.expression(value.replace(type.invocation, function(m, p, v) { return v; })) };
					else if (value.match(type.notation)) output = { type: "notation", name: value.replace(type.notation, function(m, v) { return v; }),
						value: script.expression(value.replace(type.notation, function(m, p, v) { return v; })) };
					else if (value.match(type.statements)) output = { type: "statements", value: script.statements(value.replace(type.statements, function(m, v) { return v; })) };
					else if (value.match(type.expression)) output = script.expression(value.replace(type.expression, function(m, v) { return v; }));
				return output;
			};
			script.parse = function(lines) {
				var output = new Array();
				for (var i = 0; i < lines.length; i++) {
					var line = script.clear(lines[i]);
					if (line.match(/^\@([\s\S]*?)$/)) output.push([{ type: "remark", value: line.replace(/^\@\s*([\s\S]*?)\s*$/, function(input, value) { return value; }) }]); 
						else if (line.match(/^\/\#([\s\S]*?)\#\/$/)) output.push([{ type: "ignore", value: line.replace(/^\/\#\s*([\s\S]*?)\s*\#\/$/, function(input, value) { return value; }) }]); 
							else output.push(script.lines(line, "\:").map(function(value, index) { return script.item(value, index); }));
				}
				return output;
			};
			script.source = function(data) {
				var output = new Array();
				var validator = function(a) { return a ? a : (a === 0 ? 0 : NUL); };
				var navigator = function(a, b) { return a + (a && b ? LUX + MIN + LUX : (a ? LUX + MIN : MIN)) + b; };
				var operator = function(value, tab) {
					if (value.type == "or") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + OXR + OXR + LUX);
						else if (value.type == "and") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + AND + AND + LUX);
						else if (value.type == "equal") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + EQL + EQL + LUX);
						else if (value.type == "not") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + NOT + EQL + LUX);
						else if (value.type == "greater") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + EAB + LUX);
						else if (value.type == "less") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + OAB + LUX);
						else if (value.type == "greater_equal") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + EAB + EQL + LUX);
						else if (value.type == "less_equal") return value.value.map(function(v) { return expression(v, tab); }).join(LUX + OAB + EQL + LUX);
						else if (value.type == "exponent") return value.value.map(function(v) { return expression(v, tab); }).join(MUL + MUL);
						else if (value.type == "increment") return value.value.map(function(v) { return expression(v, tab); }).join(ADD + ADD);
						else if (value.type == "decrement") return value.value.map(function(v) { return expression(v, tab); }).join(MIN + MIN);
						else if (value.type == "modulus") return value.value.map(function(v) { return validator(expression(v, tab)); }).join(LUX + MOD + LUX);
						else if (value.type == "addition") return value.value.map(function(v) { return validator(expression(v, tab)); }).join(LUX + ADD + LUX);
						else if (value.type == "multiply") return value.value.map(function(v) { return validator(expression(v, tab)); }).join(LUX + MUL + LUX);
						else if (value.type == "divide") return value.value.map(function(v) { return validator(expression(v, tab)); }).join(LUX + DIV + LUX);
						else if (value.type == "minus") return value.value.reduce(function(m, v) { return navigator(validator(expression(m, tab)), validator(expression(v, tab))); });
					return expression(value, tab);
				};
				var expression = function(value, tab) {
					if (value != undefined) if (value.type == "none") return NUL;
						else if (value.type == "empty") return new String(value.value).toString();
						else if (value.type == "unknown") return new String(value.value).toString();
						else if (value.type == "boolean") return value.value;
						else if (value.type == "number") return value.value;
						else if (value.type == "string") return STR + value.value + STR;
						else if (value.type == "array") return value.value;
						else if (value.type == "object") return value.value;
						else if (value.type == "notation") return value.name + OQB + validator(expression(value.value, tab)) + EQB;
						else if (value.type == "invocation") { return value.name + ORB + validator(expression(value.value, tab)) + ERB; }
						else if (value.type == "statements") return value.value.map(function(v) { return item(v, tab); }).join(BRK);
						else if (value.type == "arguments") return value.value.map(function(v) { return expression(v, tab); }).join(ARG + LUX);
						else if (value.type == "parentheses") return ORB + expression(value.value, tab) + ERB;
						else if (value.type == "operator") return operator(value.value, tab);
						else if (value.type == "item") return script.clear(item(value.value, tab));
						else if (value.type == "keyword") return value.value;
						else if (value.type == "function")  return FUN + ORB + value.parameters.join(ARG + LUX) + 
							ERB + LUX + OUB + BRK + value.value.map(function(v) { return item(v, tab); }).join(BRK) + BRK + Array(tab).join(TAB) + EUB;
						else return value;
				};
				var item = function(value, tab) {
					var keyword = new Object(), variable = new Object(), array = new Array(), size = value.length, stack = value[size - 1], source = NUL, tab = tab || 0; tab += 1;
					for (var index = 0; index < value.length; index++) {
						var token = value[index];
						var type = ["none", "empty", "unknown", "boolean", "number", "string", "array", "object", "item", "function", "arguments", "operator"];
						if (index == 0) keyword = token;
						if (keyword.type == "remark") {
							source = DIV + DIV + LUX + keyword.value;
						} else if (keyword.type == "ignore") {
							source = DIV + MUL + BRK + keyword.value + BRK + MUL + DIV;
						} else if (keyword.type == "keyword") {
							if (keyword.value == "return") {
								if (index == 1) source = "return" + LUX + expression(token) + EOL;
							} else if (keyword.value == "new") {
								if (index == 1) variable = token;
								if (index > 0) array.push(expression(token, tab)); source = "new" + LUX + array.join(DOT);
							} else if (keyword.value == "debug") {
								if (index == 1) variable = token;
								if (variable.type == "invocation" && variable.name == "log") source = DBR + DOT + LGR + ORB + expression(variable.value, tab) + ERB + EOL;
								if (variable.type == "invocation" && variable.name == "native") source = expression(variable.value.value, tab);
							} else if (keyword.value == "set") {
								if (index == 1) variable = token;
								if (["keyword", "notation"].indexOf(variable.type) >= 0 && type.indexOf(token.type) >= 0) source = VAR + LUX + variable.value + ( token.type == "none" ? NUL : LUX + EQL + LUX + expression(token, tab) ) + EOL;
							} else if (keyword.value == "get") {
								if (index == 1) variable = token;
								if (index > 0) if (["keyword", "invocation", "notation"].indexOf(token.type) >= 0) array.push(expression(token, tab)); source = array.join(DOT);
								if (index > 0) if (["keyword", "invocation", "notation"].indexOf(stack.type) < 0) source += LUX + EQL + LUX + expression(stack, tab) + EOL;
							} else if (keyword.value == "do") {
								if (index == 1) variable = token;
								if (variable.type == "invocation") {
									if (variable.name == "case") {
										if (token.type == "keyword" && token.value == "default") array.push(LUX + ELS + LUX);
										if (token.type == "invocation" && token.name == "case") array.push((index > 1 ? LUX + ELS + LUX : NUL) + IXF + LUX + ORB + expression(token.value, tab) + ERB + LUX);
										if (token.type == "statements") array.push(OUB + BRK + expression(token, tab) + BRK + Array(tab).join(TAB) + EUB); source = array.join(NUL);
									} else if (variable.name == "foreach" && token.type == "function") {
										source = expression(variable.value, tab) + DOT + FEA + ORB + expression(token, tab) + ERB + EOL;
									} else if (variable.name == "for" && token.type == "statements") {
										var statements = variable.value.value.map(function(v) { return expression(v, tab); }).join(EOL).split(EOL).filter(function(v) { return v; }).join(EOL + LUX);
										source = FOR + LUX + ORB + statements + ERB + LUX + OUB + BRK + token.value.map(function(v) { return item(v, tab); }).join(BRK) + BRK + Array(tab).join(TAB) + EUB;
									}
								}
							}
						} else return expression(token, tab);
					}
					return Array(tab).join(TAB) + source;
				};
				var LUX = "\x20", STR = "\x22", ORB = "\x28", ERB = "\x29", ARG = "\x2C", EOL = "\x3B", EQL = "\x3D", NUL = new String().toString();
				var VAR = "\x76\x61\x72", LGR = "\x6C\x6F\x67", DBR = "\x63\x6F\x6E\x73\x6F\x6C\x65", FUN = "\x66\x75\x6E\x63\x74\x69\x6F\x6E", FOR = "\x66\x6F\x72", FEA = "\x66\x6F\x72\x45\x61\x63\x68", ELS = "\x65\x6C\x73\x65", IXF = "\x69\x66";
				var TAB = "\x09", BRK = "\x0A", NOT = "\x21", MOD = "\x25", AND = "\x26", MUL = "\x2A", ADD = "\x2B", MIN = "\x2D", DOT = "\x2E", DIV = "\x2F", OAB = "\x3C", EAB = "\x3E", OQB = "\x5B", EQB = "\x5D", OUB = "\x7B", OXR = "\x7C", EUB = "\x7D";
				for (var i = 0; i < data.length; i++) output.push(item(data[i])); return script.clear(output.join("\n"));
			};
			return script;
		};
		bridge.Bridge = {
			VERSION: "1.0",
			NAME: "Hyperbox Bridge",
			AUTHOR: "Heri Kaniugu",
			DESCRIPTION: "(c) 2020 Hyperbox Bridge for Web Application."
		};
		return bridge;
	}
	var bridge = Bridge();
	self.addEventListener("message", function(event) {
		var data = event.data;
		if (data.source) self.postMessage(bridge.Script().get(data.source));
			else if (data.data) self.postMessage(bridge.Script().source(data.data));
			else if (data.bridge) self.postMessage(bridge.Bridge);
	}, false);
}) (self);