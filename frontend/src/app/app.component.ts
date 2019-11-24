import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Create Game',
      url: '/game',
      icon: 'add-circle-outline'
    },
    {
      title: 'Logout',
      url: '/logintemp',
      icon: 'log-out'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'add-circle'
    },
    {
      title: 'Registergames',
      url: '/registergames',
      icon: 'add-circle'
    },
    {
      title: 'Createclass',
      url: '/createclass',
      ion: 'add-circle'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
