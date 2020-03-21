
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserForRegisterDto, UserForLoginDto } from '../_entities/entities';
import { EnvironmentUrlService } from './environment-url.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  endpoint: string =   'https://localhost:4000/api/Auths';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: User;


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
                  this.router.navigate(['user-profile/' + res.userId]);
              })
        }
        else
        {
            this.doLogout();
            throw new Error("Giriş bilgileriniz yanlış. Lütfen tekrar kontrol ediniz");
        }
        
      }));
    }

  
//   signIn(user: UserForLoginDto) {
//     return this.http.get<any>(this.endpoint+'/login/GetByUserNameAndPassword?email='+user.email+'&password='+user.password)// return this.http.post<any>(this.url+'/GetByUserNameAndPassword', { username, password })
//         .pipe(map(user => {
//             // login successful if there's a jwt token in the response
//             if (user && user.responceMesaj.result) {  // if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem(this.CURRENTUSER, JSON.stringify(user));
//                 this.currentUserSubject.next(user);                
//             } else {
//                 this.doLogout();
//                 throw new Error("Giriş bilgileriniz yanlış. Lütfen tekrar kontrol ediniz");
//             }
//            // return user;
//         }));
// }







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