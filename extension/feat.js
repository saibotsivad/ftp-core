var extensionsNotListed = [
	'CWD',
	'PWD'
	// Check RFC 959 for this list
]

module.exports = function FtpExtendFeat() {
	return {
		commands: {
			FEAT: function(ftpCore) {
				if (ftpCore.isAuthenticated()) {
					var commands = ftpCore.getAllCommandNames().filter(function(command) {
						return extensionsNotListed.indexOf(command) === -1 
					})
					var lines = ['Features:'].concat(commands).concat('End')
					ftpCore.sendControlResponse(211, lines)
				}
			}
		}
	}
}
