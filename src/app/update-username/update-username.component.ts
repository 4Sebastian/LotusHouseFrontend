import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';

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

  update(updatedInfo: String){
    if(updatedInfo.length < 8){
      this.isWrong = true;
      this.error = "The username must be at least 8 characters long"
    }else {
      this.isWrong = false;
      this.error = "";
      this.updatedUsername = true;
      try{
        this.issueService.updateUsername(updatedInfo).subscribe();
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
