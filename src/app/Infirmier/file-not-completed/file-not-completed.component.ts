import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { CareFileService } from 'src/app/service/care-file.service';
@Component({
  selector: 'app-file-not-completed',
  templateUrl: './file-not-completed.component.html',
  styleUrls: ['./file-not-completed.component.css']
})
export class FileNotCompletedComponent implements OnInit {

  user: User = new User();
  email: string;
  files: any;
  curentPage: number = 0;
  size: number = 3;
  pages: Array<number>;
  constructor(public authService: AuthentificationService, public userService: UtilisateurService,
    private router: Router, private fileService: CareFileService) { }



  ngOnInit() {
    this.email = sessionStorage.getItem('email');
    console.log("email: " + this.email)
    this.userService.searchUserByEmail(this.email)
      .subscribe(data => {
        this.user = data;
        if (this.user.role == "infirmier") {
          this.fileNotCompleted(this.user.id)
        }

      });


  }

  gotoPage(i: number) {
    this.curentPage = i;
    this.ngOnInit();
  }

  fileNotCompleted(id: number) {
    this.fileService.fileNotCompleted(id, this.curentPage, this.size)
      .subscribe(data => {
        this.files = data;
        this.pages = new Array(this.files.totalPages)


      }, err => {

        console.log(err)
      })

  }


  ficheSoin(id: number) {
    this.router.navigate(["/editFicheSoin", id]);
  }

  ficheSoinReel(id: number) {
    this.router.navigate(["/editFicheSoinReel", id]);
  }

  ficheSoinAliment(id: number) {
    this.router.navigate(["/editFicheSoinAliment", id]);
  }

  ficheSoinSuivi(id: number) {
    this.router.navigate(["/editFicheSoinSuivi", id]);
  }

  home() {
    this.router.navigate(["/global"]);
  }
}
