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

