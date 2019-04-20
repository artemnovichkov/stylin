#!/bin/sh -l

echo "{\"token\":\"$ZEM_TOKEN\"}" > $GITHUB_WORKSPACE/.zemrc
sh -c "npm install -g zem && zem $*"