import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }


  //Search user by id


  searchUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + "/users/" + id)

  }

  searchUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + "/searchUserByEmail?email=" + email)

  }


}
