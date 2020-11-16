import { Component, OnInit } from '@angular/core';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn:string;
  cnt: number = 0;


  constructor(private issueService: IssueService) { }

  ngOnInit() {
    this.issueService.shareMessage.subscribe(message => this.loggedIn = message);
  }

  async onSubmit(password: string, username: string){
    
    if (await this.issueService.login(username, password)){    
      this.issueService.changeLogin("Logged In");
      console.log("Logged In");
      this.cnt = 0;
      
    }else{ 
      
      this.issueService.changeLogin("Not Logged In");
      
      this.cnt = 1;
    }
    this.issueService.flipLoading();  
    console.log(password + " and " + username)
  }

  isLoggedIn(){
    return !(this.loggedIn != "Logged In" && this.cnt != 0);
  } 

  isNotLoggedIn(){
    return (this.loggedIn == "Logged In" && this.cnt == 0);
  } 
  
  hasLoggedIn(){
    return !(this.loggedIn == "Logged In");
  }

  logout(){
    this.issueService.changeLogin("Not Logged In");
    this.issueService.logout();
  }

  sendResetEmail(){
    console.log("Still need to figure that one out");
  }

}