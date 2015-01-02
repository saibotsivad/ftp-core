var test = require('tape').test
var FTP = require('../ftp-core')
var FtpUser = require('./ftp-extend-user')

// TODO: Every instance that mentions RFC specs needs to be verified with the actual RFC.

test('USER command response is valid', function(t) {
	var numberOfResponses = 0

	var rfcValidUserNames = [
		'bob',
		'alice',
		'anonymous',
		'user name',
		'acceptable characters !@#$%^^&&*(()_+' // I don't actually know?
	]

	var testFTP = new FTP()
		.extend(FtpUser())
		.extend({
			core: {
				sendControlResponse: function(number, lines) {
					t.equals(typeof number, 'number', 'first value must be a number')
					t.ok(Array.isArray(lines), 'second value must be an array')
					// although, an empty array is valid
					t.ok(lines.every(function(line) { return typeof line === 'string'}), 'every line must be a string')
					t.ok(number === 230 || number === 530, 'RFC 959 expects one of these server response codes')

					if (number === 230) {
						var regex = /\s"[^"]+"\s/ // RFC 959 expects user names to be space separated double quotes
						var string = lines.join('\n') // user names may not be split across newlines
						t.ok(regex.test(string), 'RFC 959 expects one user name')
						t.notOk(regex.test(string), 'RFC 959 expects *only* one user name')
					}

					numberOfResponses++
					if (numberOfResponses === rfcValidUserNames.length) {
						t.end()
					}
				}
			}
		})

	rfcValidUserNames.forEach(function(input) {
		testFTP.commands.USER(testFtp, input)
	})
})

test('anonymous user is not authenticated', function(t) {
	t.plan(3)

	var untitled = new Ftp(socketCreator)
	var ftp = FtpUser(untitled)
	ftp.commands.USER('anonymous', function(responseNumber, message) {
		t.equals(responseNumber, 530)
		t.notOk(ftp.userName)
		t.notOk(ftp.userIsAuthenticated)
		t.end()
	})	
})

test('JohnDoe user is authenticated', function(t) {
	t.plan(3)

	var untitled = new Ftp(socketCreator)
	var ftp = FtpUser(untitled)
	ftp.commands.USER('JohnDoe', function(responseNumber, message) {
		t.equals(responseNumber, 230)
		t.equals(ftp.userName, 'JohnDoe')
		t.ok(ftp.userIsAuthenticated)
		t.end()
	})	
})

test('JaneDoe user is not authenticated', function(t) {
	t.plan(3)

	var untitled = new Ftp(socketCreator)
	var ftp = FtpUser(untitled)
	ftp.commands.USER('JaneDoe', function(responseNumber, message) {
		t.equals(responseNumber, 530)
		t.notOk(ftp.userName)
		t.notOk(ftp.userIsAuthenticated)
		t.end()
	})	
})
