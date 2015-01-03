var test = require('tape')
var FTP = require('../')
var FtpUser = require('../extension/user')

// TODO: Every instance that mentions RFC specs needs to be verified with the actual RFC.

test('USER command response is valid', function(t) {
	var rfcValidUserNames = [
		'bob',
		'alice',
		'anonymous',
		'user name',
		'acceptable characters !@#$%^^&&*(()_+' // I don't actually know?
	]

	rfcValidUserNames.forEach(function(userName) {
		t.test('Testing for valid USER response with user ' + userName, function(t) {
			var testFTP = new FTP().extend(FtpUser())

			testFTP.callCommand('USER', userName).then(function(output) {
				var parsed = /^(\d+) (.+)/.exec(output)
				t.ok(parsed)
				var number = parseInt(parsed[1], 10)
				var string = parsed[2]
				t.ok(number === 230 || number === 530, 'RFC 959 expects one of these server response codes')

				if (number === 230) {
					t.ok(testFTP.core.isAuthenticated(), '230 response means they should be authenticated')
					t.equals(testFTP.core.getUserName(), userName, 'the authenticated user name should exactly match')
					var regex = /\s"[^"]+"/g // RFC 959 expects user names to be double quotes

					t.ok(regex.test(string), 'RFC 959 expects one user name')
					t.notOk(regex.test(string), 'RFC 959 expects *only* one user name')
				} else {
					t.notOk(testFTP.core.isAuthenticated(), '530 response means they should not be authenticated')
				}

				t.end()
			})
		})
	})

	t.end()
})
