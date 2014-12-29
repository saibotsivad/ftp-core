var test = require('tape')
var generateLines = require('../generate-lines')

test('when only a number', function(t) {
	t.equals(generateLines(100), '100\r\n')
	t.end()
})

test('when number is a string', function(t) {
	t.equals(generateLines('100'), '100\r\n')
	t.end()
})

test('when lines is a single string', function(t) {
	t.equals(generateLines(100, 'test'), '100 test\r\n')
	t.end()
})

test('when lines is an array with one entry', function(t) {
	t.equals(generateLines(100, [ 'test' ]), '100 test\r\n')
	t.end()
})

test('when lines is an array with two entries', function(t) {
	t.equals(generateLines(100, ['first', 'second']), '100-first\r\n100 second\r\n')
	t.end()
})

test('when lines is an array with three entries', function(t) {
	t.equals(generateLines(100, ['first', 'second', 'third']), '100-first\r\n second\r\n100 third\r\n')
	t.end()
})
