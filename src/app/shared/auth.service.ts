import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) {
  }

  private setToken(response) {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expDate.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }

  }

  // tslint:disable-next-line:typedef
  login(user) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      );
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.setToken(null);
  }

  get token() {
    const expData = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date > expData) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  isAuth() {
    return !!this.token;
  }
}
