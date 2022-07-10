import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from '../_models';
import {  Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private httpClient: HttpClient) { }

    // getAll() {
    //     return this.http.get<User[]>(`${environment.apiUrl}/users`);
    // }

    getAll(request: undefined): Observable<any> {
		const params = request;
		return this.httpClient.get(`${environment.apiUrl}/users/`, {params});
	}

    create(product:any): Observable<any> {
		return this.httpClient.post(`${environment.apiUrl}/users/`, JSON.stringify(product))
	}  
     
	find(id:number): Observable<any> {
		return this.httpClient.get<User>(`${environment.apiUrl}/users/` + id)
	}
     
	update(id:number, product:User): Observable<any> {
		return this.httpClient.put(`${environment.apiUrl}/users/` + id, JSON.stringify(product))
	}
     
	delete(id:number){
		return this.httpClient.delete(`${environment.apiUrl}/users/` + id)
	}
}