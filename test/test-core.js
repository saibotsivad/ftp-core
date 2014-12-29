var test = require('tape')
  , returnCodes = require('ftp-return-codes')
  , EventEmitter = require('events').EventEmitter
var serverBehaviour = require('../server-behaviour')
  , generateLines = require('../generate-lines')
  , ServerCommands = require('../server-commands')

test('that the USER command emits correctly', function(t) {
	var clientEmitter = new EventEmitter()
	var serverBehaviorObject = ServerCommands({})
	var server = serverBehaviour(serverBehaviorObject, clientEmitter, returnCodes)

	t.plan(2)

	server.on('response', function(responseNumber, message) {
		t.equals(responseNumber, 230)
		t.equals(message, generateLines(230, returnCodes['230']))
		server.stop()
		t.end()
	})

	clientEmitter.emit('USER', 'anonymous')
})

test('that the FEAT command emits correctly', function(t) {
	var clientEmitter = new EventEmitter()
	var serverBehaviorObject = ServerCommands({})
	var server = serverBehaviour(serverBehaviorObject, clientEmitter, returnCodes)

	t.plan(2)

	server.on('response', function(responseNumber, message) {
		t.equals(responseNumber, 211)
		t.equals(message, generateLines(211, [ 'Features:', 'USER', 'FEAT', 'PWD', 'CWD', 'End' ]))
		server.stop()
		t.end()
	})

	clientEmitter.emit('FEAT')
})

test('that the PWD command emits correctly', function(t) {
	var clientEmitter = new EventEmitter()
	var serverBehaviorObject = ServerCommands({})
	var server = serverBehaviour(serverBehaviorObject, clientEmitter, returnCodes)

	t.plan(2)

	server.on('response', function(responseNumber, message) {
		t.equals(responseNumber, 257)
		t.equals(message, generateLines(257, '"/" is current directory.'))
		server.stop()
		t.end()
	})

	clientEmitter.emit('PWD')
})

test('that the CWD command emits correctly', function(t) {
	var clientEmitter = new EventEmitter()
	var serverBehaviorObject = ServerCommands({})
	var server = serverBehaviour(serverBehaviorObject, clientEmitter, returnCodes)

	t.plan(2)

	server.on('response', function(responseNumber, message) {
		t.equals(responseNumber, 257)
		t.equals(message, generateLines(257, '"/test" is current directory.'))
		server.stop()
		t.end()
	})

	clientEmitter.emit('CWD', '/test')
})

test('that the CWD command emits correctly for missing folder paths', function(t) {
	var clientEmitter = new EventEmitter()
	var serverBehaviorObject = ServerCommands({})
	var server = serverBehaviour(serverBehaviorObject, clientEmitter, returnCodes)

	t.plan(2)

	server.on('response', function(responseNumber, message) {
		t.equals(responseNumber, 250)
		t.equals(message, '250 Broken client detected, missing argument to CWD. "/" is current directory.\r\n')
		server.stop()
		t.end()
	})

	clientEmitter.emit('CWD')
})

