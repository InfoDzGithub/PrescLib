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
import { Tests } from 'src/app/model/tests';

@Component({
  selector: 'app-edit-suivi-prescription',
  templateUrl: './edit-suivi-prescription.component.html',
  styleUrls: ['./edit-suivi-prescription.component.css']
})
export class EditSuiviPrescriptionComponent implements OnInit {
  public form: FormGroup;
  public contactList: FormArray;

  servicesOcc: any;
  doctors: any;
  ownerAccount: User;
  email: string;

  id: number;
  prescription: Prescription;
  prescriptionSaved: any;
  tests: Tests;
  listTraitement: any;
  medecin: string;
  service: Service;

  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prescService: PrescriptionServiceService, private patService: PatientService, private userService: UtilisateurService) { }

  ngOnInit() {
    this.prescription = new Prescription();
    this.id = this.route.snapshot.params['id'];
    this.prescService.searchPresctById(this.id)
      .subscribe(data => {
        this.prescription = data;
        this.service = this.prescription.service;
        this.medecin = this.prescription.medecin.nom + " " + this.prescription.medecin.prenom;


      }

      );



    this.form = this.fb.group({
      servicePresc: [null, Validators.compose([Validators.required])],
      doctorPresc: [null, Validators.compose([Validators.required])],

      contacts: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    this.contactList = this.form.get('contacts') as FormArray;

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

  //get services in witch receptioniste work
  getServicesOccBySec() {
    this.patService.ListServicesOccupiedByUser(this.ownerAccount.id)
      .subscribe(data => {
        this.servicesOcc = data;

      }, err => {

        console.log(err)
      })
  }
  //get doctors by services
  doctorsOfSelectedService(idS: number) {
    this.patService.doctorsOFSelectedService(idS)
      .subscribe(data => {
        this.doctors = data;



      }, err => {

        console.log(err)
      })
  }



  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      nom_test: ['', Validators.compose([Validators.required])],
      remarque: ['', Validators.compose([Validators.required])],
      rythme: [null, [Validators.pattern("[0-9 ]{1}")]]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }



  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    const formValue = this.form.value;
    // this.prescription = new Prescription();
    this.prescription.patient = this.prescription.patient;
    this.prescription.medecin = formValue['doctorPresc'];
    this.prescription.service = formValue['servicePresc'];
    // this.prescription.secretaire = this.ownerAccount;
    this.prescription.type_presc = "SUIV";
    this.prescription.type = "SUIV";

    this.prescService.editPrescription(this.prescription, this.prescription.id)
      .subscribe(data => {
        this.prescriptionSaved = data;
        this.listTraitement = formValue['contacts'];

        for (let index = 0; index < this.listTraitement.length; index++) {
          this.tests = new Tests();
          let trai = this.listTraitement[index];
          this.tests.nom_test = trai.nom_test;
          this.tests.nbre_par_jr = trai.rythme;
          this.tests.remarque = trai.remarque;
          this.tests.prescription = this.prescriptionSaved;
          // console.log("traitement" + this.traitement)
          this.saveTests(this.tests);


        }
        this.infoBox("La prescription a été modifié avec succès");
        //===>rediriger vers détaille
        this.router.navigate(["/detailSuiviPrescription", this.prescriptionSaved.id]);

      }, err => {
        this.infoBox("Desolé! prescription n'a pas été modifié");
        //this.router.navigate(["/patients"]);

      })


  }

  infoBox(message: string) {

    if (confirm(message)) {

    }
  }


  saveTests(tests: Tests) {
    this.prescService.addTests(tests)
      .subscribe(data => {

      }, err => {

        console.log(err)
      })
  }

  editPatient(id: number) {
    this.router.navigate(["/editPatient", id]);
  }

  editTest(idT: number, idP: number) {
    this.router.navigate(["/editTest", idT, idP]);
    console.log(idT)
  }

  stopTest(item: Tests) {
    this.prescService.archiveTest(item.id)
      .subscribe(data => {
        this.infoBox("Vouliez vous stopper ce test " + item.nom_test);
        this.prescService.searchPresctById(this.id)
          .subscribe(data => {
            this.prescription = data;
            this.service = this.prescription.service;
            this.medecin = this.prescription.medecin.nom + " " + this.prescription.medecin.prenom;

          });

      }
        , err => {

          console.log(err)
        })
  }


  detailSuiviPrescription(idP: number) {
    this.router.navigate(["/detailSuiviPrescription", idP]);

  }
}
