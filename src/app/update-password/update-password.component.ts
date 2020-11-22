import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';

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

  update(updatedInfo: String){
    if(updatedInfo.length < 8){
      this.isWrong = true;
      this.error = "The password must be at least 8 characters long"
    }else {
      this.isWrong = false;
      this.error = "";
      this.updatedPassword = true;
      try{
        this.issueService.updatePassword(updatedInfo).subscribe();
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
