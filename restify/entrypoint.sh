#!/bin/sh

set -e

npm install

npm install -g nodemon

nodemon app.js
