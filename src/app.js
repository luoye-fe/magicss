import format from './format-css.js';
import Event from './event.js';

import { createElement, append, html, $ } from './dom.js';

import { delay, copyObj, noopPromise, split, objType } from './utils.js';

const defaultPrintOptions = {
	speed: 50, // ms/每字符
	delay: 0
};

const event = new Event();

export default class Magicss {
	constructor(options) {
		this.options = options || {};
		this.source = this.options.source || '';
		this.codeCon = this.options.codeCon || false;
		this._paused = false; // 暂停与否
		this._status = 'nope'; // nope -> start -> processing -> stop -> nope -> ...
		this._block = false;
		this._formatedArray = [];
		this._index = 0;
		this.format();
	}

	_assignPrintOption(options) {
		return Object.assign(copyObj(defaultPrintOptions), options);
	}

	_handler(current) {
		return new Promise((resolve, reject) => {
			if (this._status === 'nope') {
				resolve();
			}
			let options = this._assignPrintOption(current.options);
			noopPromise()
				.then(() => {
					return delay(options.delay);
				})
				.then(() => {
					return this._print(current);
				}).then(() => {
					resolve();
				});
		});
	}

	// apply style
	_applyStyle(selector, styleKey, styleValue) {
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
	_insertElement(className) {
		let ele = createElement('span', {
			class: className
		});
		append(this.codeCon, ele);
		return ele;
	}

	// print source text in ele
	_print(current, ele) {
		this._onChange('processing', current);
		return new Promise((resolve, reject) => {
			if (this._status === 'nope') {
				resolve();
			}
			if (current.type === 'comment') {
				let options = this._assignPrintOption(current.options);
				noopPromise()
					.then(() => {
						let contentArr = split(current.comment, '');
						let ele = this._insertElement('comment');
						return this._writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						let contentArr = ['\n'];
						let ele = this.codeCon;
						return this._writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						resolve();
					});
			} else if (current.type === 'common') {
				let options = this._assignPrintOption(current.options);
				noopPromise()
					.then(() => {
						let contentArr = split(current.selector, '');
						let ele = this._insertElement('selector');
						return this._writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						let contentArr = [' ', '{', '\n'];
						let ele = this.codeCon;
						return this._writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						let promises = [];
						const ruleKeys = Object.keys(current.style);
						let index = 0;
						return new Promise((resolve, reject) => {
							const iterateRule = () => {
								if (index >= ruleKeys.length || this._status === 'nope') {
									resolve();
									return;
								}
								let codeCon = this.codeCon;
								this._writeCharacterArrToEle(codeCon, [' ', ' ', ' ', ' '], options.speed)
									.then(() => {
										let contentArr = split(ruleKeys[index], '');
										let ele = this._insertElement('key');
										return this._writeCharacterArrToEle(ele, contentArr, options.speed);
									})
									.then(() => {
										return this._writeCharacterArrToEle(codeCon, [':', ' '], options.speed);
									})
									.then(() => {
										let contentArr = split(current.style[ruleKeys[index]], '');
										let ele = this._insertElement('value');
										return this._writeCharacterArrToEle(ele, contentArr, options.speed);
									})
									.then(() => {
										let ruleKey = ruleKeys[index];
										let ruleValue = current.style[ruleKeys[index]];
										return this._writeCharacterArrToEle(codeCon, [';', '\n'], options.speed, current.selector, ruleKey, ruleValue);
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
						let ele = this.codeCon;
						return this._writeCharacterArrToEle(ele, contentArr, options.speed);
					})
					.then(() => {
						resolve();
					});
			}
		});
	}

	_writeCharacterArrToEle(ele, contentArr, speedMs, selector, ruleKey, ruleValue) {
		return new Promise((resolve, reject) => {
			const iterateWrite = (ele, contentArr, speedMs) => {
				if (!contentArr.length || this._status === 'nope') {
					resolve();
					return;
				}
				let currentHTML = ele.innerHTML;
				noopPromise()
					.then(() => {
						return delay(speedMs);
					})
					.then(() => {
						if (!this._paused) {
							if (selector && contentArr[0] === ';') {
								this._applyStyle(selector, ruleKey, ruleValue);
							}
							html(ele, currentHTML += contentArr[0]);
							this._fixScrollTop();
							contentArr.splice(0, 1);
							iterateWrite(ele, contentArr, speedMs);
						} else {
							iterateWrite(ele, contentArr, speedMs);
						}
					});
			};
			iterateWrite(ele, contentArr, speedMs);
		});
	}

	// fix con scroll top
	_fixScrollTop() {
		let codeCon = this.codeCon;
		codeCon.scrollTop = codeCon.scrollHeight;
	}

	// print a new obj or start or paused or processing or stop trigger this func
	_onChange(process, argvs) {
		if (objType(this.options.onChange) !== 'Function') {
			return;
		}
		this.options.onChange(process, argvs);
	}

	// init
	_init() {
		if (!this.codeCon) {
			console.warn('You should give a real element to options of "codeCon".');
			return;
		}

		if (this._index === 0) {
			this._status = 'start';
			this._block = true;
			this._onChange('start');
		}

		if (this._status === 'nope') {
			this._index = 0;
			this._block = false;
			event.trigger('nope');
			return;
		}

		if (this._index >= this._formatedArray.length) {
			this._status = 'stop';
			this._block = false;
			this._onChange('stop');
			this._status = 'nope';
			return;
		}

		const _current = this._formatedArray[this._index];
		this._status = 'processing';
		this._handler(_current)
			.then(() => {
				this._index++;
				this._init();
			});
	}

	init() {
		this._init();
	}

	// format css to obj
	format() {
		this._formatedArray = format(this.source);
		return this._formatedArray;
	}

	// change source text
	setOptions(options) {
		if (this._block) {
			console.warn('Print process is running. Please wait it stop or apply stop func.');
			return;
		}
		this.constructor(options);
		this.init();
	}

	// pause _print
	pause() {
		this._paused = true;
	}

	// continue _print
	continue () {
		this._paused = false;
	}

	// toggle _print
	toggle() {
		this._paused = !this._paused;
	}

	// stop hook
	stop(cb) {
		return new Promise((resolve, reject) => {
			if (!this._block) {
				if (objType(cb) === 'Function') {
					cb();
				}
				resolve();
			}
			this._status = 'nope';
			event.on('nope', () => {
				if (objType(cb) === 'Function') {
					cb();
				}
				event.off('nope');
				resolve();
			});
		});
	}
};
