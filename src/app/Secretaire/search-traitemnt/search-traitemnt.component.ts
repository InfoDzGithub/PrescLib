import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/service/departement.service';
import { PatientService } from 'src/app/service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { Patient } from 'src/app/model/patient';
import { ActivatedRoute, Router } from '@angular/router';
import { Prescription } from 'src/app/model/prescription';
import { User } from 'src/app/model/user';
import { Traitement } from 'src/app/model/traitement';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { Contenu } from 'src/app/model/contenu';
import { Service } from 'src/app/model/service';

@Component({
  selector: 'app-search-traitemnt',
  templateUrl: './search-traitemnt.component.html',
  styleUrls: ['./search-traitemnt.component.css']
})
export class SearchTraitemntComponent implements OnInit {


  traitement: Traitement;
  quantite: number;
  form: FormGroup;
  servicesOcc: any;
  ownerAccount: User;
  email: string;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private patService: PatientService, private userService: UtilisateurService) { }


  ngOnInit(): void {

    this.initForm();
    this.getAccountOwner();


  }

  getAccountOwner() {
    this.email = sessionStorage.getItem('email');
    this.ownerAccount = new User();
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => {
        this.ownerAccount = data;
        this.getServicesOccBySec();
      }

      );

  }


  getServicesOccBySec() {
    this.patService.ListServicesOccupiedByUser(this.ownerAccount.id)
      .subscribe(data => {
        this.servicesOcc = data;

      }, err => {

        console.log(err)
      })
  }


  initForm() {
    this.form = this.fb.group({
      nomTraitement: ['', Validators.required],
      quantite: ['', Validators.pattern("[0-9 ]{1}")],
      dosage: ['', [Validators.required]],
      service: ['', Validators.required]


    });
  }

  onSubmit() {

    const formValueAff = this.form.value;

    console.log(this.form.value);
    this.traitement = new Traitement();
    this.traitement.nom_traitement = formValueAff['nomTraitement'];
    this.quantite = formValueAff['quantite'];
    this.traitement.dosage = formValueAff['dosage'];
    this.traitement.prescription.service = formValueAff['service'];
    console.log("tri" + this.traitement + "quant" + this.quantite)

    /* this.prescService.searchTraitment(this.traitement, this.quantite)
       .subscribe(data => {
 
         this.infoBox("resultat du recherche");
 
 
 
       }, err => {
         this.infoBox("Desolé!");
 
 
       })
       */
  }

  infoBox(message: string) {

    if (confirm(message)) {


    }
  }


}
