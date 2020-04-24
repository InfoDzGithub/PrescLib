import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartementService } from 'src/app/service/departement.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {

  user: User;
  id: number;
  acces: any;
  //service_user: any;
  //totalElement: number;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  servicesOccupied: any;
  userForm: FormGroup;
  services: any;
  //selected = [];
  email: string;
  ownerAccount: User;
  //
  selectedFiles;
  progress: number;
  currentFileUpload: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UtilisateurService) { }


  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.userService.searchUserById(this.id)
      .subscribe(data => this.user = data);
    this.initForm();





  }






  initForm() {
    this.userForm = this.formBuilder.group({

      adress: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern("[0-9 ]{11}")]],

      email: ['', [Validators.required, Validators.email]],
      dateNaissance: ['', Validators.required]




    });
  }




  onSubmitForm() {
    const formValue = this.userForm.value;


    this.user.telephone = formValue['telephone'];
    this.user.adress = formValue['adress'];
    this.user.email = formValue['email'];
    this.user.date_naissance = formValue['dateNaissance'];


    this.userService.editUser(this.user, this.id)
      .subscribe(data => {
        this.uploadPhoto();
        this.infoBox("Votre profile a été modifier");

      }, err => {
        this.infoBox("Desolé! votre profile n' a pas modifié");

      })

  }

  infoBox(message: string) {

    if (confirm(message)) {
      //this.router.navigate(["/users"]);
      this.detailUser(this.user.id);
    }
  }

  //photo
  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
    //this.addPhoto = true;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.userService.uploadPhotoUser(this.currentFileUpload, this.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {

        // this.currentTime=Date.now();
        //this.editPhoto=false;
      }
    }, err => {
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  detailUser(id: number) {

    this.router.navigate(["/detailUser", id]);
  }


}
