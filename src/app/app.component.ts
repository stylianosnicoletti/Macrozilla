import { Component, OnDestroy, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { environment } from '../environments/environment';
import { MaintenanceService } from '../app/services/maintenance.service';
import { LoadingService } from './services/loading.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: false,  // this is now required when using NgModule
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy, AfterViewInit{

  platformPauseSubsciption: Subscription;
  platformResumeSubsciption: Subscription;
  routerSubscription: Subscription;
  mutationObserver: MutationObserver;

  constructor(
    private _platform: Platform,
    private _maintenanceService: MaintenanceService,
    private _loadingService: LoadingService,
    private _router: Router) {
    this._loadingService.startLoadingOnAppBoot();
    this.initializePauseResumeSubscriptions();
    this.initializeRouterSubscription();
    this.initializeApp();
  }

  ngAfterViewInit() {
    this.setupAriaHiddenObserver();
  }

  initializeApp() {
    this._platform.ready().then(async () => {

      const platform = Capacitor.getPlatform();

      // Native Platform (Android/iOS)
      if (Capacitor.isNativePlatform()) {
        //console.log("Is Native");
        // Android Platform
        if (platform == 'android') {
          console.log("Android Platform");
          let appVersionAndroid: string;
          App.getInfo().then(e => {
            console.log("Current Version: " + e.version);
            appVersionAndroid = e.version;
          });
          await (await this._maintenanceService.getMaintenanceAndroid()).subscribe(async maintenance => {
            await this._maintenanceService.checkForUpdateOrAvailabilityAndroid(appVersionAndroid, maintenance);
          });
        }
      } else {
        // Web Platform
        if (platform == 'web') {
         console.log("Web Platform");
         console.log("Current Version: " + environment.appVersion);
          await (await this._maintenanceService.getMaintenanceWeb()).subscribe(async maintenance => {
            await this._maintenanceService.checkForUpdateOrAvailabilityWeb(environment.appVersion, maintenance);
          });
        }
      }
    });
  }

  initializePauseResumeSubscriptions() {
    this.platformPauseSubsciption = this._platform.pause.subscribe(async () => {
     //console.log('paused!');

    });

    this.platformResumeSubsciption = this._platform.resume.subscribe(async () => {
     //console.log('resumed!');
    });
  }

  /**
   * Sets up a subscription to Angular Router navigation events.
   * When navigation completes (NavigationEnd), it blurs any currently focused element
   * to prevent accessibility violations where focused elements become hidden from screen readers.
   * This handles focus cleanup during standard page transitions.
   */
  initializeRouterSubscription() {
    this.routerSubscription = this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Blur any focused element to prevent aria-hidden violations
        if (document.activeElement && document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
  }

  /**
   * Creates and configures a MutationObserver to monitor changes to the 'aria-hidden' attribute
   * on ion-router-outlet elements. When Ionic sets aria-hidden="true" on the router outlet
   * during page transitions (to hide inactive routes from screen readers), this observer
   * detects the change and blurs any focused elements within the outlet to prevent
   * accessibility violations. This complements the router subscription by catching
   * focus issues during Ionic's internal router transitions.
   */
  setupAriaHiddenObserver() {
    // Create a mutation observer to watch for aria-hidden changes on ion-router-outlet
    this.mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
          const target = mutation.target as HTMLElement;
          if (target.tagName === 'ION-ROUTER-OUTLET' && target.getAttribute('aria-hidden') === 'true') {
            // Router outlet is being hidden, blur any focused element inside it
            if (document.activeElement && target.contains(document.activeElement)) {
              (document.activeElement as HTMLElement).blur();
            }
          }
        }
      });
    });

    // Start observing the document for aria-hidden changes on ion-router-outlet elements
    this.mutationObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['aria-hidden'],
      subtree: true
    });
  }

  /**
   * Lifecycle hook that runs when the component is destroyed.
   * Unsubscribes from the router events subscription and disconnects the mutation observer
   * to prevent memory leaks and ensure proper cleanup of event listeners.
   */
  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }
}