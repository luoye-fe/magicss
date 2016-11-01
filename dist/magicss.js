/*
 * Magicss v1.0.0
 * (c) 2016 luoye <842891024@qq.com>
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Magicss = factory());
}(this, (function () { 'use strict';

// speed:2;delay:100; -> ['speed:2','delay:100']
// speed:2; -> ['speed','2']
var split = function split(str, tab) {
	tab = tab || '';
	var _curr = str.split(tab);
	var result = [];
	_curr.forEach(function (item) {
		if (item !== '') {
			result.push(item);
		}
	});
	return result;
};

var delay = function delay(ms) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			resolve();
		}, parseInt(ms));
	});
};

var copyObj = function copyObj(obj) {
	return JSON.parse(JSON.stringify(obj));
};

var noopPromise = function noopPromise() {
	return new Promise(function (resolve, reject) {
		resolve();
	});
};

/**
 * [format css to Array]
 * @description 格式化 css 文本，支持注释参数或者规则参数
 * @param  {[String]} source [css source text]
 * @return {[Array]}        [array]
 * @css example
	\/*
	 * {{delay:2000}}
	 * 彩蛋时间到！
	 *\/
	html,body{
		// speed: 200
	    background: #2d2d2d;
	}

 * @return example [/ -> \/]
	[{
		type: 'comment',
		comment: '\/* \n * \n * 彩蛋时间到！\n *\/',
		options: { delay: '2000' }
	}, {
		type: 'common',
		selector: 'html,body',
		options: { speed: 200 },
		style: { background: '#2d2d2d' }
	}]
 */
function format$1(source) {
	var sweetResult = [];
	source = source || '';
	source = source.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

	var pos = -1;
	var ch = void 0;

	var Regx = {};
	Regx.comment = /\/\*[\s\S]+?\*\/|\/\/.+?\n/; // 注释
	Regx.commentFlag = /\/\/|\/\*|\*\//g; // 注释 flag
	Regx.ruleOptionInComment = /\{\{(.+?)\}\}/; // 注释中的参数 {{ ... }}
	Regx.bothWhiteSpace = /^\s+|\s+$/; // 前后空格
	Regx.whiteSpace = /\s/g; // 空格
	Regx.selector = /([\s\S]+?)\{/; // 选择器
	Regx.allRules = /(\{[\s\S]+?\})/; // css 规则

	/*
 	// get all html element list from MDN
 	// https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 	var test = [...$('#quick-links > ol > li.toggleable.current > ol li a')]
 	var ch = '[';
 	test.forEach((item) => {ch = ch + "'" + $(item).html().replace(/\&lt\;/g, '').replace(/\&gt\;/g, '') + "', "})
 	ch += ']'
  */

	var allHtmlElement = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];
	var allCssSelector = ['*', '.', '#', '[', ':'];
	var allSelectorFirstCh = [];
	allSelectorFirstCh = [].concat(allCssSelector);
	// get all html element list first character
	allHtmlElement.forEach(function (item) {
		var firstCh = item.substr(0, 1);
		if (!allSelectorFirstCh.includes(firstCh)) {
			allSelectorFirstCh.push(firstCh);
		}
	});

	// 获取当前位置字符
	function next(length) {
		pos = length ? pos + length : ++pos;
		ch = source.charAt(pos);
		return ch || '';
	}

	// 获取当前位置的下一个字符
	function nnext() {
		return source.charAt(pos + 1) || '';
	}

	// 处理注释
	function handleComment() {
		var prePos = pos;
		var _source = source.substr(pos);
		var commentStr = _source.match(Regx.comment)[0]; // 匹配 chunkComment 和 lineComment
		next(commentStr.length);
		while (/\s|\n/.test(ch)) {
			commentStr += ch;
			next();
		}
		// pos = prePos;
		var resultOptions = {};
		if (Regx.ruleOptionInComment.test(commentStr)) {
			var optionsStr = commentStr.match(Regx.ruleOptionInComment)[1];
			resultOptions = splitSameStyleStr(optionsStr);
		}
		sweetResult.push({
			type: 'comment',
			comment: commentStr.replace(Regx.ruleOptionInComment, ''),
			options: resultOptions
		});
	}

	// 处理选择器
	function handleSelector() {
		var _source = source.substr(pos);
		var selectorStr = _source.match(Regx.selector)[1];
		next(selectorStr.length);
		var resultObj = handleAllRules();
		sweetResult.push({
			type: 'common',
			selector: selectorStr.replace(Regx.bothWhiteSpace, ''), // 去掉选择器前后空格
			options: resultObj.options,
			style: resultObj.style
		});
	}

	// 处理样式
	function handleAllRules() {
		var _source = source.substr(pos);
		var allRulesStr = _source.match(Regx.allRules)[1];
		var resultOptions = {};
		var resultStyle = {};
		next(allRulesStr.length);
		if (Regx.comment.test(allRulesStr)) {
			var optionsStr = allRulesStr.match(Regx.comment)[0].replace(Regx.whiteSpace, '').replace(Regx.commentFlag, '').replace(/\n/g, '');
			resultOptions = splitSameStyleStr(optionsStr);
		}
		var styleStr = allRulesStr.replace(Regx.comment, '').replace(/\n/g, '').replace(/\{|\}/g, '');
		resultStyle = splitSameStyleStr(styleStr);
		return {
			options: resultOptions,
			style: resultStyle
		};
	}

	// split "a:1;b:2" -> {a: 1, b: 2}
	function splitSameStyleStr(str) {
		var result = {};
		var _cur1 = split(str, ';');
		_cur1.forEach(function (item) {
			var _cur2 = split(item, ':');
			result[_cur2[0].replace(Regx.bothWhiteSpace, '')] = _cur2[1].replace(Regx.bothWhiteSpace, '');
		});
		return result;
	}

	next();
	while (true) {
		if (!ch) {
			break;
		} else if (ch === '/' && (nnext() === '*' || nnext() === '/')) {
			// comment
			handleComment();
		} else if (allSelectorFirstCh.includes(ch)) {
			// selector
			handleSelector();
		} else {
			next();
		}
	}

	return sweetResult;
}

function $(selector) {
	return document.querySelector(selector);
}

function createElement(tag, attrs, content) {
	var el = document.createElement(tag);
	var i = void 0;
	for (i in attrs) {
		if (attrs.hasOwnProperty(i)) {
			el.setAttribute(i, attrs[i]);
		}
	}
	if (content) {
		html(el, content);
	}
	return el;
}

function append(parent) {
	for (var _len = arguments.length, eles = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		eles[_key - 1] = arguments[_key];
	}

	eles.forEach(function (ele) {
		parent.appendChild(ele);
	});
}

function html(eles, html) {
	_put(html, 0, eles);
}

function _put(string, type) {
	for (var _len2 = arguments.length, eles = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		eles[_key2 - 2] = arguments[_key2];
	}

	eles.forEach(function (ele) {
		if (type) {
			if (typeof ele.textContent === 'string') {
				ele.textContent = string;
			} else {
				ele.innerText = string;
			}
		} else {
			ele.innerHTML = string;
		}
	});
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultPrintOptions = {
	speed: 50, // ms/每字符
	delay: 0
};

var Magicss = function () {
	function Magicss(options) {
		_classCallCheck(this, Magicss);

		this.options = options || {};
		this.source = options.source || '';
		this._codeCon = options.codeCon || false;
		this._paused = false; // 打印状态
		this._formatedArray = [];
		this._index = 0;
		this.format();
	}

	_createClass(Magicss, [{
		key: '_assignPrintOption',
		value: function _assignPrintOption(options) {
			return Object.assign(copyObj(defaultPrintOptions), options);
		}
	}, {
		key: '_handlerComment',
		value: function _handlerComment(current, cb) {
			var _this = this;

			var options = this._assignPrintOption(current.options);
			noopPromise().then(function () {
				return delay(options.delay);
			}).then(function () {
				return _this._print(current);
			}).then(function () {
				cb();
			});
		}
	}, {
		key: '_handlerCommon',
		value: function _handlerCommon(current, cb) {
			var _this2 = this;

			var options = this._assignPrintOption(current.options);
			noopPromise().then(function () {
				return delay(options.delay);
			}).then(function () {
				return _this2._print(current);
			}).then(function () {
				cb();
			});
		}

		// apply style

	}, {
		key: '_applyStyle',
		value: function _applyStyle(selector, styleKey, styleValue) {
			if (!$('#Magicss-style-con')) {
				append($('head'), createElement('style', {
					id: 'Magicss-style-con'
				}));
			}
			var styleCon = $('#Magicss-style-con');
			var styleConHTML = styleCon.innerHTML;
			html(styleCon, styleConHTML += selector + '{' + styleKey + ':' + styleValue + '}');
		}

		// insert element

	}, {
		key: '_insertElement',
		value: function _insertElement(className) {
			var ele = createElement('span', {
				class: className
			});
			append($(this._codeCon), ele);
			return ele;
		}

		// print source text in ele

	}, {
		key: '_print',
		value: function _print(current, ele) {
			var _this3 = this;

			return new Promise(function (resolve, reject) {
				if (current.type === 'comment') {
					noopPromise().then(function () {
						var contentArr = split(current.comment, '');
						var ele = _this3._insertElement('comment');
						var options = _this3._assignPrintOption(current.options);
						return _this3._writeCharacterArrToEle(ele, contentArr, options.speed);
					}).then(function () {
						resolve();
					});
				} else if (current.type === 'common') {
					(function () {
						var options = _this3._assignPrintOption(current.options);
						noopPromise().then(function () {
							var contentArr = split(current.selector, '');
							var ele = _this3._insertElement('selector');
							return _this3._writeCharacterArrToEle(ele, contentArr, options.speed);
						}).then(function () {
							var contentArr = [' ', '{', '\n'];
							var ele = $(_this3._codeCon);
							return _this3._writeCharacterArrToEle(ele, contentArr, options.speed);
						}).then(function () {
							var promises = [];
							var ruleKeys = Object.keys(current.style);
							var index = 0;
							return new Promise(function (resolve, reject) {
								var iterateRule = function iterateRule() {
									if (index >= ruleKeys.length) {
										resolve();
										return;
									}
									var codeCon = $(_this3._codeCon);
									_this3._writeCharacterArrToEle(codeCon, [' ', ' ', ' ', ' '], options.speed).then(function () {
										var contentArr = split(ruleKeys[index], '');
										var ele = _this3._insertElement('key');
										return _this3._writeCharacterArrToEle(ele, contentArr, options.speed);
									}).then(function () {
										return _this3._writeCharacterArrToEle(codeCon, [':', ' '], options.speed);
									}).then(function () {
										var contentArr = split(current.style[ruleKeys[index]], '');
										var ele = _this3._insertElement('value');
										return _this3._writeCharacterArrToEle(ele, contentArr, options.speed);
									}).then(function () {
										_this3._applyStyle(current.selector, ruleKeys[index], current.style[ruleKeys[index]]);
										return _this3._writeCharacterArrToEle(codeCon, [';', '\n'], options.speed);
									}).then(function () {
										index++;
										iterateRule();
									});
								};
								iterateRule();
							});
						}).then(function () {
							var contentArr = ['}', '\n\n'];
							var ele = $(_this3._codeCon);
							return _this3._writeCharacterArrToEle(ele, contentArr, options.speed);
						}).then(function () {
							resolve();
						});
					})();
				}
			});
		}
	}, {
		key: '_writeCharacterArrToEle',
		value: function _writeCharacterArrToEle(ele, contentArr, speedMs) {
			var _this4 = this;

			return new Promise(function (resolve, reject) {
				var innserLoop = function innserLoop(ele, contentArr, speedMs) {
					_this4._fixScrollTop();
					if (!contentArr.length) {
						resolve();
						return;
					}
					var currentHTML = ele.innerHTML;
					noopPromise().then(function () {
						return delay(speedMs);
					}).then(function () {
						if (!_this4._paused) {
							html(ele, currentHTML += contentArr[0]);
							contentArr.splice(0, 1);
							innserLoop(ele, contentArr, speedMs);
						} else {
							innserLoop(ele, contentArr, speedMs);
						}
					});
				};
				innserLoop(ele, contentArr, speedMs);
			});
		}
	}, {
		key: '_handlerNoCodeCon',
		value: function _handlerNoCodeCon(cb) {
			var _this5 = this;

			return new Promise(function (resolve, reject) {
				if ($(_this5.codeCod)) {
					resolve();
				} else {
					reject();
				}
			});
		}

		// fix con scroll top

	}, {
		key: '_fixScrollTop',
		value: function _fixScrollTop() {
			var codeCon = $(this._codeCon);
			codeCon.scrollTop = codeCon.scrollHeight;
		}

		// init

	}, {
		key: 'init',
		value: function init() {
			var _this6 = this;

			var codeCon = $(this._codeCon);
			if (!codeCon) {
				console.warn('You should give a real element to options of "codeCon".');
				return;
			}

			if (this._index >= this._formatedArray.length) {
				return;
			}

			var _current = this._formatedArray[this._index];
			if (_current.type === 'comment') {
				this._handlerComment(_current, function () {
					_this6._index++;
					_this6.init();
				});
			} else if (_current.type === 'common') {
				this._handlerCommon(_current, function () {
					_this6._index++;
					_this6.init();
				});
			}
		}

		// format css to obj

	}, {
		key: 'format',
		value: function format() {
			this._formatedArray = format$1(this.source);
			return this._formatedArray;
		}

		// change source text

	}, {
		key: 'setOptions',
		value: function setOptions(options) {
			this.constructor(options);
			this.init();
		}

		// pause _print

	}, {
		key: 'pause',
		value: function pause() {
			this._paused = true;
		}

		// continue _print

	}, {
		key: 'continue',
		value: function _continue() {
			this._paused = false;
		}

		// toggle _print

	}, {
		key: 'toggle',
		value: function toggle() {
			this._paused = !this._paused;
		}
	}]);

	return Magicss;
}();

return Magicss;

})));
