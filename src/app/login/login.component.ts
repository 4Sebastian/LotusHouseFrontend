import { Component, OnInit } from '@angular/core';
import { getString, setString } from '@nativescript/core/application-settings';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { Observable, Page } from '@nativescript/core/ui/page';
import { IssueService } from '../issue.service';
import { DropDown } from "nativescript-drop-down";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loggedIn:string;
  cnt: number = 0;

  names: ObservableArray<String>;
  selectedIndex: Number;
  isChecked: Boolean;
  private firstCheck = true;


  constructor(private issueService: IssueService, private page: Page) {
    var viewModel = new Observable();
    
    this.selectedIndex = parseInt(getString("selectedIndex", "0"));
    this.fetchNames();

    viewModel.set("selectedIndex", this.selectedIndex);
 
    page.bindingContext = viewModel;
    console.log(this.selectedIndex);
    
   }

  ngOnInit() {
    this.issueService.shareMessage.subscribe(message => this.loggedIn = message);
    console.log(getString("defaultShelter"));
    if(getString("defaultShelter", "false") == "true"){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
    
  }

  // async fixListPicker(){
  //   //this.selectedShelter = parseInt(getString("selectedIndex", "0"));
    
  // }

  getSelectedIndex(listpicker: DropDown){
    listpicker.selectedIndex = (Number)(this.selectedIndex);
  }

  async getName(){
    this.selectedIndex = await this.getIndex(this.issueService.getShelterName());
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
    console.log(password + " and " + username);
    console.log(this.issueService.getShelterName());
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
    await this.issueService.getAllNames().subscribe((data: String) => { 
      let stringOfNames = JSON.stringify(data);
      let removedEdgeString = stringOfNames.substring(2, stringOfNames.length-2);
      this.names = new ObservableArray(removedEdgeString.substring(10, removedEdgeString.length).split("||"));
      console.log('Data requested ...');
      console.log(stringOfNames);
      this.names.pop();
      console.log(this.names);
      console.log(this.names.length);
    });
  }

  dropDownSelectedIndexChanged(i: Number){
    var string = this.names.getItem(Number(i));
    if(string != "" && this.matchesOneOfNames(string)){
      this.issueService.setShelterName(string.toString());
    }
    console.log(this.issueService.getShelterName());
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
    console.log(decodeURI(name.toString()));
    const temp = decodeURI(name.toString());
    for(var i = 0; i < this.names.length; i++){
      if(temp == this.names.getItem(i)){
        return i;
      }
    }
    return -1;
  }

  onCheckedChange($event){
    console.log(getString("defaultShelter"));
    if(getString("defaultShelter", "true") == "true" && !this.firstCheck){
      setString("defaultShelter", "false");
      console.log("now false");
    }else{
      setString("defaultShelter", "true");
      console.log("now true");
    }
    this.firstCheck = false;
  }

}