import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

}
