var FtpCoreObject = require('./ftp-require-object')
var extensions = {
	USER: require('./ftp-extension-anonymous-user')
}

module.exports = function FtpCoreCompilation(socketCreator) {
	var ftp = new FtpCoreObject(socket)

	Object.keys(extensions).forEach(function(extension) {
		if (typeof extensions[extension] === 'function') {
			extensions[extension](ftp)
		}
	})

	return ftp
}
