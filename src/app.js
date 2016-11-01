import format from './format-css.js';

import { createElement, append, html, text, $ } from './dom.js';

import { delay, copyObj, noopPromise, split } from './utils.js';

export default class Magicss {
	constructor(options) {
		this.options = options || {};
		this.source = options.source || '';
		this.codeCon = options.codeCon || false;
		this.paused = false; // 打印状态
		this.defaultPrintOptions = {
			speed: 50, // ms/每字符
			delay: 0
		};
		this.formatedArray = [];
		this.format();
		this.index = 0;
	}

	// init
	init() {
		if (this.index >= this.formatedArray.length) {
			return;
		}
		const _current = this.formatedArray[this.index];
		if (_current.type === 'comment') {
			this.handlerComment(_current, () => {
				this.index++;
				this.init();
			});
		} else if (_current.type === 'common') {
			this.handlerCommon(_current, () => {
				this.index++;
				this.init();
			});
		}
	}

	assignPrintOption(options) {
		return Object.assign(copyObj(this.defaultPrintOptions), options);
	}

	handlerComment(current, cb) {
		let options = this.assignPrintOption(current.options);
		noopPromise()
			.then(() => {
				return delay(options.delay);
			})
			.then(() => {
				if (this.codeCon) {
					return this.print(current);
				}
			}).then(() => {
				cb();
			});
	}

	handlerCommon(current, cb) {
		let options = this.assignPrintOption(current.options);
		noopPromise()
			.then(() => {
				return delay(options.delay);
			})
			.then(() => {
				if (this.codeCon) {
					return this.print(current);
				}
			}).then(() => {
				cb();
			});
	}

	// format css to obj
	format() {
		this.formatedArray = format(this.source);
		return this.formatedArray;
	}

	// change source text
	setOptions(options) {
		this.constructor(options);
		this.init();
	}

	// apply style
	applyStyle(selector, styleKey, styleValue) {
		if (!$('#Magicss-style-con')) {
			append($('head'), createElement('style', {
				id: 'Magicss-style-con'
			}));
		}
		let styleCon = $('#Magicss-style-con');
		let styleConHTML = styleCon.innerHTML;
		html(styleCon, styleConHTML += `${selector}{${styleKey}:${styleValue}}`);
	}

	// insert element
	insertElement(className) {
		let ele = createElement('span', {
			class: className
		});
		append($(this.codeCon), ele);
		return ele;
	}

	// print source text in ele
	print(current, ele) {
		let codeCon = $(this.codeCon);
		if (!codeCon) {
			console.warn('Please give a real element to options of "codeCon".');
			return;
		}
		return new Promise((resolve, reject) => {
			if (current.type === 'comment') {
				let contentArr = split(current.comment, '');
				let ele = this.insertElement('comment');
				let options = this.assignPrintOption(current.options);
				this.writeCharacterArrToEle(ele, contentArr, options.speed)
					.then(() => {
						resolve();
					});
			} else if (current.type === 'common') {
				let options = this.assignPrintOption(current.options);
				noopPromise()
					.then(() => {
						let contentArr = split(current.selector, '');
						let ele = this.insertElement('selector');
						return this.writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						let contentArr = [' ', '{', '\n'];
						let ele = $(this.codeCon);
						return this.writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						let promises = [];
						const ruleKeys = Object.keys(current.style);
						let index = 0;
						return new Promise((resolve, reject) => {
							const iterateRule = () => {
								if (index >= ruleKeys.length) {
									resolve();
									return;
								}
								let codeCon = $(this.codeCon);
								this.writeCharacterArrToEle(codeCon, [' ', ' ', ' ', ' '], options.speed)
									.then(() => {
										let contentArr = split(ruleKeys[index], '');
										let ele = this.insertElement('key');
										return this.writeCharacterArrToEle(ele, contentArr, options.speed);
									})
									.then(() => {
										return this.writeCharacterArrToEle(codeCon, [':', ' '], options.speed);
									})
									.then(() => {
										let contentArr = split(current.style[ruleKeys[index]], '');
										let ele = this.insertElement('value');
										return this.writeCharacterArrToEle(ele, contentArr, options.speed);
									})
									.then(() => {
										this.applyStyle(current.selector, ruleKeys[index], current.style[ruleKeys[index]]);
										return this.writeCharacterArrToEle(codeCon, [';', '\n'], options.speed);
									})
									.then(() => {
										index++;
										iterateRule();
									});
							};
							iterateRule();
						});
					})
					.then(() => {
						let contentArr = ['}', '\n\n'];
						let ele = $(this.codeCon);
						return this.writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						resolve();
					});
			}
		});
	}

	writeCharacterArrToEle(ele, contentArr, speedMs) {
		return new Promise((resolve, reject) => {
			const innserLoop = (ele, contentArr, speedMs) => {
				this.fixScrollTop();
				if (!contentArr.length) {
					resolve();
					return;
				}
				let currentHTML = ele.innerHTML;
				noopPromise()
					.then(() => {
						return delay(speedMs);
					})
					.then(() => {
						if (!this.paused) {
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

	// pause print
	pause() {
		this.paused = true;
	}

	// continue print
	continue () {
		this.paused = false;
	}

	// toggle print
	toggle() {
		this.paused = !this.paused;
	}

	// fix con scroll top
	fixScrollTop() {
		let codeCon = $(this.codeCon);
		codeCon.scrollTop = codeCon.scrollHeight;
	}
};
