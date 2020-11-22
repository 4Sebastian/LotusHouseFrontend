import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent implements OnInit {

  deletedAccount = false;
  isWrong = false;
  error = "";

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
  }

  delete(username: String , password: String , email: String){
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
        this.isWrong = false;
        this.error = "";
        this.deletedAccount = true;
        this.issueService.deleteAccount(username, password, email).subscribe();
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
