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
    if(getString("selectedIndex", "needShelter") == "needShelter"){
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
        this.issueService.setShelterName(encodeURI(string.toString()));
      });
    }


    if(getString("defaultShelter", "false") == "true"){
      this.goToMainScreen();
    }
  }

  goToMainScreen(){
    this.route.navigate(['/shelterPicked/home']);
  }
}
