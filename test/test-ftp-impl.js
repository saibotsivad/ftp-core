var test = require('tape').test
var Ftp = require('../ftp-impl')

var socketCreator = {
	createConnection: function(ipAddress, port) {
		// do something
	}
}

test('anonymous user is not authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp(socketCreator)
	ftp.commands.USER('anonymous', function(responseNumber, message) {
		t.equals(responseNumber, 530)
		t.notOk(ftp.userName)
		t.notOk(ftp.userIsAuthenticated)
		t.end()
	})	
})

test('JohnDoe user is authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp(socketCreator)
	ftp.commands.USER('JohnDoe', function(responseNumber, message) {
		t.equals(responseNumber, 230)
		t.equals(ftp.userName, 'JohnDoe')
		t.ok(ftp.userIsAuthenticated)
		t.end()
	})	
})

test('JaneDoe user is not authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp(socketCreator)
	ftp.commands.USER('JaneDoe', function(responseNumber, message) {
		t.equals(responseNumber, 530)
		t.notOk(ftp.userName)
		t.notOk(ftp.userIsAuthenticated)
		t.end()
	})	
})
