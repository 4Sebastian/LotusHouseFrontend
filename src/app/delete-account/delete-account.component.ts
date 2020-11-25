import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { getString, setString } from '@nativescript/core/application-settings';
import { Page } from '@nativescript/core/ui/page';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  deletedAccount = false;
  isWrong = false;
  error = "";

  constructor(private issueService: IssueService,private page: Page) {
    page.actionBarHidden = true;
   }

  ngOnInit(): void {
  }

  async delete(username: String , password: String , email: String){
    if(username.length < 8){
      this.isWrong = true;
      this.error = "The username must be at least 8 characters long"
    }else if(password.length < 8){
      this.isWrong = true;
      this.error = "The password must be at least 8 characters long"
    }else if(!this.isValidEmail(email)){
      this.isWrong = true;
      this.error = "Please enter a valid email"
    }else{
      try{
        if(await this.issueService.deleteAccount(username, password, email)){
          this.isWrong = false;
          this.error = "";
          this.deletedAccount = true;

        }else{
          this.isWrong = true;
          this.error = getString("httpError", "An Unknown Error has occurred");
          this.deletedAccount = false;
        }  
        // this.issueService.deleteAccount(username, password, email).subscribe(res => {
        //   console.log(res);
        // }, error => {
        //   console.log(error)
        // });
      }catch(e){
        this.isWrong = true;
        this.error = e;
        this.deletedAccount = false;
      }
      
    }
  }


  hasDeletedAccount(){
    return this.deletedAccount;
  }

  isValidEmail(email: String){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toString());
  }
}
