module.exports = {
	USER: function(argument, callback) {
		callback(230)
		// or any of these
		// callback.call(null, 230, 'message', 'of', 'the', 'day', 'is', 'here')
		// callback.apply(null, [ 230, 'message', 'of', 'the', 'day', 'is', 'here' ])
		// callback(230, 'message', 'of', 'the', 'day', 'is', 'here')
	}
}
