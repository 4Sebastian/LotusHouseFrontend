import { Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core/ui/page';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  error: String;
  isWrong = false;

  constructor(private issueService: IssueService, private page: Page) {
    page.actionBarHidden = true;
   }

  ngOnInit(): void {
  }

  create(username: String, password: String, email: String, Sheltername: String){
    if(!this.isValidEmail(email)){
      this.error = "Please enter a valid email"
      this.isWrong = true;
    }else if(username.length < 7){
      this.error = "Your username must be at least 8 characters long";
    }else if(password.length < 7){
      this.error = "Your password must be at least 8 characters long";
    }else{
      this.isWrong = false;
      this.sendCreateRequest(username, password, email, Sheltername);
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

  async sendCreateRequest(username: String, password: String, email: String, Sheltername: String){
    try{
      await this.issueService.createAccount(username, password, email, Sheltername).subscribe();
    }catch(e){
      console.log(e);
      this.isWrong = true;
    }
    
  }

}
