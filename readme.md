# ftp-core

A minimal, hopefully unopinionated implementation of FTP in JavaScript.

## This is a work-in-progress.

The goal is to provide the most minimum (but complete) framework needed
to have a functional FTP object.

Commands like `USER` and `CWD` are part of the "core" FTP specs (i.e., 
see [RFC 959](https://tools.ietf.org/html/rfc959)), but even they are
not implemented in the core.

Each FTP command--also called an "extension"--is a distinct npm module,
and you call the different modules to extend this core module, e.g.
something like this:

	var Ftp = require('ftp-core')
	var FtpUser = require('ftp-extension-user')
	var Socket = require('ftp-normal-sockets')

	var myFtp = new Ftp()
		.extend(FtpUser())
		.extend(Socket({ listen: 21 }))

## The goal

The goal with this core, and with the main extensions developed to
make it useful, is this:

1. Keep it simple enough (or "well abstracted", possibly) so that a
	developer can read through each module to see what the FTP RFC
	actually requires, programmatically.
2. Don't require an FS for the backend. (Should be able to easily use
	something like [levelup](https://www.npmjs.com/package/levelup) or
	even a browser's local storage.)
3. Implementing existing or new FTP extensions should be easy and
	sensible. Adding an extension should be as easy as making a
	new levelup extension, or even easier.
4. Don't require OS/node socket literals. (Should be able to create a
	thin wrapper for the socket implementation that uses the OS/node
	sockets, or one that uses WebSockets, or anything else.)

## Road map thingy

* Get the core written and tested. Mostly done, thanks to @TehShrike
* Get a primary group of extensions created and thoroughly tested, so
	that we can see what parts of the internal API are missing.
* The goal of these primary extensions is whatever is needed to create
	a functional anonymous FTP server. User authentication is not a
	primary extension.
* For each of the primary extensions, create them as npm modules, and
	make two kinds of tests:
	1. tests that are generic, and re-usable in any other module, to
		see if the extension is RFC compliant
	2. tests that functionally validate the actual extension

According to [RFC 5797](https://tools.ietf.org/html/rfc5797#page-4) (which
I understand to have superseded RFC 959) the "base FTP commands" are:

* Mandatory:
	- ABOR
	- ACCT
	- ALLO
	- APPE
	- CWD
	- DELE
	- HELP
	- LIST
	- MODE
	- NLST
	- NOOP
	- PASS
	- PASV
	- PORT
	- QUIT
	- REIN
	- REST
	- RETR
	- RNFR
	- RNTO
	- SITE
	- STAT
	- STOR
	- STRU
	- TYPE
	- USER
* Optional:
	- CDUP
	- MKD
	- PWD
	- RMD
	- SMNT
	- STOU
	- SYST

However, the primary extensions are, as I see them:

* USER
* FEAT
* CWD
* PWD
* LIST / MLSD / MLST (are these all the same?)
* PASV / EPSV / PORT (LPSV and LPRT are obsolete, according to RFC 5797)
* NOOP
* QUIT
* RETR
* REST
* SIZE
* STAT
* TYPE

As soon as all that is done, the next goal would be getting AUTH working.

Getting AUTH TLS / AUTH SSH working *and tested* is going to be rather
tricky, I feel, but hopefully it can be abstracted away enough to be
easy-ish...

It would probably also be good to make a very simple USER/PASS extension
that uses levelup for the user database? I don't personally have a use for
it, but I imagine others might find it useful.

## Get involved?

you could make issues, if you think of something that is missing

or you could contribute code, if you've got some free time

I'm pretty easy to work with, and I like community!

## Developer notes

It is up to the developer to generate valid FTP strings as responses inside
extensions. If you are doing normal string responses, you can use something like
[ftp-generate-response](https://github.com/sdmp/ftp-generate-response) to make
RFC compliant responses.

Internally, we may make use of something like [ftp-validate-response](https://github.com/sdmp/ftp-validate-response)
to verify that all response strings are RFC compliant. This isn't being done now, but it might be added in the future?

## License

Everything in this repository, and all contributions to is are released
under the [VOL](http://veryopenlicense.com).

	Very Open License (VOL)

	The contributor(s) to this creative work voluntarily grant permission
	to any individual(s) or entities of any kind
	- to use the creative work in any manner,
	- to modify the creative work without restriction,
	- to sell the creative work or derivatives thereof for profit, and
	- to release modifications of the creative work in part or whole under any license
	with no requirement for compensation or recognition of any kind.
