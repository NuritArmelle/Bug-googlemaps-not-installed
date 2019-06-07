import { Component} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, Marker, MarkerOptions, MyLocation, GoogleMapsAnimation, Polyline, GoogleMapOptions, Poly, PolylineOptions, MarkerIcon, MarkerCluster } from '@ionic-native/google-maps';

import { BackgroundGeolocation, BackgroundGeolocationResponse, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {
  private map: GoogleMap = null;

  constructor(private plt: Platform) {
  }

  ionViewWillEnter() {
      let that = this;
      this.plt.ready().then(async () => {
          let mapOptions: GoogleMapOptions = {
              camera: {
                  zoom: 15,
                  target: { lat: 43.610769, lng: 3.876716 }
              },
              controls: {
                  zoom: false,
                  compass: false,
                  mapToolbar: false
              }
          };

          this.map = GoogleMaps.create('map-canvas', mapOptions);
      });
  }

  ngOnInit() {}
}


