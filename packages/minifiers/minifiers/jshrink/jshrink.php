<?php

include(__DIR__ . '/../../vendor/autoload.php');

$code = stream_get_contents(STDIN);

$minifiedCode = \JShrink\Minifier::minify($code);

fwrite(STDOUT, $minifiedCode);
