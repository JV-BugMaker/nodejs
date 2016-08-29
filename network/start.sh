#!/bin/sh
if [ ! -f "pid" ]
then
  node ../lib/process.js ../conf/config.json &
  echo $!>pid
fi
