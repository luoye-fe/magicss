import { split } from './utils.js';

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
function format(source) {
	let sweetResult = [];
	source = source || '';
	source = source.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

	let pos = -1;
	let ch;

	let Regx = {};
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

	let allHtmlElement = ['a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'bgsound', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'isindex', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'listing', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'plaintext', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', 'xmp'];
	let allCssSelector = ['*', '.', '#', '[', ':'];
	let allSelectorFirstCh = [];
	allSelectorFirstCh = [...allCssSelector];
	// get all html element list first character
	allHtmlElement.forEach((item) => {
		let firstCh = item.substr(0, 1);
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
		let prePos = pos;
		let _source = source.substr(pos);
		let commentStr = _source.match(Regx.comment)[0]; // 匹配 chunkComment 和 lineComment
		next(commentStr.length);
		while (/\s|\n/.test(ch)) {
			commentStr += ch;
			next();
		}
		// pos = prePos;
		let resultOptions = {};
		if (Regx.ruleOptionInComment.test(commentStr)) {
			let optionsStr = commentStr.match(Regx.ruleOptionInComment)[1];
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
		let _source = source.substr(pos);
		let selectorStr = _source.match(Regx.selector)[1];
		next(selectorStr.length);
		let resultObj = handleAllRules();
		sweetResult.push({
			type: 'common',
			selector: selectorStr.replace(Regx.bothWhiteSpace, ''), // 去掉选择器前后空格
			options: resultObj.options,
			style: resultObj.style
		});
	}

	// 处理样式
	function handleAllRules() {
		let _source = source.substr(pos);
		let allRulesStr = _source.match(Regx.allRules)[1];
		let resultOptions = {};
		let resultStyle = {};
		next(allRulesStr.length);
		if (Regx.comment.test(allRulesStr)) {
			let optionsStr = allRulesStr.match(Regx.comment)[0].replace(Regx.whiteSpace, '').replace(Regx.commentFlag, '').replace(/\n/g, '');
			resultOptions = splitSameStyleStr(optionsStr);
		}
		let styleStr = allRulesStr.replace(Regx.comment, '').replace(/\n/g, '').replace(/\{|\}/g, '');
		resultStyle = splitSameStyleStr(styleStr);
		return {
			options: resultOptions,
			style: resultStyle
		};
	}

	// split "a:1;b:2" -> {a: 1, b: 2}
	function splitSameStyleStr(str) {
		let result = {};
		let _cur1 = split(str, ';');
		_cur1.forEach((item) => {
			let _cur2 = split(item, ':');
			result[_cur2[0].replace(Regx.bothWhiteSpace, '')] = _cur2[1].replace(Regx.bothWhiteSpace, '');
		});
		return result;
	}

	next();
	while (true) {
		if (!ch) {
			break;
		} else if (ch === '/' && (nnext() === '*' || nnext() === '/')) { // comment
			handleComment();
		} else if (allSelectorFirstCh.includes(ch)) { // selector
			handleSelector();
		} else {
			next();
		}
	}

	return sweetResult;
};

export default format;
