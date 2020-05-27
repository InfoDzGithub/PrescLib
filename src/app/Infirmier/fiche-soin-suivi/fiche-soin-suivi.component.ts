import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { PrescriptionServiceService } from 'src/app/service/prescription-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CareFileService } from 'src/app/service/care-file.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { Tests } from 'src/app/model/tests';
import { Validation } from 'src/app/model/validation';
import { FicheInfirmier } from 'src/app/model/fiche-infirmier';

@Component({
  selector: 'app-fiche-soin-suivi',
  templateUrl: './fiche-soin-suivi.component.html',
  styleUrls: ['./fiche-soin-suivi.component.css']
})
export class FicheSoinSuiviComponent implements OnInit {

  id: number;
  fileCare: any;
  fileCare2: FicheInfirmier;

  ownerAccount: User;
  email: string;
  validation: Validation;

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


  showValidationBox(item: Tests, i: number) {

    this.fileService.getValidationsByBothContenuFileCare(item.id, this.fileCare.id)
      .subscribe(data => {
        this.Validations = data;

        this.mode = i;
      }, err => {

        console.log(err)
      }


      );

  }







  addValidation(item: Tests, value: number) {
    if (confirm("Aviez vous injecter le traitement?")) {

      this.validation = new Validation();
      this.validation.type_val = "VN";
      this.validation.val_num = value;
      this.validation.contenu = item;
      this.validation.ficheInfirmier = this.fileCare2;
      this.validation.infirmier = this.ownerAccount;

      this.fileService.addValidation(this.validation)

        .subscribe(data => {
          if (confirm("Bien enregistré")) { this.ngOnInit() }
        }, err => {
          if (confirm("Desolé!")) { }
          console.log(err)
        })
    }

  }


  home() {
    this.router.navigate(["/global"]);
  }
  FicheInfirmierActif(id: number) {
    this.router.navigate(["/ActifFilesCare", id]);
  }

  alert() {
    window.alert('test');
  }
}