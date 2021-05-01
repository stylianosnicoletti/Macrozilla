import { Component, Renderer2 } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private _renderer: Renderer2,
    private _userService: UserService) { }


  /**
   * Will not be triggered, if you come back to a page after putting it into a stack.
   */
  async ngOnInit() {
    console.log("Initialise Tabs Common page.");
    await (await this._userService.getUserFields()).subscribe(x => this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode)));
  }

  /**
   * Will be triggered, if you come back to a page.
   */
  async ionViewWillEnter() {
    console.log("Entering Tabs Common page.");
  }

  /**
   * Maps darkMode boolean to body name.
   * @param darkMode User prefered theme option.
   * @returns Body name.
   */
  mapThemeModeToBodyName(darkMode: boolean): string {
    if (darkMode) {
      return 'dark';
    }
    return 'light';
  }

  ionViewWillLeave() {
    console.log("Leaving Tabs Common page.");
  }
}


