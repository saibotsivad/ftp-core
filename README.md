# ftp-core

A minimal, hopefully unopinionated implementation of FTP in JavaScript.

### This is a work-in-progress.

Ideally, this will provide *only* the minimum framework to have a
functional FTP server, and if you wanted to implement another common
FTP extension it'd be really easy.

Not sure what sort of hooks are required, at the moment.

The goal is to not use a FS for the backend, but to wire it up
so you pass in a levelup object.

Then, there'd be an FS-based levelup db, so you can use that if
you want a normal FTP server off the filesystem.

If you check out the server-behaviour, you'll see it's a thin wrapper
on an emitter to take a "commands" object.

Currently that "commands" object is like this:

	{
		COMMAND: function(args, callback) {}
	}

Now the `args` is what you'd get from the client, so for example
if the FTP server got this command

	USER anonymous

This would call the "commands" object `USER` function, and `args`
would simply be `anonymous`.

It's up to each command function to parse and interpret the argument
string.

At the end of doing anything, the callback is given a number of arguments
like this:

	callback(230)

or

	callback(230 'welcome to my server')

or even

	callback(230, 'first line of message', 'second line of message')

And this is interpreted into the appropriate string to be given
back to the client, formatted according to the FTP specs.

## get involved?

you could make issues, if you think of something

or you could try contributing code, if you've got some free time

I'm pretty easy to work with.

## FTP commands (from wikipedia)

* `ABOR`: Abort an active file transfer.
* `ACCT`: Account information.
* `ADAT`: Authentication/Security Data
* `ALLO`: Allocate sufficient disk space to receive a file.
* `APPE`: Append.
* `AUTH`: Authentication/Security Mechanism
* `CCC`: Clear Command Channel.
* `CDUP`: Change to Parent Directory.
* `CONF`: Confidentiality Protection Command
* `CWD`: Change working directory.
* `DELE`: Delete file.
* `ENC`: Privacy Protected Channel
* `EPRT`: Specifies an extended address and port to which the server should connect.
* `EPSV`: Enter extended passive mode.
* `FEAT`: Get the feature list implemented by the server.
* `HELP`: Returns usage documentation on a command if specified, else a general help document is returned.
* `LANG`: Language Negotiation
* `LIST`: Returns information of a file or directory if specified, else information of the current working directory is returned. If the server supports the '-R' command (e.g. 'LIST -R') then a recursive directory listing will be returned.
* `LPRT`: Specifies a long address and port to which the server should connect.
* `LPSV`: Enter long passive mode.
* `MDTM`: Return the last-modified time of a specified file.
* `MIC`: Integrity Protected Command
* `MKD`: Make directory.
* `MLSD`: Lists the contents of a directory if a directory is named.
* `MLST`: Provides data about exactly the object named on its command line and no others.
* `MODE`: Sets the transfer mode (Stream, Block, or Compressed).
* `NLST`: Returns a list of file names in a specified directory.
* `NOOP`: No operation (dummy packet; used mostly as keepalives).
* `OPTS`: Select options for a feature.
* `PASS`: Authentication password.
* `PASV`: Enter passive mode.
* `PBSZ`: Protection Buffer Size
* `PORT`: Specifies an address and port to which the server should connect.
* `PROT`: Data Channel Protection Level
* `PWD`: Print working directory. Returns the current directory of the host.
* `QUIT`: Disconnect.
* `REIN`: Re-initialize the connection.
* `REST`: Restart transfer from the specified point.
* `RETR`: Retrieve a copy of the file.
* `RMD`: Remove a directory.
* `RNFR`: Rename from.
* `RNTO`: Rename to.
* `SITE`: Sends site specific commands to remote server.
* `SIZE`: Return the size of a file.
* `SMNT`: Mount file structure.
* `STAT`: Returns the current status.
* `STOR`: Accept data and store data as a file at the server site.
* `STOU`: Store file uniquely.
* `STRU`: Set file transfer structure.
* `SYST`: Return system type.
* `TYPE`: Sets the transfer mode (ASCII/binary).
* `USER`: Authentication username.
* `XCUP`: Change to the parent of the current working directory.
* `XMKD`: Make directory.
* `XPWD`: Print current working directory.
* `XRCP`: XRMD: Remove directory.
* `XRSQ`: XSEM: Send, mail if cannot.
* `XSEN`: Send to terminal.

## License

Released under the [VOL](http://veryopenlicense.com).
