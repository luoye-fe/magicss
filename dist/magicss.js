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

function format(source) {
	var sweetResult = [];
	source = source || '';

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
		var _source = source.substr(pos);
		var commentStr = _source.match(Regx.comment)[0]; // 匹配 chunkComment 和 lineComment
		next(commentStr.length);
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

	while (true) {
		next();
		if (!ch) {
			break;
		} else if (ch === '/' && (nnext() === '*' || nnext() === '/')) {
			// comment
			handleComment();
		} else if (allSelectorFirstCh.includes(ch)) {
			// selector
			handleSelector();
		}
	}

	return sweetResult;
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Magicss = function () {
	function Magicss(source) {
		var _this = this;

		_classCallCheck(this, Magicss);

		this.source = source;
		this.paused = false; // 打印状态
		this.printOptions = {
			speed: 20, // ms/每字符
			delay: 2000
		};
		this.format = function () {
			return format(_this.source);
		};
	}
	// print source text in content


	_createClass(Magicss, [{
		key: 'print',
		value: function print(content) {}
		// pause print

	}, {
		key: 'pause',
		value: function pause() {}
		// continue print

	}, {
		key: 'continue',
		value: function _continue() {}
		// toggle print

	}, {
		key: 'toggle',
		value: function toggle() {}
	}]);

	return Magicss;
}();

return Magicss;

})));
//# sourceMappingURL=magicss.js.map
