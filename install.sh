#!/usr/bin/sh

echo "Used for installing all moudules..."
echo "You must install 'mongodb', 'python 2.10.x with pip', 'node.js 0.10.37 with npm‘ at first !'"

#Install python modules
#For python 2.7.x!
printf "Install %s..." "python modules"
sudo pip install pymongo
sudo pip install watchdog
sudo pip install flask
sudo pip install flaskcompress
sudo pip install pygments

#Install node modules
cd Front/
printf "Install %s..." "node modules"
npm install grunt -g
npm install grunt-cli -g
npm install