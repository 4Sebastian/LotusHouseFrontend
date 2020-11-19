import { Component, OnInit } from '@angular/core';
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

  constructor(private page: Page, private issueService: IssueService) {
    page.actionBarHidden = true;
    
    if(getString("defaultShelter", "false") == "true"){
      //transfer to next page
    }
    
    this.fetchNames();
    console.log("calledHere");

    
    
  }

  ngOnInit(): void {
  }

  async fetchNames(){
    this.names = await this.issueService.getAllNames();
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
        console.log("" + checked);
        //transfer to next page;
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



  // spliceToNames(namesTogether: String){
  //   let tracker = 0;
  //   let cnt = 0;
  //   while(namesTogether.length > tracker){
  //     this.names[cnt++] = namesTogether.sub


  //   }
  // }

}
