import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/model/service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DepartementService } from 'src/app/service/departement.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {
  userForm: FormGroup;
  service: any;
  id: number;
  actifUser: any;
  nomCompletDuChef: string;

  constructor(private route: ActivatedRoute, private router: Router, private depService: DepartementService, private userService: UtilisateurService, private http: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit(): void {

    this.service = new Service();
    this.id = this.route.snapshot.params['id'];
    this.depService.getOneServiceById(this.id)
      .subscribe(data => {
        this.service = data;
        this.nomCompletDuChef = this.service.chefService.nom + " " + this.service.chefService.prenom;
        console.log("chef:::" + this.nomCompletDuChef);
      });
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


  //actifDoctor
  getActifUsers() {
    this.userService.getActifUsers()
      .subscribe(data => {
        this.actifUser = data;
        console.log(this.actifUser)


      }, err => {

        console.log(err)
      })
  }
  onSubmitForm() {
    const formValue = this.userForm.value;


    this.service.nom = formValue['serviceName'];
    this.service.chefService = formValue['chedServ'];
    this.service.telephone = formValue['telephone'];




    this.depService.editService(this.service, this.id)
      .subscribe(data => {

        this.infoBox("Le service a été modifier avec succes");

      }, err => {
        this.infoBox("Desolé! service n' a pas était modifier");

      })
  }
  infoBox(message: string) {

    if (confirm(message)) {
      this.router.navigate(["/services"]);
    }
  }

}
