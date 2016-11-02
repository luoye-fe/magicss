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
				changeBodybg();
			}
		}
	});
}

function changeBodybg() {
	magicss.setOptions({
		source: `
/* {{ delay: 2000;speed: 20 }}
 * 来一段眼花缭乱！！！
 */
 body {
 	/*speed: 15*/
 	background: #f0f8ff;
 }
 body {
 	/*speed: 15*/
 	background: #faebd7;
 }
 body {
 	/*speed: 15*/
 	background: #ffefdb;
 }
 body {
 	/*speed: 15*/
 	background: #eedfcc;
 }
 body {
 	/*speed: 15*/
 	background: #cdc0b0;
 }
 body {
 	/*speed: 15*/
 	background: #8b8378;
 }
 body {
 	/*speed: 15*/
 	background: #7fffd4;
 }
 body {
 	/*speed: 15*/
 	background: #76eec6;
 }
 body {
 	/*speed: 15*/
 	background: #458b74;
 }
 body {
 	/*speed: 15*/
 	background: #f0ffff;
 }
 body {
 	/*speed: 15*/
 	background: #e0eeee;
 }
 body {
 	/*speed: 15*/
 	background: #c1cdcd;
 }
 body {
 	/*speed: 15*/
 	background: #838b8b;
 }
 body {
 	/*speed: 15*/
 	background: #f5f5dc;
 }
 body {
 	/*speed: 15*/
 	background: #ffe4c4;
 }
 body {
 	/*speed: 15*/
 	background: #eed5b7;
 }
 body {
 	/*speed: 15*/
 	background: #cdb79e;
 }
 body {
 	/*speed: 15*/
 	background: #8b7d6b;
 }
 body {
 	/*speed: 15*/
 	background: #000000;
 }
 body {
 	/*speed: 15*/
 	background: #ffebcd;
 }
 body {
 	/*speed: 15*/
 	background: #0000ff;
 }
 body {
 	/*speed: 15*/
 	background: #0000ee;
 }
 body {
 	/*speed: 15*/
 	background: #00008b;
 }
 body {
 	/*speed: 15*/
 	background: #8a2be2;
 }
 body {
 	/*speed: 15*/
 	background: #a52a2a;
 }
 body {
 	/*speed: 15*/
 	background: #ff4040;
 }
 body {
 	/*speed: 15*/
 	background: #ee3b3b;
 }
 body {
 	/*speed: 15*/
 	background: #cd3333;
 }
 body {
 	/*speed: 15*/
 	background: #8b2323;
 }
 body {
 	/*speed: 15*/
 	background: #deb887;
 }
 body {
 	/*speed: 15*/
 	background: #ffd39b;
 }
 body {
 	/*speed: 15*/
 	background: #eec591;
 }
 body {
 	/*speed: 15*/
 	background: #cdaa7d;
 }
 body {
 	/*speed: 15*/
 	background: #8b7355;
 }
 body {
 	/*speed: 15*/
 	background: #5f9ea0;
 }
 body {
 	/*speed: 15*/
 	background: #98f5ff;
 }
 body {
 	/*speed: 15*/
 	background: #8ee5ee;
 }
 body {
 	/*speed: 15*/
 	background: #7ac5cd;
 }
 body {
 	/*speed: 15*/
 	background: #53868b;
 }
 body {
 	/*speed: 15*/
 	background: #7fff00;
 }
 body {
 	/*speed: 15*/
 	background: #76ee00;
 }
 body {
 	/*speed: 15*/
 	background: #66cd00;
 }
 body {
 	/*speed: 15*/
 	background: #458b00;
 }
 body {
 	/*speed: 15*/
 	background: #d2691e;
 }
 body {
 	/*speed: 15*/
 	background: #ff7f24;
 }
 body {
 	/*speed: 15*/
 	background: #ee7621;
 }
 body {
 	/*speed: 15*/
 	background: #cd661d;
 }
 body {
 	/*speed: 15*/
 	background: #ff7f50;
 }
 body {
 	/*speed: 15*/
 	background: #ff7256;
 }
 body {
 	/*speed: 15*/
 	background: #ee6a50;
 }
 body {
 	/*speed: 15*/
 	background: #cd5b45;
 }
 body {
 	/*speed: 15*/
 	background: #8b3e2f;
 }
 body {
 	/*speed: 15*/
 	background: #6495ed;
 }
 body {
 	/*speed: 15*/
 	background: #fff8dc;
 }
 body {
 	/*speed: 15*/
 	background: #eee8cd;
 }
 body {
 	/*speed: 15*/
 	background: #cdc8b1;
 }
 body {
 	/*speed: 15*/
 	background: #8b8878;
 }
 body {
 	/*speed: 15*/
 	background: #00ffff;
 }
 body {
 	/*speed: 15*/
 	background: #00eeee;
 }
 body {
 	/*speed: 15*/
 	background: #00cdcd;
 }
 body {
 	/*speed: 15*/
 	background: #008b8b;
 }
 body {
 	/*speed: 15*/
 	background: #b8860b;
 }
 body {
 	/*speed: 15*/
 	background: #ffb90f;
 }
 body {
 	/*speed: 15*/
 	background: #eead0e;
 }
 body {
 	/*speed: 15*/
 	background: #cd950c;
 }
 body {
 	/*speed: 15*/
 	background: #8b6508;
 }
 body {
 	/*speed: 15*/
 	background: #006400;
 }
 body {
 	/*speed: 15*/
 	background: #bdb76b;
 }
 body {
 	/*speed: 15*/
 	background: #556b2f;
 }
 body {
 	/*speed: 15*/
 	background: #caff70;
 }
 body {
 	/*speed: 15*/
 	background: #bcee68;
 }
 body {
 	/*speed: 15*/
 	background: #a2cd5a;
 }
 body {
 	/*speed: 15*/
 	background: #6e8b3d;
 }
 body {
 	/*speed: 15*/
 	background: #ff8c00;
 }
 body {
 	/*speed: 15*/
 	background: #ff7f00;
 }
 body {
 	/*speed: 15*/
 	background: #ee7600;
 }
 body {
 	/*speed: 15*/
 	background: #cd6600;
 }
 body {
 	/*speed: 15*/
 	background: #8b4500;
 }
 body {
 	/*speed: 15*/
 	background: #9932cc;
 }
 body {
 	/*speed: 15*/
 	background: #bf3eff;
 }
 body {
 	/*speed: 15*/
 	background: #b23aee;
 }
 body {
 	/*speed: 15*/
 	background: #9a32cd;
 }
 body {
 	/*speed: 15*/
 	background: #68228b;
 }
 body {
 	/*speed: 15*/
 	background: #e9967a;
 }
 body {
 	/*speed: 15*/
 	background: #8fbc8f;
 }
 body {
 	/*speed: 15*/
 	background: #c1ffc1;
 }
 body {
 	/*speed: 15*/
 	background: #b4eeb4;
 }
 body {
 	/*speed: 15*/
 	background: #9bcd9b;
 }
 body {
 	/*speed: 15*/
 	background: #698b69;
 }
 body {
 	/*speed: 15*/
 	background: #483d8b;
 }
 body {
 	/*speed: 15*/
 	background: #2f4f4f;
 }
 body {
 	/*speed: 15*/
 	background: #97ffff;
 }
 body {
 	/*speed: 15*/
 	background: #8deeee;
 }
 body {
 	/*speed: 15*/
 	background: #79cdcd;
 }
 body {
 	/*speed: 15*/
 	background: #528b8b;
 }
 body {
 	/*speed: 15*/
 	background: #00ced1;
 }
 body {
 	/*speed: 15*/
 	background: #9400d3;
 }
 body {
 	/*speed: 15*/
 	background: #ff1493;
 }
 body {
 	/*speed: 15*/
 	background: #ee1289;
 }
 body {
 	/*speed: 15*/
 	background: #cd1076;
 }
 body {
 	/*speed: 15*/
 	background: #8b0a50;
 }
 body {
 	/*speed: 15*/
 	background: #00bfff;
 }
 body {
 	/*speed: 15*/
 	background: #00b2ee;
 }
 body {
 	/*speed: 15*/
 	background: #009acd;
 }
 body {
 	/*speed: 15*/
 	background: #00688b;
 }
 body {
 	/*speed: 15*/
 	background: #696969;
 }
 body {
 	/*speed: 15*/
 	background: #1e90ff;
 }
 body {
 	/*speed: 15*/
 	background: #1c86ee;
 }
 body {
 	/*speed: 15*/
 	background: #1874cd;
 }
 body {
 	/*speed: 15*/
 	background: #104e8b;
 }
 body {
 	/*speed: 15*/
 	background: #b22222;
 }
 body {
 	/*speed: 15*/
 	background: #ff3030;
 }
 body {
 	/*speed: 15*/
 	background: #ee2c2c;
 }
 body {
 	/*speed: 15*/
 	background: #cd2626;
 }
 body {
 	/*speed: 15*/
 	background: #8b1a1a;
 }
 body {
 	/*speed: 15*/
 	background: #fffaf0;
 }
 body {
 	/*speed: 15*/
 	background: #228b22;
 }
 body {
 	/*speed: 15*/
 	background: #dcdcdc;
 }
 body {
 	/*speed: 15*/
 	background: #f8f8ff;
 }
 body {
 	/*speed: 15*/
 	background: #ffd700;
 }
 body {
 	/*speed: 15*/
 	background: #eec900;
 }
 body {
 	/*speed: 15*/
 	background: #cdad00;
 }
 body {
 	/*speed: 15*/
 	background: #8b7500;
 }
 body {
 	/*speed: 15*/
 	background: #daa520;
 }
 body {
 	/*speed: 15*/
 	background: #ffc125;
 }
 body {
 	/*speed: 15*/
 	background: #eeb422;
 }
 body {
 	/*speed: 15*/
 	background: #cd9b1d;
 }
 body {
 	/*speed: 15*/
 	background: #8b6914;
 }
 body {
 	/*speed: 15*/
 	background: #bebebe;
 }
 body {
 	/*speed: 15*/
 	background: #030303;
 }
 body {
 	/*speed: 15*/
 	background: #1a1a1a;
 }
 body {
 	/*speed: 15*/
 	background: #1c1c1c;
 }
 body {
 	/*speed: 15*/
 	background: #1f1f1f;
 }
 body {
 	/*speed: 15*/
 	background: #212121;
 }
 body {
 	/*speed: 15*/
 	background: #242424;
 }
 body {
 	/*speed: 15*/
 	background: #262626;
 }
 body {
 	/*speed: 15*/
 	background: #292929;
 }
 body {
 	/*speed: 15*/
 	background: #2b2b2b;
 }
 body {
 	/*speed: 15*/
 	background: #2e2e2e;
 }
 body {
 	/*speed: 15*/
 	background: #303030;
 }
 body {
 	/*speed: 15*/
 	background: #050505;
 }
 body {
 	/*speed: 15*/
 	background: #333333;
 }
 body {
 	/*speed: 15*/
 	background: #363636;
 }
 body {
 	/*speed: 15*/
 	background: #383838;
 }
 body {
 	/*speed: 15*/
 	background: #3b3b3b;
 }
 body {
 	/*speed: 15*/
 	background: #3d3d3d;
 }
 body {
 	/*speed: 15*/
 	background: #404040;
 }
 body {
 	/*speed: 15*/
 	background: #424242;
 }
 body {
 	/*speed: 15*/
 	background: #454545;
 }
 body {
 	/*speed: 15*/
 	background: #474747;
 }
 body {
 	/*speed: 15*/
 	background: #4a4a4a;
 }
 body {
 	/*speed: 15*/
 	background: #080808;
 }
 body {
 	/*speed: 15*/
 	background: #4d4d4d;
 }
 body {
 	/*speed: 15*/
 	background: #4f4f4f;
 }
 body {
 	/*speed: 15*/
 	background: #525252;
 }
 body {
 	/*speed: 15*/
 	background: #545454;
 }
 body {
 	/*speed: 15*/
 	background: #575757;
 }
 body {
 	/*speed: 15*/
 	background: #595959;
 }
 body {
 	/*speed: 15*/
 	background: #5c5c5c;
 }
 body {
 	/*speed: 15*/
 	background: #5e5e5e;
 }
 body {
 	/*speed: 15*/
 	background: #616161;
 }
 body {
 	/*speed: 15*/
 	background: #636363;
 }
 body {
 	/*speed: 15*/
 	background: #0a0a0a;
 }
 body {
 	/*speed: 15*/
 	background: #666666;
 }
 body {
 	/*speed: 15*/
 	background: #696969;
 }
 body {
 	/*speed: 15*/
 	background: #6b6b6b;
 }
 body {
 	/*speed: 15*/
 	background: #6e6e6e;
 }
 body {
 	/*speed: 15*/
 	background: #707070;
 }
 body {
 	/*speed: 15*/
 	background: #737373;
 }
 body {
 	/*speed: 15*/
 	background: #757575;
 }
 body {
 	/*speed: 15*/
 	background: #787878;
 }
 body {
 	/*speed: 15*/
 	background: #7a7a7a;
 }
 body {
 	/*speed: 15*/
 	background: #7d7d7d;
 }
 body {
 	/*speed: 15*/
 	background: #0d0d0d;
 }
 body {
 	/*speed: 15*/
 	background: #7f7f7f;
 }
 body {
 	/*speed: 15*/
 	background: #828282;
 }
 body {
 	/*speed: 15*/
 	background: #858585;
 }
 body {
 	/*speed: 15*/
 	background: #878787;
 }
 body {
 	/*speed: 15*/
 	background: #8a8a8a;
 }
 body {
 	/*speed: 15*/
 	background: #8c8c8c;
 }
 body {
 	/*speed: 15*/
 	background: #8f8f8f;
 }
 body {
 	/*speed: 15*/
 	background: #919191;
 }
 body {
 	/*speed: 15*/
 	background: #949494;
 }
 body {
 	/*speed: 15*/
 	background: #969696;
 }
 body {
 	/*speed: 15*/
 	background: #0f0f0f;
 }
 body {
 	/*speed: 15*/
 	background: #999999;
 }
 body {
 	/*speed: 15*/
 	background: #9c9c9c;
 }
 body {
 	/*speed: 15*/
 	background: #9e9e9e;
 }
 body {
 	/*speed: 15*/
 	background: #a1a1a1;
 }
 body {
 	/*speed: 15*/
 	background: #a3a3a3;
 }
 body {
 	/*speed: 15*/
 	background: #a6a6a6;
 }
 body {
 	/*speed: 15*/
 	background: #a8a8a8;
 }
 body {
 	/*speed: 15*/
 	background: #ababab;
 }
 body {
 	/*speed: 15*/
 	background: #adadad;
 }
 body {
 	/*speed: 15*/
 	background: #b0b0b0;
 }
 body {
 	/*speed: 15*/
 	background: #121212;
 }
 body {
 	/*speed: 15*/
 	background: #b3b3b3;
 }
 body {
 	/*speed: 15*/
 	background: #b5b5b5;
 }
 body {
 	/*speed: 15*/
 	background: #b8b8b8;
 }
 body {
 	/*speed: 15*/
 	background: #bababa;
 }
 body {
 	/*speed: 15*/
 	background: #bdbdbd;
 }
 body {
 	/*speed: 15*/
 	background: #bfbfbf;
 }
 body {
 	/*speed: 15*/
 	background: #c2c2c2;
 }
 body {
 	/*speed: 15*/
 	background: #c4c4c4;
 }
 body {
 	/*speed: 15*/
 	background: #c7c7c7;
 }
 body {
 	/*speed: 15*/
 	background: #c9c9c9;
 }
 body {
 	/*speed: 15*/
 	background: #141414;
 }
 body {
 	/*speed: 15*/
 	background: #cccccc;
 }
 body {
 	/*speed: 15*/
 	background: #cfcfcf;
 }
 body {
 	/*speed: 15*/
 	background: #d1d1d1;
 }
 body {
 	/*speed: 15*/
 	background: #d4d4d4;
 }
 body {
 	/*speed: 15*/
 	background: #d6d6d6;
 }
 body {
 	/*speed: 15*/
 	background: #d9d9d9;
 }
 body {
 	/*speed: 15*/
 	background: #dbdbdb;
 }
 body {
 	/*speed: 15*/
 	background: #dedede;
 }
 body {
 	/*speed: 15*/
 	background: #e0e0e0;
 }
 body {
 	/*speed: 15*/
 	background: #e3e3e3;
 }
 body {
 	/*speed: 15*/
 	background: #171717;
 }
 body {
 	/*speed: 15*/
 	background: #e5e5e5;
 }
 body {
 	/*speed: 15*/
 	background: #e8e8e8;
 }
 body {
 	/*speed: 15*/
 	background: #ebebeb;
 }
 body {
 	/*speed: 15*/
 	background: #ededed;
 }
 body {
 	/*speed: 15*/
 	background: #f0f0f0;
 }
 body {
 	/*speed: 15*/
 	background: #f2f2f2;
 }
 body {
 	/*speed: 15*/
 	background: #f7f7f7;
 }
 body {
 	/*speed: 15*/
 	background: #fafafa;
 }
 body {
 	/*speed: 15*/
 	background: #fcfcfc;
 }
 body {
 	/*speed: 15*/
 	background: #00ff00;
 }
 body {
 	/*speed: 15*/
 	background: #00ee00;
 }
 body {
 	/*speed: 15*/
 	background: #00cd00;
 }
 body {
 	/*speed: 15*/
 	background: #008b00;
 }
 body {
 	/*speed: 15*/
 	background: #adff2f;
 }
 body {
 	/*speed: 15*/
 	background: #f0fff0;
 }
 body {
 	/*speed: 15*/
 	background: #e0eee0;
 }
 body {
 	/*speed: 15*/
 	background: #c1cdc1;
 }
 body {
 	/*speed: 15*/
 	background: #838b83;
 }
 body {
 	/*speed: 15*/
 	background: #ff69b4;
 }
 body {
 	/*speed: 15*/
 	background: #ff6eb4;
 }
 body {
 	/*speed: 15*/
 	background: #ee6aa7;
 }
 body {
 	/*speed: 15*/
 	background: #cd6090;
 }
 body {
 	/*speed: 15*/
 	background: #8b3a62;
 }
 body {
 	/*speed: 15*/
 	background: #cd5c5c;
 }
 body {
 	/*speed: 15*/
 	background: #ff6a6a;
 }
 body {
 	/*speed: 15*/
 	background: #ee6363;
 }
 body {
 	/*speed: 15*/
 	background: #cd5555;
 }
 body {
 	/*speed: 15*/
 	background: #8b3a3a;
 }
 body {
 	/*speed: 15*/
 	background: #fffff0;
 }
 body {
 	/*speed: 15*/
 	background: #eeeee0;
 }
 body {
 	/*speed: 15*/
 	background: #cdcdc1;
 }
 body {
 	/*speed: 15*/
 	background: #8b8b83;
 }
 body {
 	/*speed: 15*/
 	background: #f0e68c;
 }
 body {
 	/*speed: 15*/
 	background: #fff68f;
 }
 body {
 	/*speed: 15*/
 	background: #eee685;
 }
 body {
 	/*speed: 15*/
 	background: #cdc673;
 }
 body {
 	/*speed: 15*/
 	background: #8b864e;
 }
 body {
 	/*speed: 15*/
 	background: #e6e6fa;
 }
 body {
 	/*speed: 15*/
 	background: #fff0f5;
 }
 body {
 	/*speed: 15*/
 	background: #eee0e5;
 }
 body {
 	/*speed: 15*/
 	background: #cdc1c5;
 }
 body {
 	/*speed: 15*/
 	background: #8b8386;
 }
 body {
 	/*speed: 15*/
 	background: #7cfc00;
 }
 body {
 	/*speed: 15*/
 	background: #fffacd;
 }
 body {
 	/*speed: 15*/
 	background: #eee9bf;
 }
 body {
 	/*speed: 15*/
 	background: #cdc9a5;
 }
 body {
 	/*speed: 15*/
 	background: #8b8970;
 }
 body {
 	/*speed: 15*/
 	background: #eedd82;
 }
 body {
 	/*speed: 15*/
 	background: #add8e6;
 }
 body {
 	/*speed: 15*/
 	background: #bfefff;
 }
 body {
 	/*speed: 15*/
 	background: #b2dfee;
 }
 body {
 	/*speed: 15*/
 	background: #9ac0cd;
 }
 body {
 	/*speed: 15*/
 	background: #68838b;
 }
 body {
 	/*speed: 15*/
 	background: #f08080;
 }
 body {
 	/*speed: 15*/
 	background: #e0ffff;
 }
 body {
 	/*speed: 15*/
 	background: #d1eeee;
 }
 body {
 	/*speed: 15*/
 	background: #b4cdcd;
 }
 body {
 	/*speed: 15*/
 	background: #7a8b8b;
 }
 body {
 	/*speed: 15*/
 	background: #ffec8b;
 }
 body {
 	/*speed: 15*/
 	background: #eedc82;
 }
 body {
 	/*speed: 15*/
 	background: #cdbe70;
 }
 body {
 	/*speed: 15*/
 	background: #8b814c;
 }
 body {
 	/*speed: 15*/
 	background: #fafad2;
 }
 body {
 	/*speed: 15*/
 	background: #d3d3d3;
 }
 body {
 	/*speed: 15*/
 	background: #ffb6c1;
 }
 body {
 	/*speed: 15*/
 	background: #ffaeb9;
 }
 body {
 	/*speed: 15*/
 	background: #eea2ad;
 }
 body {
 	/*speed: 15*/
 	background: #cd8c95;
 }
 body {
 	/*speed: 15*/
 	background: #8b5f65;
 }
 body {
 	/*speed: 15*/
 	background: #ffa07a;
 }
 body {
 	/*speed: 15*/
 	background: #ee9572;
 }
 body {
 	/*speed: 15*/
 	background: #cd8162;
 }
 body {
 	/*speed: 15*/
 	background: #8b5742;
 }
 body {
 	/*speed: 15*/
 	background: #20b2aa;
 }
 body {
 	/*speed: 15*/
 	background: #87cefa;
 }
 body {
 	/*speed: 15*/
 	background: #b0e2ff;
 }
 body {
 	/*speed: 15*/
 	background: #a4d3ee;
 }
 body {
 	/*speed: 15*/
 	background: #8db6cd;
 }
 body {
 	/*speed: 15*/
 	background: #607b8b;
 }
 body {
 	/*speed: 15*/
 	background: #8470ff;
 }
 body {
 	/*speed: 15*/
 	background: #778899;
 }
 body {
 	/*speed: 15*/
 	background: #b0c4de;
 }
 body {
 	/*speed: 15*/
 	background: #cae1ff;
 }
 body {
 	/*speed: 15*/
 	background: #bcd2ee;
 }
 body {
 	/*speed: 15*/
 	background: #a2b5cd;
 }
 body {
 	/*speed: 15*/
 	background: #6e7b8b;
 }
 body {
 	/*speed: 15*/
 	background: #ffffe0;
 }
 body {
 	/*speed: 15*/
 	background: #eeeed1;
 }
 body {
 	/*speed: 15*/
 	background: #cdcdb4;
 }
 body {
 	/*speed: 15*/
 	background: #8b8b7a;
 }
 body {
 	/*speed: 15*/
 	background: #32cd32;
 }
 body {
 	/*speed: 15*/
 	background: #faf0e6;
 }
 body {
 	/*speed: 15*/
 	background: #ff00ff;
 }
 body {
 	/*speed: 15*/
 	background: #ee00ee;
 }
 body {
 	/*speed: 15*/
 	background: #cd00cd;
 }
 body {
 	/*speed: 15*/
 	background: #8b008b;
 }
 body {
 	/*speed: 15*/
 	background: #b03060;
 }
 body {
 	/*speed: 15*/
 	background: #ff34b3;
 }
 body {
 	/*speed: 15*/
 	background: #ee30a7;
 }
 body {
 	/*speed: 15*/
 	background: #cd2990;
 }
 body {
 	/*speed: 15*/
 	background: #8b1c62;
 }
 body {
 	/*speed: 15*/
 	background: #66cdaa;
 }
 body {
 	/*speed: 15*/
 	background: #66cdaa;
 }
 body {
 	/*speed: 15*/
 	background: #0000cd;
 }
 body {
 	/*speed: 15*/
 	background: #ba55d3;
 }
 body {
 	/*speed: 15*/
 	background: #e066ff;
 }
 body {
 	/*speed: 15*/
 	background: #d15fee;
 }
 body {
 	/*speed: 15*/
 	background: #b452cd;
 }
 body {
 	/*speed: 15*/
 	background: #7a378b;
 }
 body {
 	/*speed: 15*/
 	background: #9370db;
 }
 body {
 	/*speed: 15*/
 	background: #ab82ff;
 }
 body {
 	/*speed: 15*/
 	background: #9f79ee;
 }
 body {
 	/*speed: 15*/
 	background: #8968cd;
 }
 body {
 	/*speed: 15*/
 	background: #5d478b;
 }
 body {
 	/*speed: 15*/
 	background: #3cb371;
 }
 body {
 	/*speed: 15*/
 	background: #7b68ee;
 }
 body {
 	/*speed: 15*/
 	background: #00fa9a;
 }
 body {
 	/*speed: 15*/
 	background: #48d1cc;
 }
 body {
 	/*speed: 15*/
 	background: #c71585;
 }
 body {
 	/*speed: 15*/
 	background: #191970;
 }
 body {
 	/*speed: 15*/
 	background: #f5fffa;
 }
 body {
 	/*speed: 15*/
 	background: #ffe4e1;
 }
 body {
 	/*speed: 15*/
 	background: #eed5d2;
 }
 body {
 	/*speed: 15*/
 	background: #cdb7b5;
 }
 body {
 	/*speed: 15*/
 	background: #8b7d7b;
 }
 body {
 	/*speed: 15*/
 	background: #ffe4b5;
 }
 body {
 	/*speed: 15*/
 	background: #ffdead;
 }
 body {
 	/*speed: 15*/
 	background: #eecfa1;
 }
 body {
 	/*speed: 15*/
 	background: #cdb38b;
 }
 body {
 	/*speed: 15*/
 	background: #8b795e;
 }
 body {
 	/*speed: 15*/
 	background: #000080;
 }
 body {
 	/*speed: 15*/
 	background: #fdf5e6;
 }
 body {
 	/*speed: 15*/
 	background: #6b8e23;
 }
 body {
 	/*speed: 15*/
 	background: #c0ff3e;
 }
 body {
 	/*speed: 15*/
 	background: #b3ee3a;
 }
 body {
 	/*speed: 15*/
 	background: #698b22;
 }
 body {
 	/*speed: 15*/
 	background: #ffa500;
 }
 body {
 	/*speed: 15*/
 	background: #ee9a00;
 }
 body {
 	/*speed: 15*/
 	background: #cd8500;
 }
 body {
 	/*speed: 15*/
 	background: #8b5a00;
 }
 body {
 	/*speed: 15*/
 	background: #ff4500;
 }
 body {
 	/*speed: 15*/
 	background: #ee4000;
 }
 body {
 	/*speed: 15*/
 	background: #cd3700;
 }
 body {
 	/*speed: 15*/
 	background: #8b2500;
 }
 body {
 	/*speed: 15*/
 	background: #da70d6;
 }
 body {
 	/*speed: 15*/
 	background: #ff83fa;
 }
 body {
 	/*speed: 15*/
 	background: #ee7ae9;
 }
 body {
 	/*speed: 15*/
 	background: #cd69c9;
 }
 body {
 	/*speed: 15*/
 	background: #8b4789;
 }
 body {
 	/*speed: 15*/
 	background: #db7093;
 }
 body {
 	/*speed: 15*/
 	background: #eee8aa;
 }
 body {
 	/*speed: 15*/
 	background: #98fb98;
 }
 body {
 	/*speed: 15*/
 	background: #9aff9a;
 }
 body {
 	/*speed: 15*/
 	background: #90ee90;
 }
 body {
 	/*speed: 15*/
 	background: #7ccd7c;
 }
 body {
 	/*speed: 15*/
 	background: #548b54;
 }
 body {
 	/*speed: 15*/
 	background: #afeeee;
 }
 body {
 	/*speed: 15*/
 	background: #bbffff;
 }
 body {
 	/*speed: 15*/
 	background: #aeeeee;
 }
 body {
 	/*speed: 15*/
 	background: #96cdcd;
 }
 body {
 	/*speed: 15*/
 	background: #668b8b;
 }
 body {
 	/*speed: 15*/
 	background: #db7093;
 }
 body {
 	/*speed: 15*/
 	background: #ff82ab;
 }
 body {
 	/*speed: 15*/
 	background: #ee799f;
 }
 body {
 	/*speed: 15*/
 	background: #cd6889;
 }
 body {
 	/*speed: 15*/
 	background: #8b475d;
 }
 body {
 	/*speed: 15*/
 	background: #ffefd5;
 }
 body {
 	/*speed: 15*/
 	background: #ffdab9;
 }
 body {
 	/*speed: 15*/
 	background: #eecbad;
 }
 body {
 	/*speed: 15*/
 	background: #cdaf95;
 }
 body {
 	/*speed: 15*/
 	background: #8b7765;
 }
 body {
 	/*speed: 15*/
 	background: #ffc0cb;
 }
 body {
 	/*speed: 15*/
 	background: #ffb5c5;
 }
 body {
 	/*speed: 15*/
 	background: #eea9b8;
 }
 body {
 	/*speed: 15*/
 	background: #cd919e;
 }
 body {
 	/*speed: 15*/
 	background: #8b636c;
 }
 body {
 	/*speed: 15*/
 	background: #dda0dd;
 }
 body {
 	/*speed: 15*/
 	background: #ffbbff;
 }
 body {
 	/*speed: 15*/
 	background: #eeaeee;
 }
 body {
 	/*speed: 15*/
 	background: #cd96cd;
 }
 body {
 	/*speed: 15*/
 	background: #8b668b;
 }
 body {
 	/*speed: 15*/
 	background: #b0e0e6;
 }
 body {
 	/*speed: 15*/
 	background: #a020f0;
 }
 body {
 	/*speed: 15*/
 	background: #663399;
 }
 body {
 	/*speed: 15*/
 	background: #9b30ff;
 }
 body {
 	/*speed: 15*/
 	background: #912cee;
 }
 body {
 	/*speed: 15*/
 	background: #7d26cd;
 }
 body {
 	/*speed: 15*/
 	background: #551a8b;
 }
 body {
 	/*speed: 15*/
 	background: #ff0000;
 }
 body {
 	/*speed: 15*/
 	background: #ee0000;
 }
 body {
 	/*speed: 15*/
 	background: #cd0000;
 }
 body {
 	/*speed: 15*/
 	background: #8b0000;
 }
 body {
 	/*speed: 15*/
 	background: #bc8f8f;
 }
 body {
 	/*speed: 15*/
 	background: #ffc1c1;
 }
 body {
 	/*speed: 15*/
 	background: #eeb4b4;
 }
 body {
 	/*speed: 15*/
 	background: #cd9b9b;
 }
 body {
 	/*speed: 15*/
 	background: #8b6969;
 }
 body {
 	/*speed: 15*/
 	background: #4169e1;
 }
 body {
 	/*speed: 15*/
 	background: #4876ff;
 }
 body {
 	/*speed: 15*/
 	background: #436eee;
 }
 body {
 	/*speed: 15*/
 	background: #3a5fcd;
 }
 body {
 	/*speed: 15*/
 	background: #27408b;
 }
 body {
 	/*speed: 15*/
 	background: #8b4513;
 }
 body {
 	/*speed: 15*/
 	background: #fa8072;
 }
 body {
 	/*speed: 15*/
 	background: #ff8c69;
 }
 body {
 	/*speed: 15*/
 	background: #ee8262;
 }
 body {
 	/*speed: 15*/
 	background: #cd7054;
 }
 body {
 	/*speed: 15*/
 	background: #8b4c39;
 }
 body {
 	/*speed: 15*/
 	background: #f4a460;
 }
 body {
 	/*speed: 15*/
 	background: #54ff9f;
 }
 body {
 	/*speed: 15*/
 	background: #4eee94;
 }
 body {
 	/*speed: 15*/
 	background: #43cd80;
 }
 body {
 	/*speed: 15*/
 	background: #2e8b57;
 }
 body {
 	/*speed: 15*/
 	background: #fff5ee;
 }
 body {
 	/*speed: 15*/
 	background: #eee5de;
 }
 body {
 	/*speed: 15*/
 	background: #cdc5bf;
 }
 body {
 	/*speed: 15*/
 	background: #8b8682;
 }
 body {
 	/*speed: 15*/
 	background: #a0522d;
 }
 body {
 	/*speed: 15*/
 	background: #ff8247;
 }
 body {
 	/*speed: 15*/
 	background: #ee7942;
 }
 body {
 	/*speed: 15*/
 	background: #cd6839;
 }
 body {
 	/*speed: 15*/
 	background: #8b4726;
 }
 body {
 	/*speed: 15*/
 	background: #87ceeb;
 }
 body {
 	/*speed: 15*/
 	background: #87ceff;
 }
 body {
 	/*speed: 15*/
 	background: #7ec0ee;
 }
 body {
 	/*speed: 15*/
 	background: #6ca6cd;
 }
 body {
 	/*speed: 15*/
 	background: #4a708b;
 }
 body {
 	/*speed: 15*/
 	background: #6a5acd;
 }
 body {
 	/*speed: 15*/
 	background: #836fff;
 }
 body {
 	/*speed: 15*/
 	background: #7a67ee;
 }
 body {
 	/*speed: 15*/
 	background: #6959cd;
 }
 body {
 	/*speed: 15*/
 	background: #473c8b;
 }
 body {
 	/*speed: 15*/
 	background: #708090;
 }
 body {
 	/*speed: 15*/
 	background: #c6e2ff;
 }
 body {
 	/*speed: 15*/
 	background: #b9d3ee;
 }
 body {
 	/*speed: 15*/
 	background: #9fb6cd;
 }
 body {
 	/*speed: 15*/
 	background: #6c7b8b;
 }
 body {
 	/*speed: 15*/
 	background: #fffafa;
 }
 body {
 	/*speed: 15*/
 	background: #eee9e9;
 }
 body {
 	/*speed: 15*/
 	background: #cdc9c9;
 }
 body {
 	/*speed: 15*/
 	background: #8b8989;
 }
 body {
 	/*speed: 15*/
 	background: #00ff7f;
 }
 body {
 	/*speed: 15*/
 	background: #00ee76;
 }
 body {
 	/*speed: 15*/
 	background: #00cd66;
 }
 body {
 	/*speed: 15*/
 	background: #008b45;
 }
 body {
 	/*speed: 15*/
 	background: #4682b4;
 }
 body {
 	/*speed: 15*/
 	background: #63b8ff;
 }
 body {
 	/*speed: 15*/
 	background: #5cacee;
 }
 body {
 	/*speed: 15*/
 	background: #4f94cd;
 }
 body {
 	/*speed: 15*/
 	background: #36648b;
 }
 body {
 	/*speed: 15*/
 	background: #d2b48c;
 }
 body {
 	/*speed: 15*/
 	background: #ffa54f;
 }
 body {
 	/*speed: 15*/
 	background: #ee9a49;
 }
 body {
 	/*speed: 15*/
 	background: #cd853f;
 }
 body {
 	/*speed: 15*/
 	background: #8b5a2b;
 }
 body {
 	/*speed: 15*/
 	background: #d8bfd8;
 }
 body {
 	/*speed: 15*/
 	background: #ffe1ff;
 }
 body {
 	/*speed: 15*/
 	background: #eed2ee;
 }
 body {
 	/*speed: 15*/
 	background: #cdb5cd;
 }
 body {
 	/*speed: 15*/
 	background: #8b7b8b;
 }
 body {
 	/*speed: 15*/
 	background: #ff6347;
 }
 body {
 	/*speed: 15*/
 	background: #ee5c42;
 }
 body {
 	/*speed: 15*/
 	background: #cd4f39;
 }
 body {
 	/*speed: 15*/
 	background: #8b3626;
 }
 body {
 	/*speed: 15*/
 	background: #40e0d0;
 }
 body {
 	/*speed: 15*/
 	background: #00f5ff;
 }
 body {
 	/*speed: 15*/
 	background: #00e5ee;
 }
 body {
 	/*speed: 15*/
 	background: #00c5cd;
 }
 body {
 	/*speed: 15*/
 	background: #00868b;
 }
 body {
 	/*speed: 15*/
 	background: #ee82ee;
 }
 body {
 	/*speed: 15*/
 	background: #d02090;
 }
 body {
 	/*speed: 15*/
 	background: #ff3e96;
 }
 body {
 	/*speed: 15*/
 	background: #ee3a8c;
 }
 body {
 	/*speed: 15*/
 	background: #cd3278;
 }
 body {
 	/*speed: 15*/
 	background: #8b2252;
 }
 body {
 	/*speed: 15*/
 	background: #f5deb3;
 }
 body {
 	/*speed: 15*/
 	background: #ffe7ba;
 }
 body {
 	/*speed: 15*/
 	background: #eed8ae;
 }
 body {
 	/*speed: 15*/
 	background: #cdba96;
 }
 body {
 	/*speed: 15*/
 	background: #8b7e66;
 }
 body {
 	/*speed: 15*/
 	background: #ffffff;
 }
 body {
 	/*speed: 15*/
 	background: #f5f5f5;
 }
 body {
 	/*speed: 15*/
 	background: #ffff00;
 }
 body {
 	/*speed: 15*/
 	background: #eeee00;
 }
 body {
 	/*speed: 15*/
 	background: #cdcd00;
 }
 body {
 	/*speed: 15*/
 	background: #8b8b00;
 }
 body {
 	/*speed: 15*/
 	background: #9acd32;
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


// applyCodeStyle();
// changeBodybg();
