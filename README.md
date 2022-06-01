# Macrozilla

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

To Run Andoid Version OLD
---------------------
* npx cap init (select names,etc)
* npx cap android
* make sure that capacitor.config.json has the correct path for android studio
* ionic cap sync
* sudo npx cap open android

To Run Andoid Version NEW
---------------------
* Link: https://ionicframework.com/docs/developing/android
* ionic capacitor add android
* make sure that capacitor.config.json has the correct path for android studio, names, etc
* gitgnore will be configured to skip asset files automatically commit it to skip always 
* ionic capacitor copy android
* ionic capacitor run android (might need sudo if Android Studio in root folders)
* run app in Android Studio

Development Environment in Windows
----------------------------------
* Configure Ubuntu WSL on Windows 
* Add Remote-WSL on VSCode
* Install Nodejs and npm using: https://github.com/nodesource/distributions/blob/master/README.md
* sudo npm install -g @ionic/cli
* Pull the app in a non NTFS direcotry (E.g. home/user/) 
* Use Remote-WSL and bash for development
* ionic serve --external (use external ip not local since local fails ERR_CONNECTION_REFUSED)

Deployment Android
-------------------
* ionic capacitor add andoid
* ionic capacitor copy android --prod
* export CAPACITOR_ANDROID_STUDIO_PATH='..the path to android studio sh..' >> ~/.bashrc
* source ~./bashrc
* ionic capacitor open android

Deployment Firebase
-------------------
* Use guide: https://ionicframework.com/docs/angular/pwa
* sudo npm install -g firebase-tools
* sudo npm install -g @angular/cli
* Configure pwa angular
* Set no cache for "ngsw-worker.js", etc in firabase.json
* firebase login
* firebase init hosting (follow steps and also create workflows for github)
* firebase login:ci (To get token) - You might need to update the ${{ secrets.FIREBASE_SERVICE_ACCOUNT_THEMACRODIET_S }} by rerunning this command if you face any issues with automatic deployment.
