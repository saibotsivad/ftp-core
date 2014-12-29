# ftp-core

A minimal, hopefully unopinionated implementation of FTP in JavaScript.

This is a work-in-progress.

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

I'm pretty easy to work with

## License

Released under the [VOL](http://veryopenlicense.com).
