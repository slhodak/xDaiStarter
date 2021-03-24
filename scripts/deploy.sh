#!/bin/bash

# Upload project to target host
username=$1
host=$2

scp ./dist/xds.tar.gz $username@$host:/home/xDaiStarter/
scp ./src/server/index.js $username@$host:/home/xDaiStarter/src/server/
scp ./package.json $username@$host:/home/xDaiStarter/
