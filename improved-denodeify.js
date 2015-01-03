var Promise = require('promise')

// To be removed if/when https://github.com/then/promise/pull/69 hits npm

module.exports = function denodeify(fn, argumentCount) {
	argumentCount = argumentCount || Infinity
	return function () {
		var self = this
		var args = Array.prototype.slice.call(arguments)
		return new Promise(function (resolve, reject) {
			while (args.length && args.length > argumentCount) {
				args.pop()
			}
			args.push(function (err, res) {
				if (err) reject(err)
				else resolve(res)
			})
			var res = fn.apply(self, args)
			if (res && res.then) {
				resolve(res)
			}
		})
	}
}
