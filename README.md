bikemaps
=========

# Google Maps tailored for bike route planning

I've been frustrated with some odd restrictions that the New Google Maps has; most of all with not being able to view terrain while getting bike directions.  I decided to roll my own alternative using their API, and this is my work in progress.  You can see it in operation at http://eldan.co.uk/bikemaps/

## Deploying your own version.

If you have a server than can host PHP files:

1. Get an API key by following the instructions at https://developers.google.com/maps/documentation/javascript/tutorial#api_key
2. Put all the files in one directory on the server.
3. Add a file called `APIloader.php` which will load the Google Maps JavaScript API using your key.  It should look like this - just replace `XXXXX` with the API key:
```php
<script 
	type = "text/javascript"
	src = "https://maps.googleapis.com/maps/api/js?v=3.17&key=XXXXX"
>
</script>
```

If you don't have a server that can host PHP files, then do the following additional steps:
4. Rename `index.php` to `index.html`
5. Replace `<?php require_once("./APIloader.php"); ?>` in `index.html` with the contents of the file as above.

## Contributing

This has turned into a larger project than I had anticipated (you're shocked, I'm sure) so I decided to put something up even though it's unfinished. There are at least three ways you can help things along:

1. Fix one or more of the issues listed at https://github.com/eldang/bikemaps/issues
2. Add feature requests and bug reports to https://github.com/eldang/bikemaps/issues
3. Just let me know that you're using it!  The more interest I see in this, the more likely I am to spend the time improving it.