/* global Magicss */
var sourceText = `
/* global Magicss */
* {
    -webkit-transition: all ease 1s;
}
html, body {
    background: #2d2d2d;
}
/* global Magicss */
/* global Magicss */
/* global Magicss */
/* global Magicss */
/* global Magicss */
/* global Magicss */
`;

var baymax = new Magicss({
	source: sourceText,
	codeCon: document.getElementById('work_con'),
	onChange: function(process, argvs) {
		console.log(process);
		console.log(argvs);
	}
});

baymax.init();
