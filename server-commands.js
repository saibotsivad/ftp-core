var commands = {}
  , options

commands.USER = function(argument, callback) {
	callback(230)
	// or any of these
	// callback.call(null, 230, 'message', 'of', 'the', 'day', 'is', 'here')
	// callback.apply(null, [ 230, 'message', 'of', 'the', 'day', 'is', 'here' ])
	// callback(230, 'message', 'of', 'the', 'day', 'is', 'here')
}

commands.FEAT = function(ignore, callback) {
	var lines = [211, 'Features:']
	lines = lines.concat(Object.keys(commands))
	lines.push('End')
	callback.apply(null, lines)
}

commands.PWD = function(ignore, callback) {
	callback(257, '"' + options.currentDirectory + '" is current directory.')
}

commands.CWD = function(argument, callback) {
	if (argument) {
		options.currentDirectory = argument
		commands.PWD(null, callback)
	} else {
		callback(250, 'Broken client detected, missing argument to CWD. "' + options.currentDirectory + '" is current directory.')
	}
}

module.exports = function ServerCommands(opts) {
	options = opts || {}
	options.currentDirectory = options.currentDirectory || '/'
	options.level = options.level || {}

	return commands
}
