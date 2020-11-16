import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { getString, setString } from '@nativescript/core/application-settings';
//import { getString, setString } from '@nativescript/core/application-settings/application-settings';
import { Event } from './model.ts/event.model';
//import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  uri = 'https://lotushouseschedule.herokuapp.com';

  private message = new BehaviorSubject('Not Logged In');
  private token = new BehaviorSubject('');
  private loading = new BehaviorSubject('false');
  private reloading = new BehaviorSubject('false');
  

  shareReloading = this.reloading.asObservable();
  shareMessage = this.message.asObservable();
  shareToken = this.token.asObservable();
  shareLoading = this.loading.asObservable();

  date = new Date();

  constructor(private http: HttpClient) {
    
    console.log(this.date.getUTCDate());
    console.log(this.date.getUTCMonth());
    console.log(this.date.getUTCFullYear());
  }

  forceReload(){
    this.reloading.next('true');
    setTimeout(() => {
      this.reloading.next('false');
    }, 20);
  }

  getReloading(){
    return this.reloading;
  }

  getDate(){
    return (this.date.getDate());
  }

  getMonth(){
    return this.date.getMonth()+1;
  }

  getYear(){
    return this.date.getFullYear();
  }

  previousDate(){
    this.date.setDate(this.date.getDate() - 1);
  }

  nextDate(){
    this.date.setDate(this.date.getDate() + 1);
  }

  getFormDate(){
    return this.getMonth() + 'l' + this.getDate() + 'l' + this.getYear();
  }
  
  getFakeFormDate(){
    return 'fakeDate';
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  changeLogin(loginAcception: string){
    this.message.next(loginAcception)
  }

  flipLoading(){
    if(this.loading.value == 'false')
      this.loading.next('true');
    else
      this.loading.next('false');
    console.log('flipped');
  }

  isLoading(){
    return (this.loading.value == 'true');
  }

  //Get Arrays
  getEvents(){
    this.flipLoading();
    return this.http.get(`${this.uri}/events/${this.getFakeFormDate()}`);
  }
  getRooms(){
    this.flipLoading();
    return this.http.get(`${this.uri}/rooms/${this.getFormDate()}`);
  }


  //Get Individual Indexes
  getEventById(id) {
    this.flipLoading();
    return this.http.get(`${this.uri}/events/${this.getFakeFormDate()}/${id}`);
  }
  getRoomById(id) {
    this.flipLoading();
    return this.http.get(`${this.uri}/rooms/${this.getFormDate()}/${id}`);
  }


  //Add Individual Indexes
  addEvent(title, date, description) {
    const event = {
      title: title,
      date: date,
      description: description
    };
    this.flipLoading();
    
    return this.http.post(`${this.uri}/events/${this.getFakeFormDate()}/add`, event);
  }
  addRoom(name, number, events) {
    const room = {
      name: name,
      number: number,
      events: events
    };
    this.flipLoading();

    return this.http.post(`${this.uri}/rooms/${this.getFormDate()}/add`, room);
  }


  //Update Individual Indexes
  updateEvent(id, title, date, description) {
    const event = {
      title: title,
      date: date,
      description: description
    };
    this.flipLoading();

    return this.http.post(`${this.uri}/events/${this.getFakeFormDate()}/update/${id}`, event);
  }
  updateRoom(id, name, number, events) {
    const room = {
      name: name,
      number: number,
      events: events
    };
    this.flipLoading();

    return this.http.post(`${this.uri}/rooms/${this.getFormDate()}/update/${id}`, room);
  }


  //Delete Individual Indexes
  deleteEvent(id){
    this.flipLoading();
    return this.http.get(`${this.uri}/events/${this.getFakeFormDate()}/delete/${id}`);
  }
  deleteRoom(id){
    this.flipLoading();
    return this.http.get(`${this.uri}/rooms/${this.getFormDate()}/delete/${id}`);
  }

  //User Login Methods
  async login(username, password){
    const user = {
      username: username,
      email: null,
      hashedPassword: password,
    }
    this.flipLoading();
    await this.http.post(`${this.uri}/user/login`, user).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data).substring(10,JSON.stringify(data).length-2),
      'json': ()=>{return data;}
    };
      setString( "jwtKey" , res.results);
    })
    .catch(error => {
      console.log(error);
      return false;
    })

    if(getString("jwtKey") == '' || getString("jwtKey") == 'User name required' || getString("jwtKey") == 'password required'){
      console.log("did not work, token:" + getString("jwtKey"));
      return false;
    }else{
      console.log("did work, token:" + getString("jwtKey"));
      return true;
    }
    //return this.http.post(`${this.uri}/user/login`, user).subscribe(async (res: Response) => this.token.next( await res.json() ));
    //return this.http.post<{token: string}>(`${this.uri}/user/login`, user).pipe(map(result => {localStorage.setItem('jwtKey', result.token); return true;}));
  }

  logout(){
    setString("jwtKey", '');
    console.log('removed token!');
  }

  async passwordResetRequest(username: string, email: string){
    const user = {
      username: username,
      email: email
    }

    let headerToken = new HttpHeaders();
    headerToken.set("Authorization", "Bearer " + getString("jwtKey"));
    
    this.flipLoading();

    return await this.http.post(`${this.uri}/user/passwordResetRequest`, user, {headers: headerToken}).toPromise().then(data=> {
      this.flipLoading();
      let res = {'results': JSON.stringify(data).substring(10,JSON.stringify(data).length-2),
      'json': ()=>{return data;}
      };
      console.log(res.results);
      return res.results;
    })
    .catch(error => {
      console.log(error);
      return 'failed';
    });

    //return 'failed completely';
    
  }

  async changePasswordWithToken(newPassword: string, resetToken: string){
    const passwordReset = {
      hashedPassword: newPassword,
      passwordResetToken: resetToken
    }

    this.flipLoading();
    return await this.http.post(`${this.uri}/user/passwordReset`, passwordReset).toPromise().then(data=> {
      this.flipLoading();
      let res = {'results': JSON.stringify(data).substring(12,JSON.stringify(data).length-2),
      'json': ()=>{return data;}
      };
      console.log(res.results);
      return res.results;
    })
    .catch(error => {
      console.log(error);
      return 'failed';
    });

  }

  getToken(){
    return getString("jwtKey");
  }





}