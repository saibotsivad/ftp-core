var EventEmitter = require('events').EventEmitter
var generateLines = require('./generate-lines')

module.exports = function ServerBehaviour(magicalBehaviorObjectWithAllTheFunctions, clientEmitter, serverReturnCodes) {
	var serverEmitter = new EventEmitter()

	Object.keys(magicalBehaviorObjectWithAllTheFunctions).forEach(function(key) {
		clientEmitter.on(key, function() {
			function callback() {
				var argumentLines = [].slice.apply(arguments)
				var responseNumber = argumentLines.shift()

				if (argumentLines.length === 0 && serverReturnCodes && serverReturnCodes[responseNumber]) {
					argumentLines.push(serverReturnCodes[responseNumber])
				}

				serverEmitter.emit('response', responseNumber, generateLines(responseNumber, argumentLines))
			}

			magicalBehaviorObjectWithAllTheFunctions[key].call(null, arguments['0'], callback)
		})
	})

	serverEmitter.stop = function() {
		console.log('STOP')
	}

	return serverEmitter
}
