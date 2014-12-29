var net = require('net')
  , util = require('util')
  , uuidv4 = require('uuidv4')
  , messages
  , logger

module.exports = FtpControl

function trim(string) {
	return string.toString().replace(/^\s+|\s+$/g, '')
}

function splitMessageIntoParts(message) {
	var parts = message.toString().split(' ')
	return {
		command: parts[0].toUpperCase(),
		args: trim(parts.slice(1, parts.length))
	}
}

function FtpControl(options) {
	options = options || {}
	messages = options.messages || []
	logger = options.logger || function noop() {}

	var server = net.createServer(function(socket) {
		util.inherits(this, process.EventEmitter)

		var self = this

		socket.setTimeout(0)
		socket.setNoDelay()
		socket.ftpConnectionId = uuidv4()

		socket.ftpWrite = function(status, message, callback) {
			message = message || messages[status.toString()] || ''
			if (this.writable) {
				this.write(status + ' ' + message + '\r\n', callback)
			}
		}

		self.emit('initialize', socket)

		socket.on('data', function (message) {
			var parts = splitMessageIntoParts(message)
			self.emit('message', socket, parts.command, parts.args)
		})

		socket.on('close', function () {
			self.emit('close', socket)
		})

		socket.on('end', function() {
			self.emit('end', socket)
		})

		socket.on('error', function(err) {
			self.emit('error', err)
		})

	})

	return server

}
