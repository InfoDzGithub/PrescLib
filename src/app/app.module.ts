import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GlobalComponent } from './global/global.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationService } from './service/authentification.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UtilisateurService } from './service/utilisateur.service';
import { UsersComponent } from './Admin/users/users.component';
import { AddUserComponent } from './Admin/add-user/add-user.component';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgSelectModule } from '@ng-select/ng-select';
import { DepartementService } from './service/departement.service';
import { DetailUserComponent } from './Admin/detail-user/detail-user.component';
import { EditUserComponent } from './Admin/edit-user/edit-user.component';
import { ParametreComponent } from './Admin/parametre/parametre.component';
import { ServicesComponent } from './Admin/services/services.component';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'global', component: GlobalComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'header', component: LogoutComponent },
  { path: 'users', component: UsersComponent },
  { path: 'addUser', component: AddUserComponent },
  { path: 'detailUser/:id', component: DetailUserComponent },
  { path: 'editUser/:id', component: EditUserComponent },
  { path: 'parametre/:id', component: ParametreComponent },
  { path: 'services', component: ServicesComponent },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    GlobalComponent,
    MenuComponent,
    ForgetPasswordComponent,
    UsersComponent,
    AddUserComponent,
    DetailUserComponent,
    EditUserComponent,
    ParametreComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule,
    ReactiveFormsModule, NgSelectModule
  ],
  providers: [
    AuthentificationService, UtilisateurService, DepartementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
