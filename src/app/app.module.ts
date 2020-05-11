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
import { AddServiceComponent } from './Admin/add-service/add-service.component';
import { EditServiceComponent } from './Admin/edit-service/edit-service.component';
import { PatientsComponent } from './Secretaire/patients/patients.component';
import { DetailPatientComponent } from './Secretaire/detail-patient/detail-patient.component';
import { AddPatientComponent } from './Secretaire/add-patient/add-patient.component';
import { EditPatientComponent } from './Secretaire/edit-patient/edit-patient.component';
import { HistoriquePrescriptionComponent } from './Secretaire/historique-prescription/historique-prescription.component';
import { ResidentServicePrescriptionComponent } from './Secretaire/resident-service-prescription/resident-service-prescription.component';
import { AddPrescriptionComponent } from './Secretaire/add-prescription/add-prescription.component';
import { AddSuiviPrescriptionComponent } from './Secretaire/add-suivi-prescription/add-suivi-prescription.component';
import { AddSoinPrescriptionComponent } from './Secretaire/add-soin-prescription/add-soin-prescription.component';
import { AddAlimentPrescriptionComponent } from './Secretaire/add-aliment-prescription/add-aliment-prescription.component';
import { DetailMedicalPrescriptionComponent } from './Secretaire/detail-medical-prescription/detail-medical-prescription.component';
import { DetailSoinPrescriptionComponent } from './Secretaire/detail-soin-prescription/detail-soin-prescription.component';
import { DetailSuiviPrescriptionComponent } from './Secretaire/detail-suivi-prescription/detail-suivi-prescription.component';
import { DetailAlimentPrescriptionComponent } from './Secretaire/detail-aliment-prescription/detail-aliment-prescription.component';
import { EditMedicalPrescriptionComponent } from './Secretaire/edit-medical-prescription/edit-medical-prescription.component';
import { EditTraitementComponent } from './Secretaire/edit-traitement/edit-traitement.component';
import { EditSuiviPrescriptionComponent } from './Secretaire/edit-suivi-prescription/edit-suivi-prescription.component';
import { EditTestComponent } from './Secretaire/edit-test/edit-test.component';
import { EditSoinPrescriptionComponent } from './Secretaire/edit-soin-prescription/edit-soin-prescription.component';
import { EditTestSoinComponent } from './Secretaire/edit-test-soin/edit-test-soin.component';
import { EditAlimentPrescriptionComponent } from './Secretaire/edit-aliment-prescription/edit-aliment-prescription.component';
import { SearchTraitemntComponent } from './Secretaire/search-traitemnt/search-traitemnt.component';
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
  { path: 'addService', component: AddServiceComponent },
  { path: 'editService/:id', component: EditServiceComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'detailPatient/:id', component: DetailPatientComponent },
  { path: 'addPatient', component: AddPatientComponent },
  { path: 'editPatient/:id', component: EditPatientComponent },
  { path: 'historiquePrescription/:id', component: HistoriquePrescriptionComponent },
  { path: 'currentResidentPrescription/:id', component: ResidentServicePrescriptionComponent },
  { path: 'addPrescription/:id', component: AddPrescriptionComponent },
  { path: 'addSuiviPrescription/:id', component: AddSuiviPrescriptionComponent },
  { path: 'addSoinPrescription/:id', component: AddSoinPrescriptionComponent },
  { path: 'addAlimentPrescription/:id', component: AddAlimentPrescriptionComponent },
  { path: 'detailMedicalPrescription/:id', component: DetailMedicalPrescriptionComponent },
  { path: 'detailSoinPrescription/:id', component: DetailSoinPrescriptionComponent },
  { path: 'detailSuiviPrescription/:id', component: DetailSuiviPrescriptionComponent },
  { path: 'detailAlimentPrescription/:id', component: DetailAlimentPrescriptionComponent },
  { path: 'editMedicalPrescription/:id', component: EditMedicalPrescriptionComponent },
  { path: 'editTraitement/:idT/:idP', component: EditTraitementComponent },
  { path: 'editSuiviPrescription/:id', component: EditSuiviPrescriptionComponent },
  { path: 'editTest/:idT/:idP', component: EditTestComponent },
  { path: 'editSoinPrescription/:id', component: EditSoinPrescriptionComponent },
  { path: 'editTestSoin/:idT/:idP', component: EditTestSoinComponent },
  { path: 'editAlimentPrescription/:id', component: EditAlimentPrescriptionComponent },
  { path: 'searchTraitement', component: SearchTraitemntComponent },







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
    ServicesComponent,
    AddServiceComponent,
    EditServiceComponent,
    PatientsComponent,
    DetailPatientComponent,
    AddPatientComponent,
    EditPatientComponent,
    HistoriquePrescriptionComponent,
    ResidentServicePrescriptionComponent,
    AddPrescriptionComponent,
    AddSuiviPrescriptionComponent,
    AddSoinPrescriptionComponent,
    AddAlimentPrescriptionComponent,
    DetailMedicalPrescriptionComponent,
    DetailSoinPrescriptionComponent,
    DetailSuiviPrescriptionComponent,
    DetailAlimentPrescriptionComponent,
    EditMedicalPrescriptionComponent,
    EditTraitementComponent,
    EditSuiviPrescriptionComponent,
    EditTestComponent,
    EditSoinPrescriptionComponent,
    EditTestSoinComponent,
    EditAlimentPrescriptionComponent,
    SearchTraitemntComponent
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
