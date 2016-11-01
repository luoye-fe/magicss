// speed:2;delay:100; -> ['speed:2','delay:100']
// speed:2; -> ['speed','2']
export const split = (str, tab) => {
	tab = tab || '';
	let _curr = str.split(tab);
	let result = [];
	_curr.forEach((item) => {
		if (item !== '') {
		    result.push(item);
		}
	})
	return result;
};
