var test = require('tape')
var Ftp = require('../')
var FtpUser = require('../extension/user')

test('anonymous user is authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp().extend(FtpUser())

	ftp.callCommand('USER', 'anonymous', function(err, response) {
		t.equal(response.indexOf('230 '), 0, '230 response')
		t.ok(ftp.core.getUserName(), 'has a username')
		t.ok(ftp.core.isAuthenticated(), 'is authenticated')
		t.end()
	})
})

test('JohnDoe user is not authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp().extend(FtpUser())

	ftp.callCommand('USER', 'JohnDoe').then(function(response) {
		t.equal(response.indexOf('530 '), 0, '530 response')
		t.notOk(ftp.core.getUserName(), 'no username')
		t.notOk(ftp.core.isAuthenticated(), 'not authenticated')
		t.end()
	})
})
