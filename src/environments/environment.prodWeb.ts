import {environment as mainEnvironment} from '../environments/environment'

export const environment = {
  appVersion: mainEnvironment.appVersion,
  production: true,
  platform: "web",
  firebase: mainEnvironment.firebase
};
