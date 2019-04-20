#!/bin/sh -l

echo "{\"token\":\"$ZEM_TOKEN\"}" > $HOME/.zemrc
sh -c "npm install -g zem && zem $*"