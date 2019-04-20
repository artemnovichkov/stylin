#!/bin/sh -l

echo "{\"token\":\"$ZEM_TOKEN\"}" > $GITHUB_WORKSPACE/.zemrc
echo "{\"token\":\"$TEST_TOKEN\"}"
sh -c "npm install -g zem && zem $*"