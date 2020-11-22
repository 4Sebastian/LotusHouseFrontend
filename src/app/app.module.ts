import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { EventComponent } from '@src/app/event/event.component';
import { HomeComponent } from '@src/app/home/home.component';
import { LoginComponent } from '@src/app/login/login.component';
import { MainWindowComponent } from '@src/app/main-window/main-window.component';
import { PasswordResetRequestComponent } from '@src/app/password-reset-request/password-reset-request.component';
import { PasswordResetTokenUsageComponent } from '@src/app/password-reset-token-usage/password-reset-token-usage.component';
import { ShelterPickComponent } from '@src/app/shelter-pick/shelter-pick.component';
import { RegisterAccountComponent } from '@src/app/register-account/register-account.component';
import { CreateAccountComponent } from '@src/app/create-account/create-account.component';
import { OptionsComponent } from '@src/app/options/options.component';
import { DeleteAccountComponent } from '@src/app/delete-account/delete-account.component';
import { UpdateUsernameComponent } from '@src/app/update-username/update-username.component';
import { UpdatePasswordComponent } from '@src/app/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    HomeComponent,
    LoginComponent,
    MainWindowComponent,
    PasswordResetRequestComponent,
    PasswordResetTokenUsageComponent,
    ShelterPickComponent,
    RegisterAccountComponent,
    CreateAccountComponent,
    OptionsComponent,
    DeleteAccountComponent,
    UpdateUsernameComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
