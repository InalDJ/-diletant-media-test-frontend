import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticationResponse } from '../model/authentication-response';
import { LoginRequest } from '../model/login-request';
import { SignupRequest } from '../model/signup-request';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  

  loginUrl='http://185.244.27.156:8080/api/auth/login';
  signupUrl='http://185.244.27.156:8080/api/auth/signup';
  logoutUrl='http://185.244.27.156:8080/api/auth/logout';
  refreshTokenUrl='http://185.244.27.156:8080/api/auth/refresh/token';


  refreshTokenRequest = {
    refreshToken: this.getRefreshToken(),
    userName: this.getUserName()
  }

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequest: SignupRequest){
    return this.http.post(this.signupUrl, signupRequest, {responseType: 'text'});
  }

  login(loginRequest: LoginRequest): Observable<boolean>{
    
    return this.http.post<AuthenticationResponse>(this.loginUrl, loginRequest).pipe(
      map(
        data => {
          this.localStorage.store('authenticationToken', data.authenticationToken);
          this.localStorage.store('userName', data.userName);
          this.localStorage.store('refreshToken', data.refreshToken);

          this.loggedIn.emit(true);
          this.username.emit(data.userName);
          return true;
        }
      )
    )
  }

  logout(){
    this.refreshTokenRequest.refreshToken = this.getRefreshToken();
    this.refreshTokenRequest.userName = this.getUserName();
    this.http.post(this.logoutUrl, this.refreshTokenRequest, {responseType: 'text'})
    .subscribe(data => {
      console.log(data);
    }, error => {
      throwError(error)
    }
    )
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('userName');
    this.localStorage.clear('authenticationToken');
    this.loggedIn.emit(false);

  }


  refreshToken(){
    return this.http.post<AuthenticationResponse>(this.refreshTokenUrl, this.refreshTokenRequest)
    .pipe(
      tap(
        response => {
          this.localStorage.clear('authenticationToken');

          this.localStorage.store('authenticationToken', response.authenticationToken);

        }, error => {
          throwError(error)
          
        }
      )
    )
  }

  getJwtToken(){
    return this.localStorage.retrieve('authenticationToken');
  }

  getUserName(){
   return this.localStorage.retrieve('userName');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  

}
