module.exports = function generateResponseString(responseNumber, lines) {
	lines = lines || []
	if (typeof lines === 'string') {
		lines = [ lines ]
	}

	var response

	if (lines.length === 0) {
		response = responseNumber.toString()
	} else if (lines.length > 1) {
		var firstLine = responseNumber + '-' + lines.splice(0, 1)
		var allLinesExceptLast = lines.splice(0, lines.length - 1)
		var lastLine = responseNumber + ' ' + lines.splice(0)
		response = firstLine + '\r\n'
			+ (allLinesExceptLast.length > 0 ? ' ' + allLinesExceptLast.join('\r\n ') + '\r\n' : '')
			+ lastLine
	} else {
		response = response = responseNumber + ' ' + lines[0]
	}

	response = response + '\r\n'

	return response
}
