module.exports = function ftpExtensionAnonymousUser(core) {
	if (!core) {
		throw new Error('you must pass an ftp-core object to USER()')
	}

	core.commands.USER = function(userName, callback) {
		core._userName = 'anonymous'
		core._userIsAuthenticated = true
		callback(230, 'Logged in as anonymous user.')
	}
}