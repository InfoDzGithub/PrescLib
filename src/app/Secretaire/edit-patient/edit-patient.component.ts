import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/service/patient.service';
import { DepartementService } from 'src/app/service/departement.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { Historique_Hospitalisation } from 'src/app/model/Historique_Hospitalisation';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.css']
})
export class EditPatientComponent implements OnInit {
  //edit patient
  patient: Patient;
  patientForm: FormGroup;
  id: number;
  patientSaved: any;
  //affect patient
  servicesOcc: any;
  doctors: any;
  affectForm: FormGroup;
  ownerAccount: any;
  email: string;
  hHopsitalisation: any;
  //transfere patient
  transfertForm: FormGroup;
  hHopsitalisationTrsf: any;

  constructor(private router: Router, private route: ActivatedRoute, private depService: DepartementService, private userService: UtilisateurService, private patService: PatientService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.patient = new Patient();
    this.id = this.route.snapshot.params['id'];
    this.patService.searchPatientById(this.id)
      .subscribe(data => {
        this.patient = data;
        this.getAccountOwner();
      }

      );
    this.initForm();
    //affect patient

    this.affectPForm();
    //transfert
    this.transfertPForm();

  }
  //edit patient
  initForm() {
    this.patientForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cni: ['', [Validators.pattern("[0-9 ]{6}")]],
      dateNaissance: ['', Validators.required],
      profession: ['', Validators.required],
      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      sexe: ['', Validators.required],
      gsanguin: ['', Validators.required]



    });
  }


  onSubmitForm() {
    const formValue = this.patientForm.value;


    this.patient.nom = formValue['lastName'];
    this.patient.prenom = formValue['firstName'];
    //let a = formValue['cni'];
    this.patient.cni = formValue['cni'];
    this.patient.date_naissance = formValue['dateNaissance'];
    this.patient.profession = formValue['profession'];
    this.patient.telephone = formValue['telephone'];
    this.patient.sexe = formValue['sexe'];
    this.patient.group_sanguin = formValue['gsanguin'];
    this.patient.adress = formValue['adress'];

    this.patService.editPatient(this.patient, this.id)
      .subscribe(data => {
        this.patientSaved = data;
        this.infoBox("Le patient a été modifier avec succes");
        this.router.navigate(["/detailPatient", this.id]);

      }, err => {
        this.infoBox("Desolé! patient n'a pas été ajouté, vérifier s'il est nouveau ");
        this.router.navigate(["/patients"]);

      })
  }



  infoBox(message: string) {

    if (confirm(message)) {

    }
  }

  detailPatient(id: number) {

    this.router.navigate(["/detailPatient", id]);
  }

  addPrescription(id: number) {

    this.router.navigate(["/addPrescription", id]);
  }
  addSuiviPrescription(id: number) {

    this.router.navigate(["/addSuiviPrescription", id]);
  }
  addSoinPrescription(id: number) {

    this.router.navigate(["/addSoinPrescription", id]);
  }



  //affect patient***************************************************************************************
  getAccountOwner() {
    this.email = sessionStorage.getItem('email');
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
  doctorsOfSelectedService(idS: number) {
    this.patService.doctorsOFSelectedService(idS)
      .subscribe(data => {
        this.doctors = data;
        console.log(this.doctors)


      }, err => {

        console.log(err)
      })
  }

  affectPForm() {
    this.affectForm = this.formBuilder.group({
      serviceAff: [null, Validators.required],
      doctorAff: [null, Validators.required],
      chambre: ['', [Validators.pattern("[0-9 ]{3}")]]
    });
  }

  affect() {

    const formValueAff = this.affectForm.value;

    this.hHopsitalisation = new Historique_Hospitalisation();
    this.hHopsitalisation.service = formValueAff['serviceAff'];
    this.hHopsitalisation.patient = this.patient;
    this.hHopsitalisation.num_chambre = formValueAff['chambre'];
    this.hHopsitalisation.medecin_traitant = formValueAff['doctorAff'];

    this.patService.affectPatient(this.hHopsitalisation)
      .subscribe(data => {

        this.infoBox("Le patient " + this.patient.nom + " a été affecté avec succes au service" + this.hHopsitalisation.service.nom);
        this.router.navigate(["/detailPatient", this.id]);


      }, err => {
        this.infoBox("Desolé! le patient n'a pas été affecté");

      })
  }



  //transfere patient**********************************************************************************************


  transfertPForm() {
    this.transfertForm = this.formBuilder.group({
      serviceTrsf: [null, Validators.required],
      doctorTrsf: [null, Validators.required],
      chambreTrsf: ['', [Validators.pattern("[0-9 ]{3}")]]
    });
  }

  transfert() {

    const formValueAff = this.transfertForm.value;

    this.hHopsitalisationTrsf = new Historique_Hospitalisation();
    this.hHopsitalisationTrsf.service = formValueAff['serviceTrsf'];
    this.hHopsitalisationTrsf.patient = this.patient;
    this.hHopsitalisationTrsf.num_chambre = formValueAff['chambreTrsf'];
    this.hHopsitalisationTrsf.medecin_traitant = formValueAff['doctorTrsf'];




    this.patService.transfertPatient(this.hHopsitalisationTrsf, this.patient.id)
      .subscribe(data => {

        this.infoBox("Le patient " + this.patient.nom + " a été transférer avec succes au service" + this.hHopsitalisationTrsf.service.nom);
        this.router.navigate(["/detailPatient", this.id]);


      }, err => {
        this.infoBox("Desolé! le patient n'a pas été affecté");

      })
  }

}
