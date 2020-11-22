import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';
import { NativeScriptFormsModule } from '@nativescript/angular/forms';
import { NativeScriptHttpClientModule } from '@nativescript/angular/http-client';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '@src/app/app-routing.module.tns';
import { AppComponent } from '@src/app/app.component';
import { EventComponent } from '@src/app/event/event.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/login/login.component';
import { MainWindowComponent } from '@src/app/main-window/main-window.component';
import { PasswordResetRequestComponent } from '@src/app/password-reset-request/password-reset-request.component';
import { PasswordResetTokenUsageComponent } from '@src/app/password-reset-token-usage/password-reset-token-usage.component';

import { IssueService } from '@src/app/issue.service';
import { ShelterPickComponent } from '@src/app/shelter-pick/shelter-pick.component';
import { RegisterAccountComponent } from '@src/app/register-account/register-account.component';
import { CreateAccountComponent } from '@src/app/create-account/create-account.component';
import { OptionsComponent } from '@src/app/options/options.component';

import { registerElement } from 'nativescript-angular/element-registry';
import { DeleteAccountComponent } from '@src/app/delete-account/delete-account.component';
import { UpdateUsernameComponent } from '@src/app/update-username/update-username.component';
import { UpdatePasswordComponent } from '@src/app/update-password/update-password.component';
registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);


// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
// import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainWindowComponent,
    EventComponent,
    PasswordResetRequestComponent,
    PasswordResetTokenUsageComponent,
    ShelterPickComponent,
    RegisterAccountComponent,
    CreateAccountComponent,
    OptionsComponent,
    DeleteAccountComponent,
    UpdateUsernameComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    NativeScriptFormsModule,
    BrowserModule,
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
  ],
  providers: [IssueService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
