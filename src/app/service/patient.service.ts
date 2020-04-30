import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  public url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }


  getPatients(motClet: string, page: number, size: number) {
    return this.http.get(this.url + "/searchPatient?mc=" + motClet + "&page=" + page + "&size=" + size)

  }
}
