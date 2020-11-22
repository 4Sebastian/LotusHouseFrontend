import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { MainWindowComponent } from './main-window/main-window.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetTokenUsageComponent } from './password-reset-token-usage/password-reset-token-usage.component';
import { ShelterPickComponent } from './shelter-pick/shelter-pick.component';
import { OptionsComponent } from './options/options.component';
import { RegisterAccountComponent } from './register-account/register-account.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { UpdateUsernameComponent } from './update-username/update-username.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

export const routes: Routes = [
  { path: '', component: ShelterPickComponent, children: [
    
  ]},
  { path: 'shelterPicked', component: MainWindowComponent, children: [
    { path: 'home', component: HomeComponent},
    { path: 'event', component: EventComponent},
    { path: 'login', component: LoginComponent},
    { path: 'options', component: OptionsComponent },
    { path: 'delete', component: DeleteAccountComponent },
    { path: 'updateUsername', component: UpdateUsernameComponent },
    { path: 'updatePassword', component: UpdatePasswordComponent },
    { path: 'passwordResetRequest', component: PasswordResetRequestComponent },
    { path: 'resetFinalStep', component: PasswordResetTokenUsageComponent },
  ]},
  { path: 'registerAccount', component: RegisterAccountComponent },
  { path: 'createAccount', component: CreateAccountComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
