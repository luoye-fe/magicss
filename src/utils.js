// speed:2;delay:100; -> ['speed:2','delay:100']
// speed:2; -> ['speed','2']
export const split = (str, tab) => {
	tab = tab || '';
	var _curr = str.split(tab);
	if (!_curr[_curr.length - 1].replace(/(^\s*)|(\s*$)/g, '').length) {
		_curr.pop();
	}
	return _curr;
};

export const delay = (ms) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, parseInt(ms));
	});
};

export const copyObj = (obj) => {
	return JSON.parse(JSON.stringify(obj));
};

export const noopPromise = () => {
	return new Promise((resolve, reject) => {
		resolve();
	});
};

export const objType = (obj) => {
	return Object.prototype.toString.call(obj).match(/\[object\s(.+?)]/)[1];
};
