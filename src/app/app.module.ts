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
import { DossierMedicalComponent } from './Infirmier/dossier-medical/dossier-medical.component';
import { PrescriptionActifComponent } from './Infirmier/prescription-actif/prescription-actif.component';
import { FichesInfirmierActifComponent } from './Infirmier/fiches-infirmier-actif/fiches-infirmier-actif.component';
import { FicheSoinComponent } from './Infirmier/fiche-soin/fiche-soin.component';
import { FicheSoinReelComponent } from './Infirmier/fiche-soin-reel/fiche-soin-reel.component';
import { FicheSoinAlimentComponent } from './Infirmier/fiche-soin-aliment/fiche-soin-aliment.component';
import { FicheSoinSuiviComponent } from './Infirmier/fiche-soin-suivi/fiche-soin-suivi.component';
import { FileNotCompletedComponent } from './Infirmier/file-not-completed/file-not-completed.component';
import { DossierSByPrescComponent } from './Medecin/dossier-sby-presc/dossier-sby-presc.component';
import { DetailFileMDCLComponent } from './Medecin/detail-file-mdcl/detail-file-mdcl.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'global', component: GlobalComponent, canActivate: [AuthGaurdService] },
  { path: 'forgetPassword', component: ForgetPasswordComponent, canActivate: [AuthGaurdService] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'header', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGaurdService] },
  { path: 'addUser', component: AddUserComponent, canActivate: [AuthGaurdService] },
  { path: 'detailUser/:id', component: DetailUserComponent, canActivate: [AuthGaurdService] },
  { path: 'editUser/:id', component: EditUserComponent, canActivate: [AuthGaurdService] },
  { path: 'parametre/:id', component: ParametreComponent, canActivate: [AuthGaurdService] },
  { path: 'services', component: ServicesComponent, canActivate: [AuthGaurdService] },
  { path: 'addService', component: AddServiceComponent, canActivate: [AuthGaurdService] },
  { path: 'editService/:id', component: EditServiceComponent, canActivate: [AuthGaurdService] },
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGaurdService] },
  { path: 'detailPatient/:id', component: DetailPatientComponent, canActivate: [AuthGaurdService] },
  { path: 'addPatient', component: AddPatientComponent, canActivate: [AuthGaurdService] },
  { path: 'editPatient/:id', component: EditPatientComponent, canActivate: [AuthGaurdService] },
  { path: 'historiquePrescription/:id', component: HistoriquePrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'currentResidentPrescription/:id', component: ResidentServicePrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'addPrescription/:id', component: AddPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'addSuiviPrescription/:id', component: AddSuiviPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'addSoinPrescription/:id', component: AddSoinPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'addAlimentPrescription/:id', component: AddAlimentPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'detailMedicalPrescription/:id', component: DetailMedicalPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'detailSoinPrescription/:id', component: DetailSoinPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'detailSuiviPrescription/:id', component: DetailSuiviPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'detailAlimentPrescription/:id', component: DetailAlimentPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'editMedicalPrescription/:id', component: EditMedicalPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'editTraitement/:idT/:idP', component: EditTraitementComponent, canActivate: [AuthGaurdService] },
  { path: 'editSuiviPrescription/:id', component: EditSuiviPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'editTest/:idT/:idP', component: EditTestComponent, canActivate: [AuthGaurdService] },
  { path: 'editSoinPrescription/:id', component: EditSoinPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'editTestSoin/:idT/:idP', component: EditTestSoinComponent, canActivate: [AuthGaurdService] },
  { path: 'editAlimentPrescription/:id', component: EditAlimentPrescriptionComponent, canActivate: [AuthGaurdService] },
  { path: 'searchTraitement', component: SearchTraitemntComponent, canActivate: [AuthGaurdService] },
  { path: 'dossierMedical', component: DossierMedicalComponent, canActivate: [AuthGaurdService] },
  { path: 'PrescriptionActif/:id', component: PrescriptionActifComponent, canActivate: [AuthGaurdService] },
  { path: 'ActifFilesCare/:id', component: FichesInfirmierActifComponent, canActivate: [AuthGaurdService] },
  { path: 'editFicheSoin/:id', component: FicheSoinComponent, canActivate: [AuthGaurdService] },
  { path: 'editFicheSoinReel/:id', component: FicheSoinReelComponent, canActivate: [AuthGaurdService] },
  { path: 'editFicheSoinAliment/:id', component: FicheSoinAlimentComponent, canActivate: [AuthGaurdService] },
  { path: 'editFicheSoinSuivi/:id', component: FicheSoinSuiviComponent, canActivate: [AuthGaurdService] },
  { path: 'fileNotCompleted', component: FileNotCompletedComponent, canActivate: [AuthGaurdService] },
  { path: 'fileCareByPresc/:id', component: DossierSByPrescComponent, canActivate: [AuthGaurdService] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGaurdService] },







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
    SearchTraitemntComponent,
    DossierMedicalComponent,
    PrescriptionActifComponent,
    FichesInfirmierActifComponent,
    FicheSoinComponent,
    FicheSoinReelComponent,
    FicheSoinAlimentComponent,
    FicheSoinSuiviComponent,
    FileNotCompletedComponent,
    DossierSByPrescComponent,
    DetailFileMDCLComponent,
    PageNotFoundComponent
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
