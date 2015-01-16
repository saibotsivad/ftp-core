var Promise = require('promise')
var extendObject = require('extend')

var stubCoreApi = {
	getUserName: function getUserName() { return undefined },
	isAuthenticated: function isAuthenticated() { return undefined },
	currentDirectory: function currentDirectory() { return undefined },
	sendControlResponse: function sendControlResponse() { throw Error('The command "sendControlResponse" is not implemented!') },
	getDataStream: function getDataStream() { throw Error('The command "getDataStream" is not implemented!') },
	getAllCommandNames: function getAllCommands() {
		return []
	}
}

module.exports = function FtpCore() {
	var ftp = {
		commands: {},
		core: {}
	}

	return extend(ftp, {
		core: stubCoreApi
	})
}

function extend(ftp, extension) {
	if (!extension || typeof extension !== 'object') {
		throw new Error('extension must be a defined object')
	}

	var internalApi = {
		commands: extendObject(Object.create(ftp.commands), extension.commands),
		core: extendObject(Object.create(ftp.core), extension.core)
	}

	var publicApi = {
		extend: extend.bind(null, internalApi),
		callCommand: Promise.nodeify(callCommand.bind(null, internalApi)),
		core: internalApi.core
	}

	return publicApi
}

function callCommand(ftp, cmd, str) {
	return new Promise(function (resolve, reject) {
		if (!ftp.commands[cmd]) {
			throw new Error('No such command "' + cmd + '"')
		}

		var commandFunction = Promise.denodeify(ftp.commands[cmd])

		resolve(commandFunction(ftp.core, str))
	})
}
