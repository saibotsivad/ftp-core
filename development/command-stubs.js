/*
	
*/
module.exports = {
	ABOR: function() {}, // Abort an active file transfer.
	ACCT: function() {}, // Account information
	ADAT: function() {}, // Authentication/Security Data (RFC 2228)
	ALLO: function() {}, // Allocate sufficient disk space to receive a file.
	APPE: function() {}, // Append.
	AUTH: function() {}, // Authentication/Security Mechanism (RFC 2228)
	CCC:  function() {}, // Clear Command Channel (RFC 2228)
	CDUP: function() {}, // Change to parent directory
	CONF: function() {}, // Confidentiality Protection Command (RFC 697)
	CWD:  function() {}, // Change working directory
	DELE: function() {},
	ENC:  function() {}, // Privacy Protected Channel (RFC 2228)
	EPRT: function() {}, // Specifies an extended address and port to which the server should connect. (RFC 2428)
	EPSV: function() {}, // Enter extended passive mode. (RFC 2428)
	FEAT: function() {}, // Get the feature list implemented by the server.
	HELP: function() {}, // Returns usage documentation on a command if specified, else a general help document is returned.
	LANG: function() {}, // Language Negotiation (RFC 2640)
	LIST: function() {}, // List files on filesystem
	LPRT: function() {}, // Specifies a long address and port to which the server should connect. (RFC 1639)
	LPSV: function() {}, // Enter long passive mode. (RFC 1639)
	MDTM: function() {}, // Return the last-modified time of a specified file. (RFC 3659)
	MIC:  function() {}, // Integrity Protected Command (RFC 2228)
	MKD:  function() {}, // Make directory.
	MLSD: function() {}, // Lists the contents of a directory if a directory is named. (RFC 3659)
	MLST: function() {}, // Provides data about exactly the object named on its command line, and no others. (RFC 3659)
	MODE: function() {}, // Sets the transfer mode (Stream, Block, or Compressed).
	NLST: function() {},
	NOOP: function() {}, // No operation (dummy packet; used mostly on keepalives).
	OPTS: function() {}, // Select options for a feature. (RFC 2389)
	PASS: function() {}, // Password
	PASV: function() {}, // Enter passive mode
	PBSZ: function() {}, // Protection Buffer Size (RFC 2228)
	PORT: function() {},
	PWD:  function() {}, // Get working directory
	QUIT: function() {},
	REIN: function() {}, // Re initializes the connection.
	REST: function() {},
	RETR: function() {},
	RMD:  function() {}, // Remove a directory.
	RNFR: function() {},
	RNTO: function() {},
	SITE: function() {}, // Sends site specific commands to remote server.
	SMNT: function() {}, // Mount file structure.
	STAT: function() {}, // Returns the current status.
	STOR: function() {},
	STOU: function() {}, // Store file uniquely.
	STRU: function() {}, // Set file transfer structure.
	SYST: function() {},
	TYPE: function() {}, // Change data encoding
	USER: function() {}, // Username
	XPWD: function() {} // Alias to PWD
}
