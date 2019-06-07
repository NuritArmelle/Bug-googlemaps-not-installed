import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationAuthorizationStatus } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];

  private config: BackgroundGeolocationConfig = {
    desiredAccuracy: 0,
    stationaryRadius: 15,
    distanceFilter: 20,
    interval: 3000,
    fastestInterval: 3000,
    activitiesInterval: 10000,
    stopOnTerminate: false, // enable this to clear background location settings when the app terminates
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private backgroundGeolocation: BackgroundGeolocation
  ) {
    translate.setDefaultLang('fr');
    translate.use('fr');
    this.initializeApp();
  }

  initializeApp() {
    let that = this;
    this.platform.ready().then(() => {
      this.statusBar.styleBlackTranslucent();
      this.backgroundGeolocation.configure(this.config);


      this.backgroundGeolocation.on(BackgroundGeolocationEvents.authorization).subscribe(function () {
        that.backgroundGeolocation.checkStatus().then(function (status) {
          if (status.authorization !== BackgroundGeolocationAuthorizationStatus.AUTHORIZED) {
            // we need to set delay or otherwise alert may not be shown
            setTimeout(function () {
              var showSettings = confirm("L'application nécessite l'autorisation du suivi de la position. Souhaitez-vous ouvrir les paramètres de l'application ?");
              if (showSettings) {
                return that.backgroundGeolocation.showAppSettings();
              }
            }, 1000);
          }
        })
      });
    });
  }
}
