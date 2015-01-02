var FtpCore = require('./ftp-core')
var FtpUser = require('./ftp-extend-user')

module.exports = function FtpImpl(socket, socketCreator) {
	var ftpCore = new FtpCore(socketCreator)
	var ftp = FtpUser(ftpCore)
	return ftp
}








var FtpCore = require('./ftp-core')
var FtpUser = require('./ftp-extend-user')
var FtpFeat = require('./ftp-extend-feat')

var FtpSocket = require('./ftp-socket')

var myCore = new FtpCore()
	.extend(FtpUser())
	.extend(FtpFeat())

FtpSocket(myCore)
