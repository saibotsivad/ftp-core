var Promise = require('promise')
var extendObject = require('extend')
var denodeify = require('./improved-denodeify')

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
	if (!extension) {
		throw new Error('extension must be defined')
	}

	var newFtp = {
		commands: extendObject(Object.create(ftp.commands), extension.commands),
		core: extendObject(Object.create(ftp.core), extension.core)
	}

	newFtp.extend = extend.bind(null, newFtp)
	newFtp.callCommand = Promise.nodeify(callCommand.bind(null, newFtp))

	return newFtp
}

function callCommand(ftp, cmd, str) {
	return new Promise(function (resolve, reject) {
		if (!ftp.commands[cmd]) {
			throw new Error('No such command "' + cmd + '"')
		}

		var commandFunction = denodeify(ftp.commands[cmd])

		resolve(commandFunction(ftp.core, str))
	})
}
