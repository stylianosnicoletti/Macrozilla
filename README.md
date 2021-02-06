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
* npx cap ini
* npx cap android
* make sure that capacitor.config.json has the correct path for android studio
* ionic cap sync
* sudo npx cap open android
