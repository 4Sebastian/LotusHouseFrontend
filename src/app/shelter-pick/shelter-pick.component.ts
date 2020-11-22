import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getString, setString } from '@nativescript/core/application-settings';
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { Page } from '@nativescript/core/ui/page';
import { IssueService } from '../issue.service';

@Component({
  selector: 'app-shelter-pick',
  templateUrl: './shelter-pick.component.html',
  styleUrls: ['./shelter-pick.component.css']
})
export class ShelterPickComponent implements OnInit {

  names: ObservableArray<String>;
  pickedShelter = false;
  loading: Boolean = true;
  isChecked = true;

  constructor(private page: Page, private issueService: IssueService, private route: Router) {
    page.actionBarHidden = true;
    
    this.fetchNames();
    console.log("calledHere");

    if(getString("defaultShelter", "true") == "false"){
      this.isChecked = false;
    }
  }

  ngOnInit(): void {
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

  giveName(i: Number, checked: Boolean){
    // console.log(Number(i));
    // console.log(i);
    // console.log(this.names.getItem(Number(i)));
    // console.log(encodeURI(this.names.getItem(Number(i)).toString()));
    this.pickedShelter = true;
    try{
      var string = this.names.getItem(Number(i));
      console.log(string);
      if(string != "" && this.matchesOneOfNames(string)){
        this.issueService.setShelterName(encodeURI(string.toString()));
        this.pickedShelter = false;
        console.log("worked");
        setString("defaultShelter", "" + checked);
        setString("selectedIndex", "" + i);
        console.log("" + checked);
        this.goToMainScreen();
      }
      
    }catch(e){
      console.log(e);
    }
    
    
  }

  dropDownOpened(){
    console.log("success?");
  }

  matchesOneOfNames(string: String){
    for(var i = 0; i < this.names.length; i++){
      if(string == this.names.getItem(i)){
        return true;
      }
    }
    return false;
  }

  goToMainScreen(){
    this.route.navigate(['/shelterPicked/home']);
  }



  // spliceToNames(namesTogether: String){
  //   let tracker = 0;
  //   let cnt = 0;
  //   while(namesTogether.length > tracker){
  //     this.names[cnt++] = namesTogether.sub


  //   }
  // }

}
