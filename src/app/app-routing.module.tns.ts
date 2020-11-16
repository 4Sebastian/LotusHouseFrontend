import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';

import { MainWindowComponent } from './main-window/main-window.component';
import { HomeComponent } from './home/home.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetRequestComponent } from './password-reset-request/password-reset-request.component';
import { PasswordResetTokenUsageComponent } from './password-reset-token-usage/password-reset-token-usage.component';

export const routes: Routes = [
  { path: '', component: MainWindowComponent, children: [
    { path: '', component: HomeComponent},
    { path: 'event', component: EventComponent},
    { path: 'login', component: LoginComponent },
    { path: 'passwordResetRequest', component: PasswordResetRequestComponent },
    { path: 'resetFinalStep', component: PasswordResetTokenUsageComponent },
  ]},
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
