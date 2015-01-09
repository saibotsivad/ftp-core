module.exports = function FtpExtendUser() {
	var userName
	return {
		commands: {
			USER: function(core, user, cb) {
				if (user === 'anonymous') {
					userName = user
					cb(null, '230 Logged in as "' + userName + '".\r\n')
				} else {
					userName = undefined
					cb(null, '530 Anonymous login requires the user name "anonymous".\r\n')
				}
			}
		},
		core: {
			isAuthenticated: function() {
				return typeof userName !== 'undefined'
			},
			getUserName: function() {
				return userName
			}
		}
	}
}
