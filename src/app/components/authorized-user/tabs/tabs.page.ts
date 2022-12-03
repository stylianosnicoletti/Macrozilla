import { Component } from '@angular/core';
import { App } from '@capacitor/app';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() { }

  /**
   * Will not be triggered, if you come back to a page after putting it into a stack.
   */
  async ngOnInit() {
  }

  /**
   * Will be triggered, if you come back to a page.
   */
  async ionViewWillEnter() {
    //console.log("Entering Tabs Common page.");
    // Android hardware back button actions 
    App.addListener('backButton', data => {
      App.exitApp();
    });
  }


  ionViewWillLeave() {
    //console.log("Leaving Tabs Common page.");
    App.removeAllListeners();
  }
}


