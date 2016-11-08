var $ = function(selector) {
	return document.querySelector(selector);
}

var editor = CodeMirror($('#code'), {
	lineNumbers: true,
	mode: 'css',
	inputStyle: 'contenteditable',
	theme: 'monokai'
});

var magicss = new Magicss();
var workCon = $('#work-con');

function biu() {
	var val = editor.getValue();
	magicss.stop()
		.then(() => {
			magicss.setOptions({
				source: val,
				codeCon: workCon
			});
		})
	editor.setValue('');
}

function toggle() {
	magicss.toggle();
}

window.addEventListener('keydown', function(e) {
	if (e.metaKey && e.keyCode === 13 && editor.hasFocus()) {
		biu();
	}
});

const content = [`
/* 
 * Hello World!
 */

`,`

/* {{delay: 1000}}
 * Magicss, apply your css rules real-time while printing them on the screen.
 *
 * Now, show it.
 */

`,`

/* {{delay: 1000; speed:15;}}
 *  ┏┓　　　┏┓
 *┏┛┻━━━┛┻┓
 *┃　　　　　　　┃ 　
 *┃　　　━　　　┃
 *┃　┳┛　┗┳　┃
 *┃　　　　　　　┃
 *┃　　　┻　　　┃
 *┃　　　　　　　┃
 *┗━┓　　　┏━┛
 *　　┃　　　┃ 神兽保佑
 *　　┃　　　┃ 代码无BUG！
 *　　┃　　　┗━━━┓
 *　　┃　　　　　　　┣┓
 *　　┃　　　　　　　┏┛
 *　　┗┓┓┏━┳┓┏┛
 *　　　┃┫┫　┃┫┫
 *　　　┗┻┛　┗┻┛ 
 *　　　
 */
 
`,`
* {
	transition: all ease 0.8s;
}`, `
#work-con {
	/* speed: 20 */
	position: fixed;
	width: 40%;
	height: 94%;
	top: 3%;
	left: 1%;
	border: 1px solid #333;
	background-color: #282c34;
	color: #fff;
}
#work-con .comment {
	/* speed: 20 */
    color: #747269;
}
#work-con .selector {
	/* speed: 20 */
    color: #e96951;
}
#work-con .key {
	/* speed: 20 */
    color: #fb9356;
}
#work-con .value {
	/* speed: 20 */
    color: #62cbcc;
}`, `
#work-con {
	/* speed: 20 */
	perspective-origin: 50% 50%;
	transform: perspective(3600px) rotateY(740deg);
}
`];

let index = 0;

// dev
// index = 5;
// content.length = index + 1;

function init() {
	if (index >= content.length) {
		return;
	}
	magicss.stop()
		.then(() => {
			magicss.setOptions({
				source: content[index],
				codeCon: workCon,
				onChange: function(process, argvs) {
					if (process === 'stop') {
						index++;
						init();
					}
				}
			})
		})
}

init();