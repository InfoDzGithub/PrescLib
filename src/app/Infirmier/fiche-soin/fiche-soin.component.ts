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
  cmp: number = 0;
  Validations: any;
  mode: number;
  nbreV: number = 0;
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
        this.validationDisab(this.id);
        console.log("file" + this.fileCare.id)
        for (const iterator of this.fileCare.prescription.contenu) {
          if (iterator.etat == true) {
            this.cmp = this.cmp + iterator.nbre_par_jour;
          }
        }
        if (this.cmp == (this.fileCare.validations.length - this.nbreV)) {
          console.log("cmp" + this.cmp)
          console.log("valiLenght" + this.fileCare.validations.length)
          console.log("FINNNNnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
          console.log("valiDis" + this.nbreV)
          this.archiveFileCare();

        }


      }, err => {

        console.log(err)
      })
  }




  increase() {
    // this.cmp++
    //console.log("cmp" + this.cmp)
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
        this.validationDisab(this.id);
        this.mode = i;
        this.cmp = 0;
        for (const iterator of this.fileCare.prescription.contenu) {
          if (iterator.etat == true) {
            this.cmp = this.cmp + iterator.nbre_par_jour;
          }
        }

        if (this.cmp == (this.fileCare.validations.length - this.nbreV)) {
          console.log("cmp" + this.cmp)
          console.log("valiLenght" + this.fileCare.validations.length)
          console.log("valiDis" + this.nbreV)
          console.log("FINNNNnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
          this.archiveFileCare();

        }


      }, err => {

        console.log(err)
      }


      );

  }







  addValidation(item: Traitement) {
    if (confirm("Aviez vous injecté le traitement?")) {

      this.validation = new Validation();
      this.validation.type_val = "VB";
      this.validation.val_bool = true;
      this.validation.contenu = item;
      this.validation.ficheInfirmier = this.fileCare2;
      this.validation.infirmier = this.ownerAccount;

      this.fileService.addValidation(this.validation)

        .subscribe(data => {
          if (confirm("Bien enregistré")) {

            this.cmp = 0;
            for (const iterator of this.fileCare.prescription.contenu) {
              if (iterator.etat == true) {
                this.cmp = this.cmp + iterator.nbre_par_jour;
              }
            }

            if (this.cmp == (this.fileCare.validations.length - this.nbreV)) {
              console.log("cmp" + this.cmp)
              console.log("valiLenght" + this.fileCare.validations.length)
              console.log("valiDis" + this.nbreV)
              console.log("FINNNNnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
              this.archiveFileCare();

            }

            this.ngOnInit();


          }
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

  fileCareByPresc(id: number) {
    this.router.navigate(["/fileCareByPresc", id]);
  }








  archiveFileCare() {

    this.fileService.archiveFile(this.id)
      .subscribe(data => {




      }, err => {

        console.log(err)
      })
  }




  validationDisab(idF: number) {

    this.fileService.nbreValidationDisable(idF)
      .subscribe(
        data => {
          //this.nbreV = data;
          this.nbreV = data;


        }

      );



  }








}