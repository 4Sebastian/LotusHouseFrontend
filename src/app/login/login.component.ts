import { Component, OnInit } from '@angular/core';
import { getString, setString } from '@nativescript/core/application-settings';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn:string;
  cnt: number = 0;

  names: ObservableArray<String>;
  selectedShelter: Number;
  isChecked: Boolean;


  constructor(private issueService: IssueService) {
    this.fetchNames();
    this.selectedShelter = this.getIndex(this.issueService.getShelterName());
    if(getString("defaultShelter", "false") == "true"){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
   }

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

  async fetchNames(){
    this.names = await this.issueService.getAllNames();
  }

  dropDownSelectedIndexChanged(i: Number){
    var string = this.names.getItem(Number(i));
    if(string != "" && this.matchesOneOfNames(string)){
      this.issueService.setShelterName(encodeURI(string.toString()));
    }
  }

  // giveName(i: Number, checked: Boolean){
  //   // console.log(Number(i));
  //   // console.log(i);
  //   // console.log(this.names.getItem(Number(i)));
  //   // console.log(encodeURI(this.names.getItem(Number(i)).toString()));
  //   this.pickedShelter = true;
  //   try{
  //     var string = this.names.getItem(Number(i));
  //     console.log(string);
  //     if(string != "" && this.matchesOneOfNames(string)){
  //       this.issueService.setShelterName(encodeURI(string.toString()));
  //       this.pickedShelter = false;
  //       console.log("worked");
  //       setString("defaultShelter", "" + checked);
  //       console.log("" + checked);
  //       //transfer to next page;
  //     }
      
  //   }catch(e){
  //     console.log(e);
  //   }
    
    
  // }

  matchesOneOfNames(string: String){
    for(var i = 0; i < this.names.length; i++){
      if(string == this.names.getItem(i)){
        return true;
      }
    }
    return false;
  }

  getIndex(name: String){
    const temp = decodeURI(name.toString());
    for(var i = 0; i < this.names.length; i++){
      if(temp == this.names.getItem(i)){
        return i;
      }
    }
    return -1;
  }

  onCheckedChanged(state: Boolean){
    setString("defaultShelter", "" + state);
  }

}