/* eslint-disable */
/*
 ************************************************
 * @author:luoye https://github.com/luoye-fe
 * @desc:event on/trigger/one/off
 * @time:2015.01.16
 ************************************************
 */

function _each(arr, fn) {
	var ret;
	for (var i = 0; i < arr.length; i++) {
		var n = arr[i];
		ret = fn.call(n, i, n)
	}
	return ret;
}

class Event {
	constructor() {
		this.cache = {};
		this.offlineCache = [];
		this.isOne = false;
	}
	on(key, fn) {
		if (!this.cache[key]) {
			this.cache[key] = [];
			this.cache[key].push(fn);
		} else {
			this.cache[key].push(fn);
		}
		var _current = [];
		_each(this.offlineCache, function(index, item) {
			if (item[key] !== undefined) {
				var _obj = {};
				_obj[key] = item[key];
				_current.push(_obj);
			}
		})
		if (_current.length > 0) {
			if (this.isOne) {
				this.trigger(key, _current[_current.length - 1][key]);
			} else {
				_each(_current, function(index, item) {
					this.trigger(key, item[key]);
				})
			}
		}
	}
	one(key, fn) {
		this.isOne = true;
		this.on(key, fn);
		this.isOne = false;
	}
	off(key, fn) {
		if (this.cache[key]) {
			if (fn) {
				fn && fn();
				this.cache[key] = [];
			} else {
				this.cache[key] = [];
			}
		}
		this.offlineCache = [];
	}
	trigger(key, value) {
		var stack = this.cache[key];
		if (!stack || !stack.length) {
			var _current = {};
			_current[key] = value;
			this.offlineCache.push(_current);
			return;
		} else {
			if (this.isOne) {
				stack[0].call(this, value);
				this.cache[key] = [];
			} else {
				return _each(stack, function() {
					return this.call(this, value);
				})
			}
		}
	}
}

export default Event;
