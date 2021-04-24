# MyMacros

To Run Web Version
-------------------
* Install nodejs and npm.
* npm install -g @ionic/cli (Install ionic cli globally using npm)
* npm install (to install all packages needed from packages.json)
* ionic build
* ionic serve

When adding a new package
--------------------------
* npm install XYZ --save-prod (to put it in the package.json and avoid future rebuilt issues)

To Run Andoid Version
---------------------
* npx cap init (select names,etc)
* npx cap android
* make sure that capacitor.config.json has the correct path for android studio
* ionic cap sync
* sudo npx cap open android

Development Environment in Windows
------------------------
* Configure Ubuntu WSL on Windows 
* Add Remote-WSL on VSCode
* Install Nodejs and npm using: https://github.com/nodesource/distributions/blob/master/README.md
* sudo npm install -g @ionic/cli
* Pull the app in a non NTFS direcotry (E.g. home/user/) 
* Use Remote-WSL and bash for development
* ionic serve --external (use external ip not local since local fails ERR_CONNECTION_REFUSED)

Deployment Fireabse
-------------------
* Use guide: https://ionicframework.com/docs/angular/pwa
* sudo npm install -g firebase-tools
* sudo npm install -g @angular/cli
* Configure pwa angular
* Set no cache for "ngsw-worker.js", etc in firabase.json
* firebase login
* firebase init hosting (follow steps and also create workflows for github)
* firebase login:ci (To get token)
