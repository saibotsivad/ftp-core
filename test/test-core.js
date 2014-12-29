var test = require('tape')
var serverBehaviour = require('../server-behaviour')
var serverBehaviorObject = require('../commands')
var generateLines = require('../generate-lines')
var EventEmitter = require('events').EventEmitter
var returnCodes = require('ftp-return-codes')

test('whatever basic first', function(t) {
	var clientEmitter = new EventEmitter()
	var server = serverBehaviour(serverBehaviorObject, clientEmitter, returnCodes)

	t.plan(2)

	server.on('response', function(responseNumber, message) {
		t.equals(responseNumber, 230)
		t.equals(message, generateLines(230, returnCodes['230']))
		server.stop()
		t.end()
	})

	clientEmitter.emit('USER', 'JohnDoe')
})
