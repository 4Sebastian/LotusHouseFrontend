import { Component } from '@angular/core';
import { getString } from '@nativescript/core/application-settings';
import { Router } from '@angular/router';
import { IssueService } from './issue.service';
import { ObservableArray } from '@nativescript/core/data/observable-array';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  
  constructor(private route: Router, private issueService: IssueService){

  }

  ngOnInit(): void {
    
      this.issueService.getAllNames().subscribe((data: String) => { 
        let stringOfNames = JSON.stringify(data);
        let removedEdgeString = stringOfNames.substring(2, stringOfNames.length-2);
        var names = new ObservableArray(removedEdgeString.substring(10, removedEdgeString.length).split("||"));
        console.log('Data requested ...');
        console.log(stringOfNames);
        names.pop();
        console.log(names);
        console.log(names.length);
        var string = names.getItem(0);
        
        if(getString("selectedIndex", "needShelter") == "needShelter"){
          this.issueService.setShelterName(encodeURI(string.toString()));
        }
        
        if(getString("defaultShelter", "false") == "true" && this.shelterExists(names.getItem(parseInt(getString("selectedIndex"))), names)){
          this.goToMainScreen();
        }
      
      });
    


    
  }

  shelterExists(string: String, names: ObservableArray<String>){
    for(var i = 0; i < names.length; i++){
      if(string == names.getItem(i)){
        return true;
      }
    }
    return false;
  }

  goToMainScreen(){
    this.route.navigate(['/shelterPicked/home']);
  }
}
