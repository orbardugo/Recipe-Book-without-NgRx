import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {ActivatedRoute, Route, Router} from '@angular/router';


@Injectable()
export class AuthService {
  token: string;
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    ).catch(
      error => alert(error)
    );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => {
            this.token = token;
            this.router.navigate(['recipes']);
          }
        );
      }
    )
      .catch(
        error => alert(error)

      );

  }

  getToken() {
     firebase.auth().currentUser.getIdToken().then(
      (token: string) => {
        this.token = token;
      }
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['recipes']);
  }
}
