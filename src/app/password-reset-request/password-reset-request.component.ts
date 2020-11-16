import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  response: any;
  
  constructor(private router: Router, private route: ActivatedRoute, private issueService: IssueService) { }

  ngOnInit(): void {
  }

  async onSubmit(username: string, email: string){
    this.response = await this.issueService.passwordResetRequest(username, email);
    if(this.response == 'Successfully sent email'){
      try{
        console.log(await this.router.navigate(['/resetFinalStep'], { relativeTo: this.route }));
      }catch(error){
        console.log(error);
      }
    }
  }

}