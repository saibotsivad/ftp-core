module.exports = function FtpExtendUser() {
	var userName
	return {
		commands: {
			USER: function(ftpCore, user) {
				process.nextTick(function() {
					if (user === 'anonymous') {
						userName = user
						ftpCore.sendControlResponse(230, [ 'Logged in as "' + userName + '".' ])
					} else {
						ftpCore.sendControlResponse(530, [ 'Anonymous login requires the user name "anonymous".' ])
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
