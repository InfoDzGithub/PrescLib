import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
//import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  private url: string = "http://localhost:8080";
  constructor(private http: HttpClient) { }



  /*
    searchBookByIsbn(isbn: string): Observable<Book>{
           return  this.http.get<Book>('/library/rest/book/api/searchByIsbn?isbn='+isbn);
       }
  */

  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.url + "/login?email=" + email + "&password=" + password);
  }



}
