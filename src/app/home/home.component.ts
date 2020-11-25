import { Component, OnInit } from '@angular/core';

import { IssueService} from '../issue.service';

import { Event } from '../model.ts/event.model';
import { relative } from 'path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  inputs: ['changed']
})
export class HomeComponent implements OnInit {
  events: Event[];

  loggedIn: string;

  constructor(private issueService: IssueService) {
    this.issueService.shareMessage.subscribe(message => this.loggedIn = message);
    // this.issueService.delay(275).then(() => {
    //   this.fetchEvents();
    // });
    this.fetchEvents();
    this.issueService.shareReloading.subscribe((reloading: string) => {
      if(reloading == 'true'){
        // this.issueService.delay(275).then(() => {
        //   this.fetchEvents();
        // });
        this.fetchEvents();
      }
    });
    
  }

  
  ngOnInit() {
  }

  

  isLoading(){
    return this.issueService.isLoading();
    //return true;
  }

  async fetchEvents(){
    await this.issueService.getEvents().subscribe((data: Event[]) => { 
      this.events = data;
      this.issueService.flipLoading(); 
      console.log('Data requested ...')
      console.log(this.events);
    });
  }

  addEvent(){
    this.issueService.addEvent("title", "date", "Input Description Here ").subscribe(()=>{
      this.issueService.flipLoading();
      this.fetchEvents();
    });
  }

  deleteEvent(id){
    console.log(id);
    this.issueService.deleteEvent(id).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchEvents();
    });       
  }

  savePost(id, title, date, description){
    this.issueService.updateEvent(id, title, date, description).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchEvents();
      console.log(title);
    });
  }

  isNotLoggedIn(){
    return !(this.loggedIn == "Logged In");
  } 

}
