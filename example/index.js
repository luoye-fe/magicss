/* global Magicss */
var sourceText = `
/* global Magicss */
* {
    -webkit-transition: all ease 1s;
}
html, body {
    background: #2d2d2d;
    color: #fff;
}
/* {{delay: 2000}}global Magicss */
/* global Magicss */
/* global Magicss */
/* global Magicss */
/* global Magicss */
/* global Magicss */
`;

var baymax = new Magicss();

baymax.stop().then(() => {
	baymax.setOptions({
		source: sourceText,
		codeCon: document.getElementById('work_con'),
		onChange: function(process, argvs) {
			console.log(process);
			console.log(argvs);
		}
	});
});

baymax.stop().then(() => {
	baymax.setOptions({
		source: sourceText,
		codeCon: document.getElementById('work_con'),
		onChange: function(process, argvs) {
			console.log(process);
			console.log(argvs);
		}
	});
});

// baymax.init();
