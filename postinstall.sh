#!/bin/sh

# this shell script will need wsl on windows, but bina already requires that

bina tdewolff/minify --install-dir node_modules/.bin

# TODO this isn't ideal but i can't find any other way to do it
cargo install minifier --no-track --root node_modules/.bin/cargo
echo "note: ignore the cargo warnings about PATH, that's corrected automatically"

# move cargo binaries
mv node_modules/.bin/cargo/bin/* node_modules/.bin
rm -r node_modules/.bin/cargo
