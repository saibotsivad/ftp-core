var test = require('tape')
var Ftp = require('../')
var FtpUser = require('../extension/user')

test('anonymous user is authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp().extend(FtpUser()).extend({
		core: {
			sendControlResponse: function(number, lines) {
				t.equals(number, 230)
				t.ok(ftp.core.getUserName(), 'has a username')
				t.ok(ftp.core.isAuthenticated(), 'is authenticated')
				t.end()
			}
		}
	})

	ftp.commands.USER(ftp.core, 'anonymous')
})

test('JohnDoe user is not authenticated', function(t) {
	t.plan(3)

	var ftp = new Ftp().extend(FtpUser()).extend({
		core: {
			sendControlResponse: function(number, lines) {
				t.equals(number, 530)
				t.notOk(ftp.core.getUserName(), 'no username')
				t.notOk(ftp.core.isAuthenticated(), 'not authenticated')
				t.end()
			}
		}
	})

	ftp.commands.USER(ftp.core, 'JohnDoe')
})
