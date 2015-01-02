var test = require('tape').test
var Ftp = require('../')

test('extending the server', function(t) {
	t.test('extending a core API function', function(t) {
		var initialFtp = new Ftp()

		t.notOk(initialFtp.core.isAuthenticated(), 'The default isAuthenticated method should return falsey')

		var ftp = initialFtp.extend({
			core: {
				isAuthenticated: function isAuthenticated() {
					return true
				}
			}
		})

		t.notOk(initialFtp.core.isAuthenticated(), 'The original ftp object\'s isAuthenticated method should still return falsey')
		t.ok(ftp.core.isAuthenticated(), 'Our overwritten function returns true')

		t.end()
	})

	t.test('implementing a new command, then overwriting it', function(t) {
		var ftp = new Ftp().extend({
			commands: {
				BUTTS: function() {
					return 'butts indeed'
				}
			}
		})

		t.equal(ftp.commands.BUTTS(), 'butts indeed', 'The function was put onto the main commands object')

		var secondObject = ftp.extend({
			commands: {
				BUTTS: function() {
					return 'a new imlementation'
				}
			}
		})

		t.equal(secondObject.commands.BUTTS(), 'a new imlementation', 'The BUTTS commands was overwritten by the second extend call')

		t.end()
	})

	t.end()
})

test('the default core API', function(t) {
	// ?

	t.end()
})
