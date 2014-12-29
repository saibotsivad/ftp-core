var net = require('net')
  , messages
  , commands
  , logger

module.exports = function FtpCore(options) {
	options = options || {}
	messages = options.messages || []
	commands = options.commands || []
	logger = options.logger || function noop() {}

	var server = net.createServer(function(socket) {
		logger('server starting')

		socket.setTimeout(0)
		socket.setNoDelay()
		socket.dataEncoding = 'binary'
		socket.asciiEncoding = 'utf8'
		socket.passive = false
		socket.dataInfo = null
		socket.username = null
		socket.dataTransferQueue = []

		socket.reply = function (status, message, callback) {
			logger('socket.reply', status, message)
			message = message || messages[status] || ''
			if (this.writable) {
				this.write(status + ' ' + message + '\r\n', callback)
			}
		}

		socket.dataTransfer = function (handle) {
			function finish (dataSocket) {
				return function (err) {
					if (err) {
						logger('socket.dataTransfer.finish.err', err)
						dataSocket.emit('error', err)
					} else {
						logger('socket.dataTransfer.finish.end')
						dataSocket.end()
					}
				}
			}

			function execute () {
				logger('socket.dataTransfer.execute')
				socket.reply(150)
				handle.call(socket, this, finish(this))
			}

			if (socket.passive) {
				socket.dataTransferQueue.push(execute)
			} else {
				dataSocket = net.createConnection(socket.dataInfo.port, socket.dataInfo.host)
				dataSocket.on('connect', execute)
			}
		}

		socket.on('connect', function () {
			logger('socket.connect')
			socket.reply(220)
		})

	})

	server.on('data', function (chunk) {
		logger('socket.data')
		if (server.closing) {
			socket.reply(421)
		}

		var parts = trim(chunk.toString()).split(" ")
		  , command = trim(parts[0]).toUpperCase()
		  , args = parts.slice(1, parts.length)
		  , callable = commands[command]

		if (!callable) {
			socket.reply(502)
		} else {
			callable.apply(socket, args)
		}
	})

	return server

}
