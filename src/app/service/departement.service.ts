import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  private url: string = "http://localhost:8080";
  private services: any;


  constructor(private http: HttpClient) { }

  getServices(): Observable<any> {
    this.services = this.http.get(this.url + "/services");
    console.log("la liste:" + this.services)
    return this.services;

  }

  AffectUserToService(idU: number, idS: number) {
    return this.http.get(this.url + "/user/" + idU + "/service/" + idS)

  }

}
