import { Component, OnInit } from '@angular/core';
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

  constructor(private page: Page, private issueService: IssueService) {
    page.actionBarHidden = true;
    
    this.fetchNames();
    console.log("calledHere");
    
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
      console.log(this.names);
      console.log(this.names.length);
    });
  }

  giveName(i: Number){
    // console.log(Number(i));
    // console.log(i);
    // console.log(this.names.getItem(Number(i)));
    // console.log(encodeURI(this.names.getItem(Number(i)).toString()));
    return this.issueService.setShelterName(encodeURI(this.names.getItem(Number(i)).toString()));
    
  }



  // spliceToNames(namesTogether: String){
  //   let tracker = 0;
  //   let cnt = 0;
  //   while(namesTogether.length > tracker){
  //     this.names[cnt++] = namesTogether.sub


  //   }
  // }

}
