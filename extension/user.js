module.exports = function FtpExtendUser() {
	var userName
	return {
		commands: {
			USER: function(core, user) {
				process.nextTick(function() {
					if (user === 'anonymous') {
						userName = user
						core.sendControlResponse(230, [ 'Logged in as "' + userName + '".' ])
					} else {
						userName = undefined
						core.sendControlResponse(530, [ 'Anonymous login requires the user name "anonymous".' ])
					}
				})
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
