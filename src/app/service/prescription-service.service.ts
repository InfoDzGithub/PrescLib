import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prescription } from '../model/prescription';
import { Traitement } from '../model/traitement';
import { Tests } from '../model/tests';

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

  addTests(tests: Tests) {
    return this.http.post(this.url + "/tests", tests);
  }

  nbrePrescriptionActifInEveryHosp(idH: number) {
    return this.http.get(this.url + "/nbrePrescriptionActifInHosp?id=" + idH);
  }
}
