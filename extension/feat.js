var generate = require('ftp-generate-response')
var Promise = require('promise')

// According to RFC 5797, which is understood to supercede RFC 959, these
// are the following extensions considered "mandatory", and therefore are
// not included in most FEAT lists.
// see: https://tools.ietf.org/html/rfc5797#page-4
var extensionsNotListed = [
	'ABOR',
	'ACCT',
	'ALLO',
	'APPE',
	'CWD',
	'DELE',
	'HELP',
	'LIST',
	'MODE',
	'NLST',
	'NOOP',
	'PASS',
	'PASV',
	'PORT',
	'QUIT',
	'REIN',
	'REST',
	'RETR',
	'RNFR',
	'RNTO',
	'SITE',
	'STAT',
	'STOR',
	'STRU',
	'TYPE',
	'USER'
]

module.exports = function FtpExtendFeat() {
	return {
		commands: {
			FEAT: function(ftp, ignored) {
				return new Promise(function(resolve) {
					if (ftp.isAuthenticated()) {
						var commands = ftp.getAllCommandNames().filter(function(command) {
							return extensionsNotListed.indexOf(command) === -1 
						})
						var lines = ['Features:'].concat(commands).concat('End')
						resolve(generate(211, lines))
					} else {
						resolve(generate(530, 'User is not logged in.'))
					}
				})
			}
		}
	}
}
