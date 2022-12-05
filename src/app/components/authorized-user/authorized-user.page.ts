import { ApplicationRef, Component, Renderer2 } from '@angular/core';
import { Network } from '@capacitor/network';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { PluginListenerHandle } from '@capacitor/core';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-authorized-user',
  templateUrl: 'authorized-user.page.html',
  styleUrls: ['authorized-user.page.scss']
})
export class AuthorizedUserPage {

  networkListener: PluginListenerHandle;
  disconnectSubscription: Subscription;
  connectSubscription: Subscription;
  lastNetworkStatusIsConnected = true;

  constructor(
    private _renderer: Renderer2,
    private _userService: UserService,
    private _loadingService: LoadingService) { }

  /**
   * Will not be triggered, if you come back to a page after putting it into a stack.
   */
  async ngOnInit() {
   //console.log("ngOnInit AuthorizedUserPage.");
    await (await this._userService.getUserFields()).subscribe(async x => {
      this._renderer.setAttribute(document.body, 'color-theme', this.mapThemeModeToBodyName(x.Options.DarkMode))
    });

    this.networkListener = await this.initNetworkListener();
  }

  async ionViewWillEnter() {
   //console.log("ionViewWillEnter AuthorizedUserPage.");
    // await this.presentNetworkAlert();
    await this._loadingService.stopLoadingOnAppBoot();
  }

  async ionViewWillLeave() {
   //console.log("ionViewWillLeave AuthorizedUserPage.");
  }

  async ngOnDestroy() {
   //console.log("ngOnDestroy AuthorizedUserPage.");
    if (this.networkListener) {
      this.networkListener.remove();
    }
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

  async resetNetworkListener() {
    if (this.networkListener) {
      this.networkListener.remove();
    }
    this.lastNetworkStatusIsConnected = await (await Network.getStatus()).connected;
   //console.log(this.lastNetworkStatusIsConnected);
    this.networkListener = await this.initNetworkListener();
  }

  async initNetworkListener(): Promise<PluginListenerHandle> {
    return await Network.addListener('networkStatusChange', async status => {
      if (status.connected && !this.lastNetworkStatusIsConnected) {
       //console.log('Network connected!');
        this.lastNetworkStatusIsConnected = true;
      }
      else if (!status.connected) {
       //console.log('Network disconnected!');
        this.lastNetworkStatusIsConnected = false;
      }
    });
  }

}
