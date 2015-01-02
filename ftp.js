var extendObject = require('extend')

module.exports = function FtpCore(controlEmitter, dataSocketEmitterCreator) {
	var ftp = {
		commands: {},
		core: {
			getUserName: function getUserName() { return undefined },
			isAuthenticated: function isAuthenticated() { return undefined },
			currentDirectory: function currentDirectory() { return undefined },
			sendControlResponse: function sendControlResponse() { throw Error('The command "sendControlResponse" is not implemented!') },
			getDataStream: function getDataStream() { throw Error('The command "getDataStream" is not implemented!') },
			getAllCommandNames: function getAllCommands() {
				return Object.keys(ftp.commands)
			}
		}
	}

	ftp.extend = extend.bind(null, ftp)

	return ftp
}

function extend(ftp, extension) {
	if (!extension) {
		throw new Error('extension must be defined')
	}

	console.log(ftp, extension)
	var newFtp = {
		commands: extendObject(Object.create(ftp.commands), extension.commands || {}),
		core: extendObject(Object.create(ftp.core), extension.core || {}),
		extend: ftp.extend.bind(null, newFtp)
	}
	return newFtp
}