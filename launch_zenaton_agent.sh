#!/bin/sh

set -e

# Start zenaton agent
zenaton start
zenaton listen --env=worker/.env --boot=worker/boot.js

# Start web application
npm start