import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'PROJECT';


  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDUVPG-LJwcaG51Wf_3cmIABshnpqPg5ZY',
      authDomain: 'ng-recipe-book-2-d9186.firebaseapp.com'
    });
  }

}
