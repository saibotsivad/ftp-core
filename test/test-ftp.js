var test = require('tape').test
var Ftp = require('../')
var Promise = require('promise')

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
		t.plan(2)

		var ftp = new Ftp().extend({
			commands: {
				BUTTS: function(core, input, cb) {
					cb(null, 'butts indeed')
				}
			}
		})

		ftp.callCommand('BUTTS', 'something').then(function(res) {
			t.equal(res, 'butts indeed', 'The function was put onto the main commands object')

			var secondObject = ftp.extend({
				commands: {
					BUTTS: function(core, input, cb) {
						cb(null, 'a new implementation')
					}
				}
			})

			secondObject.callCommand('BUTTS', 'wat').then(function(res) {
				t.equal(res, 'a new implementation', 'The BUTTS commands was overwritten by the second extend call')

				t.end()
			})
		})
	})

	t.test('Calling extend without an object should throw an error', function(t) {
		function callExtend(arg) {
			t.throws(function() {
				new Ftp().extend(arg)
			})
		}

		callExtend()
		callExtend('')
		callExtend(13)
		callExtend(null)

		t.end()
	})

	t.test('Calling an unimplemented command should throw an error', function(t) {
		t.plan(2)

		var ftp = new Ftp()
		ftp.callCommand('BUTTS', 'does not exist').catch(function() {
			t.pass('promise rejected')
		})

		var ftp = new Ftp()
		ftp.callCommand('BUTTS', 'does not exist', function(err) {
			t.ok(err, 'error should exist')
		})
	})

	t.test('Calling a command with a callback', function(t) {
		t.plan(2)
		var ftp = new Ftp().extend({
			commands: {
				TEST: function() {
					return Promise.resolve('test response')
				}
			}
		})

		ftp.callCommand('TEST', 'huh', function(err, res) {
			t.notOk(err, 'No error')
			t.equal(res, 'test response', 'correct response')
			t.end()
		})
	})

	t.test('Calling a command with a promise', function(t) {
		t.plan(1)
		var ftp = new Ftp().extend({
			commands: {
				TEST: function() {
					return Promise.resolve('test response')
				}
			}
		})

		ftp.callCommand('TEST', 'wat').then(function(res) {
			t.equal(res, 'test response', 'correct response')
			t.end()
		})
	})

	t.end()
})
