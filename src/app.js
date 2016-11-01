import format from './format-css.js';

export default class Magicss {
	constructor(source) {
		this.source = source;
		this.paused = false; // 打印状态
		this.printOptions = {
			speed: 20, // ms/每字符
			delay: 2000
		}
		this.format = () => format(this.source);
	}
	// print source text in content
	print(content) {

	}
	// pause print
	pause() {

	}
	// continue print
	continue() {

	}
	// toggle print
	toggle() {

	}

};
