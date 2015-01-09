var test = require('tape')
var validator = require('ftp-validate-response')
var Ftp = require('../')
var FtpUser = require('../extension/user')

test('callback: anonymous user is authenticated', function(t) {
	t.plan(5)

	var ftp = new Ftp().extend(FtpUser())

	ftp.callCommand('USER', 'anonymous', function(err, response) {
		t.notOk(err, 'there should not be an error')
		t.ok(validator(response), 'response should be valid')
		t.equal(response.indexOf('230 '), 0, '230 response')
		t.ok(ftp.core.getUserName(), 'has a username')
		t.ok(ftp.core.isAuthenticated(), 'is authenticated')
		t.end()
	})
})

test('callback: JohnDoe user is not authenticated', function(t) {
	t.plan(5)

	var ftp = new Ftp().extend(FtpUser())

	ftp.callCommand('USER', 'JohnDoe', function(err, response) {
		t.notOk(err, 'there should not be an error')
		t.ok(validator(response), 'response should be valid')
		t.equal(response.indexOf('530 '), 0, '530 response')
		t.notOk(ftp.core.getUserName(), 'no username')
		t.notOk(ftp.core.isAuthenticated(), 'not authenticated')
		t.end()
	})
})

test('promise: anonymous user is authenticated', function(t) {
	t.plan(4)

	var ftp = new Ftp().extend(FtpUser())

	ftp.callCommand('USER', 'anonymous').then(function(response) {
		t.ok(validator(response), 'response should be valid')
		t.equal(response.indexOf('230 '), 0, '230 response')
		t.ok(ftp.core.getUserName(), 'has a username')
		t.ok(ftp.core.isAuthenticated(), 'is authenticated')
		t.end()
	})
})

test('promise: JohnDoe user is not authenticated', function(t) {
	t.plan(4)

	var ftp = new Ftp().extend(FtpUser())

	ftp.callCommand('USER', 'JohnDoe').then(function(response) {
		t.ok(validator(response), 'response should be valid')
		t.equal(response.indexOf('530 '), 0, '530 response')
		t.notOk(ftp.core.getUserName(), 'no username')
		t.notOk(ftp.core.isAuthenticated(), 'not authenticated')
		t.end()
	})
})
