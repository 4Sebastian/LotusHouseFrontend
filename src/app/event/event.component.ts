import { Component, OnInit } from '@angular/core';
import { roomContent } from './roomContent';
import { IssueService } from '../issue.service';
import { Room } from '../model.ts/room.model';
import { getViewById } from '@nativescript/core/ui/core/view-base';
// import { getViewById } from '@nativescript/core/ui/content-view'
import { View } from '@nativescript/core/ui/core/view';
// import { View } from '@nativescript/core/ui'
import { EventData } from '@nativescript/core/data/observable';
// import { EventData } from '@nativescript/core/data/observable'
import { TextView } from '@nativescript/core/ui/text-view';
//import { TextView } from '@nativescript/core/ui';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  inputs: ['changed']
})
export class EventComponent implements OnInit {

  // delRoom = 'Delete\nRoom';
  // delEvent = 'Delete\nEvent';
  delRoom = 'Delete';
  delEvent = 'Delete';
 
  rooms: Room[];

  loggedIn: string;

  constructor(private issueService: IssueService) {
    this.issueService.shareMessage.subscribe(message => this.loggedIn = message)
    this.issueService.delay(275).then(() => {
      this.fetchRooms();
    });
    this.issueService.shareReloading.subscribe((reloading: string) => {
      if(reloading == 'true'){
        this.issueService.delay(275).then(() => {
          this.fetchRooms();
        });
      }
    });
   }

  ngOnInit() {
  }

  isLoading(){
    return this.issueService.isLoading();
    //return true;
  }

  noEvents(i: number){
    return this.rooms[i].events.length == 0;
  }

  fetchRooms(){
    this.issueService.getRooms().subscribe((data: Room[]) => {
      this.rooms = data;
      this.issueService.flipLoading();
      console.log('Data requested ...')
      console.log(this.rooms);
    });
  }

  deleteRoom(id){
    this.issueService.deleteRoom(id).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchRooms();
    });
  }

  addRoom(){
    this.issueService.addRoom("Room:", "Room #:", ["Event"]).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchRooms();
    });

  }

  addEvent(id, name, number, events: String[]){

    events.push("New Event");

    this.issueService.updateRoom(id, name, number, events).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchRooms();
      console.log(events);
    });
  }

  deleteEvent(id, name, number, events: String[], event: String){

    var count: number;
    for(var i = 0; i < events.length; i++){
      if(events[i] === event){
        count = i;
        break;
      }
    }

    events.splice(count, 1);

    this.issueService.updateRoom(id, name, number, events).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchRooms();
    });
  }
  
  isNotLoggedIn(){
    return !(this.loggedIn == "Logged In");
  } 

  saveRoom(id, name, number, events: String[], indexOfRoom,args: EventData){


    let parent = (<View>args.object).parent;

    for(var i = 0; i < events.length; i++){
      events[i] = (<TextView>getViewById(parent, "room"+indexOfRoom+"event"+i)).text;
    }

    // for(var i = 0; i < events.length; i++){
    //   events[i] = (<HTMLInputElement>document.querySelector("#"+"room"+indexOfRoom+"event"+i)).value;
    // }
        
    this.issueService.updateRoom(id, name, number, events).subscribe(() => {
      this.issueService.flipLoading();
      this.fetchRooms();
      console.log(events);
    });
  }


}
