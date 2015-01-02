var test = require('tape').test
var FtpCore = require('../ftp-core')

var socketCreator = {
	createConnection: function(ipAddress, port) {
		// do something
	}
}

test('anonymous user is authenticated', function(t) {
	t.plan(3)

	var ftp = new FtpCore(socketCreator)
	ftp.commands.USER('anonymous', function(responseNumber, message) {
		t.equals(responseNumber, 230)
		t.equals(ftp.userName, 'anonymous')
		t.ok(ftp.userIsAuthenticated)
		t.end()
	})	
})

test('user of other name is not authenticated', function(t) {
	t.plan(3)

	var ftp = new FtpCore(socketCreator)
	ftp.commands.USER('JohnDoe', function(responseNumber, message) {
		t.equals(responseNumber, 530)
		t.equals(ftp.userName, undefined)
		t.notOk(ftp.userIsAuthenticated)
		t.end()
	})	
})

test('print working directory should initially be "/"', function(t) {
	t.plan(4)

	var ftp = new FtpCore(socketCreator)
	ftp.commands.USER('anonymous', function() {
		ftp.commands.PWD(null, function(responseNumber, message) {
			t.ok(ftp.userIsAuthenticated, 'user should be authenticated')
			t.equals(responseNumber, 257, 'return correct status')
			t.equals(ftp.currentDirectory, '/', 'internal directory value')
			t.ok(message.match(/"\/"/), 'message contains path according to RFC specs')
			t.end()
		})
	})	
})

test('set working directory should change value', function(t) {
	t.plan(4)

	var ftp = new FtpCore(socketCreator)
	ftp.commands.USER('anonymous', function() {
		ftp.commands.CWD('/test/path', function(responseNumber, message) {
			t.ok(ftp.userIsAuthenticated, 'user should be authenticated')
			t.equals(responseNumber, 257, 'return correct status')
			t.equals(ftp.currentDirectory, '/test/path', 'internal directory value')
			t.ok(message.match(/"\/test\/path"/), 'message contains path according to RFC specs')
			t.end()
		})
	})	
})
