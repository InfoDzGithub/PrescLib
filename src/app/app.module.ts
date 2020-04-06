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
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from './service/authentification.service';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UtilisateurService } from './service/utilisateur.service';
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'global', component: GlobalComponent },///:id
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'header', component: LogoutComponent },
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
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes), HttpClientModule, FormsModule
  ],
  providers: [
    AuthentificationService, UtilisateurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
