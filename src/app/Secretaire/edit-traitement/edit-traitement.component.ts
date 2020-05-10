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
  selector: 'app-edit-traitement',
  templateUrl: './edit-traitement.component.html',
  styleUrls: ['./edit-traitement.component.css']
})
export class EditTraitementComponent implements OnInit {
  id: number;
  traitement: Traitement;
  traitementForm: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private patService: PatientService, private userService: UtilisateurService) { }


  ngOnInit(): void {
    this.traitement = new Traitement();
    this.id = this.route.snapshot.params['id'];
    this.prescService.searchTraitementById(this.id)
      .subscribe(data => {
        this.traitement = data;
        console.log("traio" + this.traitement.prescription)

      });

    this.initForm();
    //affect patient



  }


  initForm() {
    this.traitementForm = this.fb.group({
      nomTraitement: ['', Validators.required],
      rythme: ['', Validators.pattern("[0-9 ]{1}")],
      dosage: ['', [Validators.required]],
      remarque: ['', Validators.required],
      voix: ['', Validators.required]


    });
  }

  editTraitement() {

    const formValueAff = this.traitementForm.value;


    this.traitement.nom_traitement = formValueAff['nomTraitement'];
    this.traitement.voix = formValueAff['voix'];
    this.traitement.rythme = formValueAff['rythme'];
    this.traitement.remarque = formValueAff['remarque'];
    this.traitement.dosage = formValueAff['dosage'];

    this.prescService.editTraitement(this.traitement, this.traitement.id)
      .subscribe(data => {

        this.infoBox("Le traitement a bien été modifié");



      }, err => {
        this.infoBox("Desolé! le patient n'a pas été affecté");


      })
  }

  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/editMedicalPrescription", 46]);

    }
  }

}
