import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prescription } from '../model/prescription';
import { Traitement } from '../model/traitement';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionServiceService {
  public url: string = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  addPrescription(prescription: Prescription) {
    return this.http.post(this.url + "/prescriptions", prescription);
  }

  addTraitement(traitement: Traitement) {
    return this.http.post(this.url + "/traitements", traitement);
  }
}
