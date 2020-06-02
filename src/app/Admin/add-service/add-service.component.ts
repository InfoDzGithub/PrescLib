import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/service/departement.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Service } from 'src/app/model/service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  userForm: FormGroup;
  service: any;
  actifUser: any;

  constructor(private router: Router, private depService: DepartementService, private userService: UtilisateurService, private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.getActifUsers();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      chedServ: [null, Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],
    });
  }
  getActifUsers() {
    this.userService.getActifUsers()
      .subscribe(data => {
        this.actifUser = data;


      }, err => {

        console.log(err)
      })
  }

  onSubmitForm() {
    const formValue = this.userForm.value;

    this.service = new Service();
    this.service.nom = formValue['serviceName'];
    this.service.chefService = formValue['chedServ'];
    this.service.telephone = formValue['telephone'];





    this.depService.addService(this.service)
      .subscribe(data => {

        this.infoBox("Le service  a été ajouté avec succes");


      }, err => {
        this.infoBox("Desolé! le service n'a pas été ajouté, vérifier s'il est nouveau ");

      })

  }
  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/services"]);
    }
  }


  home() {
    this.router.navigate(['global']);
  }
  services() {
    this.router.navigate(['services']);
  }
}
