import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { User } from '../_entities/entities';
import { EnvironmentUrlService } from './environment-url.service';
//import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    UserUrl = "http://localhost:5000/api/Users"
    userToken: any;
    decodedToken:any;
  // angular8 donusuunde kapatıldı  jwtHelper:JwtHelper = new JwtHelper();
    TOKEN_KEY='token';
    DECODEDTOKEN_KEY='decodedtoken';
    CURRENTUSER='currentUser';

    constructor(private http: HttpClient,
                private environmentURLService:EnvironmentUrlService
               ) {
        this.UserUrl = environmentURLService.getURL()+"Users";
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();


    }

   


    GetByUserNameAndPassword(username: string, password: string) {
        return this.http.get<any>(this.UserUrl+'/GetByUserNameAndPassword?userName='+username+'&password='+password)// return this.http.post<any>(this.url+'/GetByUserNameAndPassword', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.responceMesaj.result) {  // if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.CURRENTUSER, JSON.stringify(user));
                    this.currentUserSubject.next(user);                
                } else {
                    this.logout();
                    throw new Error("Giriş bilgileriniz yanlış. Lütfen tekrar kontrol ediniz");
                }
               // return user;
            }));
    }

    loginWithToken(username: string, password: string) {
        return this.http.get<any>(this.UserUrl+'/LoginWithToken?userName='+username+'&password='+password)// return this.http.post<any>(this.url+'/GetByUserNameAndPassword', { username, password })
            .pipe(map(data => {
                
                this.saveToken(data);
                this.userToken = data;
                // angular8 donusuunde kapatıldı this.decodedToken = this.jwtHelper.decodeToken(data);
                this.saveDecodedToken(this.decodedToken);
                // if (user && user.responceMesaj.result) {  // if (user && user.token) {
                    
                //     localStorage.setItem('currentUser', JSON.stringify(user));
                //     this.currentUserSubject.next(user);                
                // } else {
                //     this.logout();
                //     throw new Error("Giriş bilgileriniz yanlış. Lütfen tekrar kontrol ediniz");
                // }
               
            }));
    }

    saveToken(token){
        localStorage.setItem(this.TOKEN_KEY,token);
    }

    saveDecodedToken(token){
        localStorage.setItem(this.DECODEDTOKEN_KEY,token);
    }

    //tokennın expried olup olmadıgı kontrol edılıyor
    loggedIn(){
       // angular8 donusuunde kapatıldı return tokenNotExpired(this.TOKEN_KEY);
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(this.CURRENTUSER);
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.DECODEDTOKEN_KEY);
        this.currentUserSubject.next(null);
    }
}
