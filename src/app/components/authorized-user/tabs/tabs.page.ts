import { Component, ElementRef } from '@angular/core';
import { App } from '@capacitor/app';


@Component({
  standalone: false,  // this is now required when using NgModule
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private _elementRef: ElementRef) { }

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
    if (document.activeElement instanceof HTMLElement && this._elementRef.nativeElement.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    App.removeAllListeners();
  }
}


