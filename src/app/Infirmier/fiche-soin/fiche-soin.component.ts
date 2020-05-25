import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CareFileService } from 'src/app/service/care-file.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { Traitement } from 'src/app/model/traitement';
import { Validation } from 'src/app/model/validation';
import { FicheInfirmier } from 'src/app/model/fiche-infirmier';


@Component({
  selector: 'app-fiche-soin',
  templateUrl: './fiche-soin.component.html',
  styleUrls: ['./fiche-soin.component.css']
})
export class FicheSoinComponent implements OnInit {
  id: number;
  fileCare: any;
  fileCare2: FicheInfirmier;

  ownerAccount: User;
  email: string;
  validation: Validation;
  cmp: number;
  Validations: any;
  mode: number;
  constructor(private fileService: CareFileService, private route: ActivatedRoute, public prescService: PrescriptionServiceService, private router: Router, private patService: PatientService, public userService: UtilisateurService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getFileCare();
    this.getAccountOwner();
    this.mode = -1;
  }

  getFileCare() {
    this.fileCare2 = new FicheInfirmier();
    this.fileService.getFileCareById(this.id)
      .subscribe(data => {
        this.fileCare = data;
        this.fileCare2 = data;


        this.cmp = this.fileCare.validations.length;
        //console.log("validations" + this.fileCare.validations)
        //console.log("longeur" + this.fileCare.validations.length)
        //console.log(typeof +this.fileCare.validations.length)
      }, err => {

        console.log(err)
      })
  }

  getAccountOwner() {
    this.email = sessionStorage.getItem('email');
    this.ownerAccount = new User();
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => {
        this.ownerAccount = data;

      }

      );

  }


  showValidationBox(item: Traitement, i: number) {

    this.fileService.getValidationsByBothContenuFileCare(item.id, this.fileCare.id)
      .subscribe(data => {
        this.Validations = data;
        console.log("longt" + this.Validations.length)
        this.mode = i;
      }, err => {

        console.log(err)
      }


      );

  }







  addValidation(item: Traitement) {
    if (confirm("Aviez vous injecter le traitement?")) {

      this.validation = new Validation();
      this.validation.type_val = "VB";
      this.validation.val_bool = true;
      this.validation.contenu = item;
      this.validation.ficheInfirmier = this.fileCare2;
      this.validation.infirmier = this.ownerAccount;
      this.cmp++;
      this.fileService.addValidation(this.validation)

        .subscribe(data => {
          if (confirm("Bien enregistré")) { this.ngOnInit() }
        }, err => {
          if (confirm("Desolé!")) { }
          console.log(err)
        })
    }

  }



}