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
  selector: 'app-edit-medical-prescription',
  templateUrl: './edit-medical-prescription.component.html',
  styleUrls: ['./edit-medical-prescription.component.css']
})
export class EditMedicalPrescriptionComponent implements OnInit {

  public form: FormGroup;
  public contactList: FormArray;

  servicesOcc: any;
  doctors: any;
  ownerAccount: User;
  email: string;

  id: number;
  prescription: Prescription;
  prescriptionSaved: any;
  traitement: Traitement;
  //editTraitement: Traitement;
  listTraitement: any;
  medecin: string;
  service: Service;



  // returns all form groups under contacts
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
        console.log(this.service.nom)
        console.log(this.medecin)

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
      medicament: ['', Validators.compose([Validators.required])],
      voix: ['', Validators.compose([Validators.required])], // i.e Email, Phone
      rythme: [null, [Validators.pattern("[0-9 ]{1}")]], // i.e. Home, Office
      remarque: [null, Validators.compose([Validators.required])],
      dosage: [null]
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
    console.log(this.form.value);
    const formValue = this.form.value;
    // this.prescription = new Prescription();
    this.prescription.patient = this.prescription.patient;
    this.prescription.medecin = formValue['doctorPresc'];
    this.prescription.service = formValue['servicePresc'];
    this.prescription.secretaire = this.ownerAccount;
    this.prescription.type_presc = "MDCL";
    this.prescription.type = "MDCL";

    this.prescService.editPrescription(this.prescription, this.prescription.id)
      .subscribe(data => {
        this.prescriptionSaved = data;
        /************************ADD NEW TRAITMENT********************************* */
        this.listTraitement = formValue['contacts'];


        for (let index = 0; index < this.listTraitement.length; index++) {
          this.traitement = new Traitement();

          let trai = this.listTraitement[index];
          this.traitement.nom_traitement = trai.medicament;
          this.traitement.voix = trai.voix;
          this.traitement.rythme = trai.rythme;
          this.traitement.remarque = trai.remarque;
          this.traitement.dosage = trai.dosage;
          this.traitement.prescription = this.prescriptionSaved;
          // console.log("traitement" + this.traitement)
          this.saveTraitment(this.traitement);
        }

        this.infoBox("La prescription a été modifié avec succes");
        //===>rediriger vers détaille
        this.router.navigate(["/detailMedicalPrescription", this.prescriptionSaved.id]);

      }, err => {
        this.infoBox("Desolé! prescription n'a pas été modifié");
        //this.router.navigate(["/patients"]);

      })


  }

  infoBox(message: string) {

    if (confirm(message)) {

    }
  }


  saveTraitment(traitement: Traitement) {
    this.prescService.addTraitement(traitement)
      .subscribe(data => {

      }, err => {

        console.log(err)
      })
  }
  editTraitement(idT: number, idP: number) {
    this.router.navigate(["/editTraitement", idT, idP]);
    console.log(idT)
  }

  stopTraitement(item: Traitement) {
    this.prescService.archiveTraitement(item.id)
      .subscribe(data => {
        this.infoBox("Vouliez vous stopper ce traitement " + item.nom_traitement);
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



  editPatient(id: number) {
    this.router.navigate(["/editPatient", id]);
  }




}
