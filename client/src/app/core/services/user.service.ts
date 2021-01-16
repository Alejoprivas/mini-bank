import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user';
import { environment } from 'src/environments/environment';
//import { GLOBAL as config } from '../_config/config';
//import { config } from 'rxjs';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { 
                }

    contextUrl: string = environment.apiUrl+'/user';

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(`${this.contextUrl}`)
        .pipe(map(data => data));
    }

    getById(id: string): Observable<User> {
        return this.http
        .get<User>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }

    register(user: User): Observable<User> {
        return this.http.post<User>(`${this.contextUrl}/`, user)
        .pipe(map(data => data));;
    }

    update(user: User) {
        return this.http.post(`${this.contextUrl}/` + user._id, user)
        .pipe(map(data => data));
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.contextUrl}/` + id)
        .pipe(map(data => data));
    }

    changePassword(...params: any[] ): Observable<any> {
        return this.http.post(`${this.contextUrl}/{id}/changePassword`, {})
        .pipe(
            map(response => response)
        );
    }
}