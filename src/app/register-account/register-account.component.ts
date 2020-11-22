import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})
export class RegisterAccountComponent implements OnInit {

  error: String;
  isWrong = false;
  sentRequest = false;

  constructor(private issueService: IssueService,private page: Page) {
    page.actionBarHidden = true;

    this.error = "";
   }

  ngOnInit(): void {
  }

  register(firstname: String, lastname: String, email: String, phoneNumber: String, shelterName: String){
    if(!this.isValidEmail(email)){
      this.error = "Please enter a valid email"
      this.isWrong = true;
    }else if(!this.isValidPhoneNumber(phoneNumber)){
      this.error = "Please enter a valid phonenumber"
      this.isWrong = true;
    }else if(firstname == ""){
      this.error = "Please enter your first name";
    }else if(lastname == ""){
      this.error = "Please enter your last name";
    }else if(shelterName == ""){
      this.error = "Please enter your shelter's name";
    }else{
      this.isWrong = false;
      this.sentRequest = true;
      this.sendRegisterRequest(firstname, lastname, email, phoneNumber, shelterName);
      
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

  async sendRegisterRequest(firstname: String, lastname: String, email: String, phoneNumber: String, shelterName: String){
    try{
      await this.issueService.requestAccount(firstname, lastname, email, phoneNumber, shelterName).subscribe();
    }catch(e){
      console.log(e);
      this.isWrong = true;
      this.sentRequest = false;
    }
    
  }

}
