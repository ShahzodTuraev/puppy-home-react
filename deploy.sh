#!/bin/bash

#PRODUCTION
git reset --hard
git pull origin master

npm i yarn -g
yarn global add serve
yarn
yarn run build
yarn start "yarn run start:prod" --name=PUPPYHOME-REACT

#DEVELOPMENT

# npm i yarn -g
# yarn
# pm2 start 'yarn run start' --name=PUPPYHOME-REACT