export function $(selector) {
	return document.querySelector(selector);
}

export function createElement(tag, attrs, content) {
	let el = document.createElement(tag);
	let i;
	for (i in attrs) {
		if (attrs.hasOwnProperty(i)) {
			el.setAttribute(i, attrs[i]);
		}
	}
	if (content) {
		html(el, content);
	}
	return el;
}

export function append(parent, ...eles) {
	eles.forEach((ele) => {
		parent.appendChild(ele);
	});
}

export function html(eles, html) {
	_put(html, 0, eles);
}

export function text(eles, text) {
	_put(text, 1, eles);
}

function _put(string, type, ...eles) {
	eles.forEach((ele) => {
		if (type) {
			if (typeof ele.textContent === 'string') {
				ele.textContent = string;
			} else {
				ele.innerText = string;
			}
		} else {
			ele.innerHTML = string;
		}
	});
}
