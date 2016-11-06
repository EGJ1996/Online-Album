import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  profile:any;
 lock = new Auth0Lock('04q1JKKAgnLFxonGlM3y6xzh9YS5qLRn', 'ng2.auth0.com', {});

  constructor(private af:AngularFire) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult:any) => {
      this.lock.getProfile(authResult.idToken, function(error:any, profile:any){
          if(error){
              throw new Error(error);
          }
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('profile', JSON.stringify(profile));
            console.log(profile);
            //af.database.list('https://my-project-655d3.firebaseio.com/users'+profile['user_id']).push({name:'Emiljano'});
      });
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  };
}