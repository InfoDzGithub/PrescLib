import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
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
  handleErreur(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log(errorResponse.error.message);
    }
    else {
      console.log(errorResponse.error.message);

    }

    return throwError('There is a problem with the service.We are notified & working on it.Please try again later');
  }
  forgetPassword(email: string) //: Observable<any> {

  {
    return this.http.get(this.url + "/forgetPassword?email=" + email)
      //.catchError(this.handleErreur);
      .pipe(
        catchError(this.handleErreur));
  }


  login(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.url + "/login?email=" + email + "&password=" + password);
  }



}
