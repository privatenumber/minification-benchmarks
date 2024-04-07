<?php

include(__DIR__ . '/../../vendor/autoload.php');

$code = stream_get_contents(STDIN);

try {
	$minifiedCode = \JShrink\Minifier::minify($code);
	fwrite(STDOUT, $minifiedCode);
} catch (\Exception $e) {
	fwrite(STDERR, $e);
	exit(1);
}

exit(0);
