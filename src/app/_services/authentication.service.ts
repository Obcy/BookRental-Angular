import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
        

        this.currentUser = this.currentUserSubject.asObservable();
        
    }

    public get currentUserValue(): User {
        
        return this.currentUserSubject.value;
    }

    login(emailAddress: string, password: string) {       

        return this.http.post<any>(`${environment.apiUrl}/auth`, { emailAddress, password })             
             .pipe(map(token => {
                
                let user = new User()                
                user.emailAddress = emailAddress;
                user.firstName = '';
                user.lastName = '';
                user.token = token;
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);

                this.http.get<any>(`${environment.apiUrl}/auth`)
                .pipe(map(responseUser => {
                    user.emailAddress = responseUser.emailAddress;
                    user.firstName = responseUser.firstName;
                    user.lastName = responseUser.lastName;
                    user.roles = responseUser.roles;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }));

                return user;                        
                }), 
                catchError(error => {                    
                    throw new Error("Authentication unsuccessful.")                    
                }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
    }
}