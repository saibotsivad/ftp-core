var test = require('tape')
var validator = require('ftp-validate-response')
var FTP = require('../')
var FtpUser = require('../extension/user')

// Based on RFC 959, see:
// https://tools.ietf.org/html/rfc959#page-47
// https://tools.ietf.org/html/rfc959#page-26

test('USER command response is valid', function(t) {
	var rfcValidUserNames = [ // any ASCII character 32-126
		'bob',
		'alice',
		'anonymous',
		'user with spaces',
		// allowed characters:
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
		'`-=~!@#$%^&*()_+[]{}|;:",./<>?',
		'also \\ and \''
	]

	rfcValidUserNames.forEach(function(userName) {
		t.test('Testing for valid USER response with user ' + userName, function(t) {
			var testFTP = new FTP().extend(FtpUser())

			testFTP.callCommand('USER', userName).then(function(output) {
				t.ok(validator(output), 'response should be valid')

				var parsed = /^(\d{3}) (.+)\r\n/.exec(output)
				t.ok(parsed, 'the response code is three digits followed by a space, ending with <CRLF>')

				var number = parseInt(parsed[1], 10)
				var string = parsed[2]

				var validResponseCodes = [ 230, 530, 500, 501, 421, 331, 332 ] // https://tools.ietf.org/html/rfc959#page-50
				t.ok(validResponseCodes.indexOf(number) >= 0, 'RFC 959 expects one of these server response codes')

				if (number === 230) {
					t.ok(testFTP.core.isAuthenticated(), '230 response means they should be authenticated')
					t.equals(testFTP.core.getUserName(), userName, 'the authenticated user name should exactly match')
				} else {
					t.notOk(testFTP.core.isAuthenticated(), 'any response other than 230 means they should not be authenticated')
				}

				t.end()
			})
		})
	})

	t.end()
})
