import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { getString, setString } from '@nativescript/core/application-settings';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  isWrong = false;
  error = "";
  updatedPassword = false;

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
  }

  async update(updatedInfo: String){
    if(updatedInfo.length < 8){
      this.isWrong = true;
      this.error = "The password must be at least 8 characters long"
    }else {
      
      try{

        if(await this.issueService.updatePassword(updatedInfo)){
          this.isWrong = false;
          this.error = "";
          this.updatedPassword = true;
        }else{
          this.isWrong = true;
          this.error = getString("httpError", "An Unknown Error has occurred");
          this.updatedPassword = false;
        }
      }catch(e){
        this.isWrong = true;
        this.error = e;
        this.updatedPassword = false;
      }
      
    }
  }

  hasUpdatedAccount(){
    return this.updatedPassword;
  }

}
