import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-reset-token-usage',
  templateUrl: './password-reset-token-usage.component.html',
  styleUrls: ['./password-reset-token-usage.component.css']
})
export class PasswordResetTokenUsageComponent implements OnInit {

  response: any;

  constructor(private issueService: IssueService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  async onSubmit(newPassword: string, confirmPassword: string, resetToken: string){
    if(newPassword.length < 8){
      if(!newPassword){
        return this.response = 'Please input a new password'
      }else{
        return this.response = 'The new password is too short'
      }
    }
    if(newPassword != confirmPassword){
      if(!confirmPassword){
        this.response = 'Please confirm the new password'
      }else{
        return this.response = 'The confirm password does not match the new password'
      }
    }
    if(!resetToken){
      return this.response = 'Please enter the reset Token sent to your email'
    }else{
      this.response = await this.issueService.changePasswordWithToken(newPassword, resetToken);
      if(this.response == 'Successfully reset password'){
        await this.router.navigate(['/shelterPicked/login']);
      }
    }
  }

}
