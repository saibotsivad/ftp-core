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




	// 	createDataConnection: function createDataConnection(ipAddress, port, callback) {
	// 		dataSocketEmitterCreator(ipAddress, port, function(emitter) {
	// 			ftp.dataConnectionEmitter = emitter
	// 			callback()
	// 		})
	// 	}
	// }

	// ftp.commands.USER = function(userName, callback) {
	// 	if (userName === 'anonymous') {
	// 		ftp.userName = 'anonymous'
	// 		ftp.userIsAuthenticated = true
	// 		callback(230, 'Logged in as anonymous user.')
	// 	} else {
	// 		callback(530, 'User not logged in.', 'This server only accepts anonymous users.', 'Please use "USER anonymous".')
	// 	}
	// }

	// ftp.commands.PWD = function(ignore, callback) {
	// 	if (ftp.userIsAuthenticated) {
	// 		callback(257, '"' + ftp.currentDirectory + '" is current directory.')
	// 	} else {
	// 		callback(530, 'User not logged in.')
	// 	}
	// }

	// ftp.commands.CWD = function(directory, callback) {
	// 	if (ftp.userIsAuthenticated) {
	// 		ftp.directoryExists(directory, function(exists) {
	// 			if (exists) {
	// 				ftp.currentDirectory = directory
	// 				ftp.commands.PWD(null, callback)
	// 			} else {
	// 				callback(250, 'Broken client detected, missing argument to CWD. "' + ftp.currentDirectory + '" is current directory.')
	// 			}
	// 		})
	// 	} else {
	// 		callback(530, 'User not logged in.')
	// 	}
	// }

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