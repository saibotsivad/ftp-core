var FtpControl = require('./ftp-control.js')
  , returnCodes = require('ftp-return-codes')

var commands = {
	USER: function(socket, args) {
		if (args === 'anonymous') {
			socket.ftpWrite(230)
		} else {
			socket.ftpWrite(331)
		}
	}
}

var server = new FtpControl({
	messages: returnCodes,
	commands: commands,
	logger: console.log
})

server.on('initialize', function(socket) {
	console.log('INIT', socket.ftpConnectionId)
	socket.ftpWrite(220)
})

server.on('message', function(socket, command, args) {
	console.log('MESSAGE (' + socket.ftpConnectionId + '): ', command, ' ', args)
	if (commands[command] && typeof commands[command] === 'function') {
		commands[command](socket, args)
	} else {
		socket.ftpWrite(502)
	}
})

server.listen(7001, '127.0.0.1', function() {
	console.log('Server listening...')
})
