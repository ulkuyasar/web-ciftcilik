
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EnvironmentUrlService } from './environment-url.service';
import * as jwt_decode from 'jwt-decode';
import { User, UserForRegisterDto, UserForLoginDto, CurrentUser } from '../_entities/entitiesforCRM';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  endpoint: string =   'https://localhost:4000/api/Auths';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private  currentUser: User;
  

  constructor(
    private http: HttpClient,
    public router: Router,
    private environmentUrlService:EnvironmentUrlService
  ) {
    this.endpoint = this.environmentUrlService.getURL()+"Auths";
  }



  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  get getUserInfo(): any {
    if (this.isLoggedIn) 
      return JSON.parse(localStorage.getItem('currentUser'));
    
      return null;
  }

  get getCurrentUserInfo(): CurrentUser {
    let jsonUser = this.getUserInfo;
    if (jsonUser==null)
      return null;

    let currentUser = new CurrentUser();

    currentUser.isAdmin = jsonUser.isAdmin;
    currentUser.userName = jsonUser.userName;
    currentUser.email = jsonUser.email;
    currentUser.fullName = jsonUser.fullName;
    currentUser.id =  +jsonUser.id;
    return currentUser;

  }


  // Sign-up
  signUp(user: UserForRegisterDto): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

    // Sign-in
    signIn(user: UserForLoginDto) {
 
      return this.http.post<any>(`${this.endpoint}/login`, user)
      .pipe(map(res => {
          if (res && res.success) {
              localStorage.setItem('access_token', res.data.token);
              var decodedToken = jwt_decode(res.data.token);

              var _id =decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
              var currentUser = JSON.stringify({ 
              isAdmin: 'Admin' === decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
              id:_id,
              userName: decodedToken['email'],
              email: decodedToken['email'],
              fullName: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]});

              localStorage.setItem('currentUser',currentUser);

              this.getUserProfile(_id).subscribe((res) => {
                  this.currentUser = res;
                  this.router.navigate(['user-profile/' + _id]);
              })
        }
        else
        {
            this.doLogout();
            throw new Error("Giriş bilgileriniz yanlış. Lütfen tekrar kontrol ediniz");
        }
        
      }));
    }

    currentlyUserId():number{

      if (this.getUserInfo==null || this.getUserInfo == undefined)
        throw new Error("İzinsiz işlem yapılamaz"); 
  
      return +this.getUserInfo.id;
    }




  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }



  // User profile
  getUserProfile(id): Observable<any> {
    let api = `${this.endpoint}/getbyid?id=${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
    // this.user = new User();
    // this.user.name = "name Tokendan almalısın";
    // this.user.firstName = "firstName Tokendan almalısın";
    // this.user.lastName = "firstName Tokendan almalısın";
    // return user;
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}