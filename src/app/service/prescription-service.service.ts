import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prescription } from '../model/prescription';
import { Traitement } from '../model/traitement';
import { Tests } from '../model/tests';
import { Observable } from 'rxjs';

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

  searchPresctById(idPresc: number) {
    return this.http.get<Prescription>(this.url + "/prescriptions/" + idPresc)
  }

  editPrescription(prescription: Prescription, id: number) {
    return this.http.put(this.url + "/prescriptions/" + id, prescription);
  }
  editTest(test: Tests, id: number) {
    return this.http.put(this.url + "/tests/" + id, test);
  }
  editTraitement(traitement: Traitement, id: number) {
    return this.http.put(this.url + "/traitements/" + id, traitement);
  }



  archiveTraitement(id: number): Observable<any> {
    return this.http.delete(`${this.url}/stopTraitement/${id}`, { responseType: 'text' });
  }

  archiveTest(id: number): Observable<any> {
    return this.http.delete(`${this.url}/stopTest/${id}`, { responseType: 'text' });
  }
  searchTraitementById(idTrai: number) {
    return this.http.get<Traitement>(this.url + "/traitements/" + idTrai)
  }
  searchTestById(idTest: number) {
    return this.http.get<Tests>(this.url + "/tests/" + idTest)
  }
}
