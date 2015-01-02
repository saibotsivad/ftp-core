module.exports = function FtpCoreObject(socketCreator) {
	var coreObject = {
		commands: {}, // place all commands as uppercase ASCII functions here

		userName: undefined,
		userIsAuthenticated: false,

		controlConnection: undefined,
		dataConnection: undefined,

		createControlConnection: function createControlConnection(ipAddress, port) {
			coreObject.controlConnection = socketCreator.createConnection(ipAddress, port)
		},
		createDataConnection: function createDataConnection(ipAddress, port) {
			coreObject.dataConnection = socketCreator.createConnection(ipAddress, port)
		},

		writeControl: function(string) {
			if (coreObject.controlConnection) {
				coreObject.controlConnection.write(string)
			}
		}

	}

	return coreObject
}
