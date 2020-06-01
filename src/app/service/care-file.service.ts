import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FicheInfirmier } from '../model/fiche-infirmier';
import { Validation } from '../model/validation';

@Injectable({
  providedIn: 'root'
})
export class CareFileService {

  public url: string = "http://localhost:8080";
  public nbre: number;

  constructor(private http: HttpClient) { }


  listActifFilesCareByPresc(idPresc: number, page: number, size: number) {
    return this.http.get(this.url + "/allActifCareFileByPrescription?id=" + idPresc + "&page=" + page + "&size=" + size)

  }

  currentCareFileByPrescription(idPresc: number, page: number, size: number) {
    return this.http.get(this.url + "/currentCareFileByPrescription?id=" + idPresc + "&page=" + page + "&size=" + size)

  }

  addFileCare(fiche: FicheInfirmier) {
    return this.http.post(this.url + "/ficheInfirmiers", fiche)

  }


  getFileCareById(idFile: number) {
    return this.http.get<FicheInfirmier>(this.url + "/ficheInfirmiers/" + idFile)

  }

  addValidation(validation: Validation) {
    return this.http.post(this.url + "/validations", validation)

  }

  getValidationsByBothContenuFileCare(idC: number, idF: number) {
    return this.http.get(this.url + "/validationsByContenuAndFileCare?idC=" + idC + "&idF=" + idF)
  }

  getValidationsByFileCare(idF) {
    return this.http.get(this.url + "/validationsByFileCare?idF=" + idF)
  }

  archiveFile(idF) {
    return this.http.get(this.url + "/archiveFile?id=" + idF)
  }

  fileNotCompleted(idU, page: number, size: number) {
    return this.http.get(this.url + "/fileAreNotComplete?id=" + idU + "&page=" + page + "&size=" + size)
  }

  fileByPresc(idF, page: number, size: number) {
    return this.http.get(this.url + "/fileCareByPresc?id=" + idF + "&page=" + page + "&size=" + size)
  }

}
