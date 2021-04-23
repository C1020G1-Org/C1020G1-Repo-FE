import {Component} from '@angular/core';
import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC0QhNWATD5rLmNP7YeqNJYu9gae1aYRgQ',
  databaseURL: 'https://dating-web-95f9d-default-rtdb.firebaseio.com'
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project1';

  constructor() {
    firebase.initializeApp(config);
  }
}
