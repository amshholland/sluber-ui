# README

The SLUBER UI is a React UI.

## Installation

* Clone repo: https://bitbucket.org/tschwebach/sluber-ui
* Build:  npm install
* Run: npm run start
* Build Docker image: docker build -t sluber-ui -f ./Dockerfile .
* Run Docker image:  docker run -p 3000:3000  --name sluber-ui sluber-ui

* This project is using mapbox, create free account on mapbox.com and get api key. Create new file in root called `.env.development.local` and add `REACT_APP_MAPBOX_ACCESS_TOKEN={API_KEY_FROM_MAPBOX}`