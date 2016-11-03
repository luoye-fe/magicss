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
	magicss.setOptions({
		source: val,
		codeCon: workCon
	});
	editor.setValue('');
}

window.addEventListener('keydown', function(e) {
	if (e.metaKey && e.keyCode === 13 && editor.hasFocus()) {
		biu();
	}
});

function init() {
	magicss.setOptions({
		source: 
`
* {
	transition: all ease 0.8s;
}
`,
		codeCon: workCon,
		onChange: function(process, argvs) {
			if (process === 'end') {
				applyCodeStyle();
			}
		}
	})
}

function applyCodeStyle() {
	magicss.setOptions({
		source: `
/* {{delay: 2000}}
 * 让我们来修饰下代码
 */
#work-con {
	/* delay: 2000;speed: 20 */
    position: fixed;
    overflow: auto;
    right: 5px;
    top: 5px;
    width: 500px;
    height: 300px;
    margin: 0;
    white-space: pre-wrap;
    outline: 0;
    border: 1px solid #ccc;
    padding: 10px 15px;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    background: #2d2d2d;
}
#work-con .comment {
	/* speed: 20 */
    color: #747269;
    font-style: italic;
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
}
		`,
		codeCon: workCon,
		onChange: function(process, argvs) {
			if (process === 'end') {

			}
		}
	});
}


// function 

init();
// applyCodeStyle();
// changeBodybg();
