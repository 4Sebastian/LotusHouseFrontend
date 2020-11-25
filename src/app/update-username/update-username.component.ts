import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { getString, setString } from '@nativescript/core/application-settings';

@Component({
  selector: 'app-update-username',
  templateUrl: './update-username.component.html',
  styleUrls: ['./update-username.component.css']
})
export class UpdateUsernameComponent implements OnInit {

  isWrong = false;
  error = "";
  updatedUsername = false;

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
  }

  async update(updatedInfo: String){
    if(updatedInfo.length < 8){
      this.isWrong = true;
      this.error = "The username must be at least 8 characters long"
    }else {
      
      try{
        if(await !this.issueService.updateUsername(updatedInfo)){
          this.isWrong = true;
          this.error = getString("httpError", "An Unknown Error has occurred");
          this.updatedUsername = false;
        }else{
          this.isWrong = false;
          this.error = "";
          this.updatedUsername = true;
        }
      }catch(e){
        this.isWrong = true;
        this.error = e;
        this.updatedUsername = false;
      }
    }
  }

  hasUpdatedAccount(){
    return this.updatedUsername;
  }

}
