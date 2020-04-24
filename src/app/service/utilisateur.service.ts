import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  public url: string = "http://localhost:8080";


  constructor(private http: HttpClient) { }


  //Search user by id


  searchUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + "/users/" + id)
  }

  searchUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + "/searchUserByEmail?email=" + email)

  }

  getUsers(motClet: string, page: number, size: number) {
    return this.http.get(this.url + "/searchUser?mc=" + motClet + "&page=" + page + "&size=" + size)

  }
  handleErreur(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log(errorResponse.error.message);
    }
    else {
      console.log(errorResponse.error.message);

    }

    return throwError('There is a problem with the service.We are notified & working on it.Please try again later');
  }
  archive(id: number): Observable<any> {
    return this.http.delete(`${this.url}/archiveUser/${id}`, { responseType: 'text' });
  }

  enable(id: number): Observable<any> {
    return this.http.get(`${this.url}/enableUser/${id}`, { responseType: 'text' });
  }

  releaseUserFromAllActifService(id: number) {
    return this.http.get(this.url + "/releaseUserFromAllActifService/" + id)

  }

  //release user idU from on service idS
  releaseUserFromActifService(idU: number, idS: number) {
    return this.http.get(this.url + "/releaseUser/" + idU + "/FromService/" + idS);


  }

  addUser(user: User) {
    return this.http.post(this.url + "/users", user);
  }

  editUser(user: User, id: number) {
    return this.http.put(this.url + "/users/" + id, user);
  }

  servicesOccupiedByUser(idU: number, page: number, size: number) {
    return this.http.get(this.url + "/servicesOccupiedByUser?id=" + idU + "&page=" + page + "&size=" + size)

  }

  historiqueServicesOccupiedByUser(idU: number, page: number, size: number) {
    return this.http.get(this.url + "/historiqueServicesOccupiedByUser?id=" + idU + "&page=" + page + "&size=" + size)

  }

  uploadPhotoUser(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.url + '/uploadPhoto/' + idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}


