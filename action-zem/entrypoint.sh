#!/bin/sh -l

echo "{\"token\":\"$ZEM_TOKEN\"}" > $HOME/.zemrc
echo $GITHUB_WORKSPACE
echo $HOME
sh -c "npm install -g zem && zem $*"