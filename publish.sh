#!/bin/bash

./generate.sh
./prettier.sh

# Set user
git config --local credential.helper ""
git config --local user.name "Artemistry"
git config --local user.email "artemistry.com@gmail.com"

# Commit and push
git checkout master
git add .
git commit -m "Update"
git push --set-upstream origin master
