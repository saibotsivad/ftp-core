var test = require('tape')
var validator = require('ftp-validate-response')
var FTP = require('../')
var FtpFeat = require('../extension/feat')
var FtpUser = require('../extension/user')

// Based on RFC 959 and RFC 5797

var commandsRequiredInAllFeatResponses = [
	'UTF8'
]

test('FEAT command response is valid', function(t) {
	var testFTP = new FTP().extend(FtpFeat()).extend(FtpUser())

	testFTP.callCommand('FEAT').then(function(output) {
		t.ok(validator(output), 'response should be valid')

		var parsed = /^(\d{3}) (.+)\r\n/.exec(output)
		var number = parseInt(parsed[1], 10)
		var validResponseCodes = [ 230, 530 ]
		t.ok(validResponseCodes.indexOf(number) >= 0, 'RFC 959/5797 expects one of these server response codes')

		if (number === 230) {
			var commands = getListOfFeatures(output)
			var requiredCommandsAreInResponse = commandsRequiredInAllFeatResponses.every(function(command) {
				return commands.any(function(responseCommand) {
					return responseCommand.indexOf(command) === 0
				})
			})
			t.ok(requiredCommandsAreInResponse, 'all required commands exist in the response')
		}
		t.end()
	})
})

function getListOfFeatures(string) {
	var lines = string.split('\r\n')
	// the first and last lines are ignored
	// TODO: check if this is an RFC spec, because everybody does it
	return lines.slice(1, lines.length - 2).map(function(line) {
		// Although not required in any RFC I have read, most implementations
		// insert whitespace before the command.
		return line.trim()
	})
}
