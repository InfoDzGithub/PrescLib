import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],

})
export class AddUserComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  constructor(private router: Router, private userService: UtilisateurService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required],
      role: ['', Validators.required],
      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
      //photo: ['', Validators.required],
      sexe: ['', Validators.required]


    });
  }


  onSubmitForm() {
    const formValue = this.userForm.value;

    this.user = new User();
    this.user.nom = formValue['lastName'];
    this.user.prenom = formValue['firstName'];
    this.user.email = formValue['email'];
    this.user.date_naissance = formValue['dateNaissance'];
    this.user.role = formValue['role'];
    // this.user.type_user = formValue['role'];
    this.user.telephone = formValue['telephone'];
    //this.user.photo = formValue['photo'];
    this.user.sexe = formValue['sexe'];
    this.user.adress = formValue['adress'];
    if (formValue['role'] == "ADMIN") this.user.type_user = "ADM";
    else if (formValue['role'] == "MEDECIN") this.user.type_user = "MED";
    else if (formValue['role'] == "SECRETAIRE") this.user.type_user = "SCR";
    else if (formValue['role'] == "INFIRMIER") this.user.type_user = "INF";

    this.userService.addUser(this.user)
      .subscribe(data => {
        //this.user = data;
        this.infoBox("L'utilisateur est ajouté avec succes");
      }, err => {
        this.infoBox("Desolé! utilisateur non ajouté");

      })

  }

  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/login"]);
    }
  }

}
