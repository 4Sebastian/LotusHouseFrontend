import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';
import { IssueService } from '../issue.service';
import { getString, setString } from '@nativescript/core/application-settings';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  error: String;
  isWrong = false;
  accountCreated = false;

  constructor(private issueService: IssueService, private page: Page) {
    page.actionBarHidden = true;
   }

  ngOnInit(): void {
  }

  async create(username: String, password: String, email: String, Sheltername: String, token: String){
    if(!this.isValidEmail(email)){
      this.error = "Please enter a valid email"
      this.isWrong = true;
    }else if(username.length < 7){
      this.error = "Your username must be at least 8 characters long";
      this.isWrong = true;
    }else if(this.isNotValidUsername(username)){
      this.error = "Your username can only contain letters and numbers"
      this.isWrong = true;
    }else if(!this.isValidPassword(password)){
      this.isWrong = true;
      this.error = "Please have a password between 7 to 15 characters with at least one numeric digit and a special character"
    }else if(Sheltername.length < 1){
      this.error = "Please enter you shelter's name";
      this.isWrong = true;
    }else if(token.length < 150){
      this.error = "Please enter your specified token";
      this.isWrong = true;
    }else{
      
      await this.sendCreateRequest(username, password, email, Sheltername, token);
      
    }
  }

  isValidEmail(email: String){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toString());
  }

  isValidPhoneNumber(phoneNumber: String){
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneno.test(phoneNumber.toString());
  }

  isValidPassword(inputtxt: String){
    var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return paswd.test(inputtxt.toString());
  }

  isNotValidUsername(fld: String){
    var illegalChars = /\W/;
    return illegalChars.test(fld.toString());
  }

  async sendCreateRequest(username: String, password: String, email: String, Sheltername: String, token: String){
    try{
      var meh = await this.issueService.createAccount(username, password, email, Sheltername, token);
      if(!(meh)){
        this.error = getString("httpError", "An Unknown Error has occurred");
        this.isWrong = true;
        this.accountCreated = false;
      }else{
        this.error = "";
        this.isWrong = false;
        this.accountCreated = true;
      };
    }catch(e){
      console.log(e);
      this.error = e;
      this.isWrong = true;
      this.accountCreated = false;
    }
    
  }

}
