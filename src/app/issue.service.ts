import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { getString, setString } from '@nativescript/core/application-settings';
//import { getString, setString } from '@nativescript/core/application-settings/application-settings';
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
  private shelterName = "";
  

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

  getShelterName(){
    return getString("shelterName","needShelter");
  }

  setShelterName(name: string){
    setString("shelterName", name);
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
    return this.http.get(`${this.uri}/events/${this.getCurrentURIName()}/${this.getFakeFormDate()}`);
  }
  getRooms(){
    this.flipLoading();
    return this.http.get(`${this.uri}/rooms/${this.getCurrentURIName()}/${this.getFormDate()}`);
  }


  //Get Individual Indexes
  getEventById(id) {
    this.flipLoading();
    return this.http.get(`${this.uri}/events/${this.getCurrentURIName()}/${this.getFakeFormDate()}/${id}`);
  }
  getRoomById(id) {
    this.flipLoading();
    return this.http.get(`${this.uri}/rooms/${this.getCurrentURIName()}/${this.getFormDate()}/${id}`);
  }


  //Add Individual Indexes
  addEvent(title, date, description) {
    const event = {
      title: title,
      date: date,
      description: description,
      shelterName: this.getShelterName(),
      formDate: this.getFakeFormDate()
    };
    this.flipLoading();
    
    return this.http.post(`${this.uri}/events/${this.getCurrentURIName()}/${this.getFakeFormDate()}/add`, event);
  }
  addRoom(name, number, events) {
    const room = {
      name: name,
      number: number,
      events: events,
      shelterName: this.getShelterName(),
      formDate: this.getFormDate()
    };
    this.flipLoading();

    return this.http.post(`${this.uri}/rooms/${this.getCurrentURIName()}/${this.getFormDate()}/add`, room);
  }


  //Update Individual Indexes
  updateEvent(id, title, date, description) {
    const event = {
      title: title,
      date: date,
      description: description,
      shelterName: this.getShelterName(),
      formDate: this.getFakeFormDate()
    };
    this.flipLoading();

    return this.http.post(`${this.uri}/events/${this.getCurrentURIName()}/${this.getFakeFormDate()}/update/${id}`, event);
  }
  updateRoom(id, name, number, events) {
    const room = {
      name: name,
      number: number,
      events: events,
      shelterName: this.getShelterName(),
      formDate: this.getFakeFormDate()
    };
    this.flipLoading();

    return this.http.post(`${this.uri}/rooms/${this.getCurrentURIName()}/${this.getFormDate()}/update/${id}`, room);
  }


  //Delete Individual Indexes
  deleteEvent(id){
    this.flipLoading();
    return this.http.get(`${this.uri}/events/${this.getCurrentURIName()}/${this.getFakeFormDate()}/delete/${id}`);
  }
  deleteRoom(id){
    this.flipLoading();
    return this.http.get(`${this.uri}/rooms/${this.getCurrentURIName()}/${this.getFormDate()}/delete/${id}`);
  }

  //User Login Methods
  async login(username: String, password: String){
    const user = {
      username: username,
      hashedPassword: password,
      shelterName: this.getShelterName(),
    }

    this.flipLoading();
    await this.http.post(`${this.uri}/user/login`, user).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data).substring(10,JSON.stringify(data).length-2),
      'json': ()=>{return data;}
      
    };
    setString( "jwtKey" , res.results);
    return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    })

    if(getString("jwtKey") == '' || getString("jwtKey") == 'User name required' || getString("jwtKey") == 'password required' || getString("jwtKey") == "shelter name required"){
      console.log("did not work, token: " + getString("jwtKey"));
      return false;
    }else{
      console.log("did work, token: " + getString("jwtKey"));
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
      email: email,
      shelterName: this.getShelterName()
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
      passwordResetToken: resetToken,
      shelterName: this.getShelterName()
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

  async requestAccount(firstname: String, lastname: String, email: String, phoneNumber: String, shelterName: String){
    var results: String;
    const user = {
      name: firstname + ", " + lastname,
      shelter: shelterName,
      email: email,
      phoneNumber: phoneNumber,
    }
    return await this.http.post(`${this.uri}/user/register`, user).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data),
      'json': ()=>{return data;}};
      results = res.results;
      if(results.search("User name required") != -1 || results.search("shelter name required") != -1 || results.search("email required") != -1 || results.search("phone number required") != -1 || results.search("errorzzz") != -1){
        if(results.search("User name required") != -1){
          setString("httpError", "Please provide an username");
        }else if(results.search("shelter name required") != -1){
          setString("httpError", "Please provide a shelter name");
        }else if(results.search("email required") != -1){
          setString("httpError", "Please provide an email");
        }else if(results.search("phone number required") != -1){
          setString("httpError", "Please provide a phone number");
        }else if(results.search("errorzzz") != -1){
          setString("httpError", "An Unknown Error has occurred");
        }
        return false;
      }else{
        return true;
      }
    }).catch(error => {
      let res = {'results': JSON.stringify(error),
      'json': ()=>{return error;}};
      results = res.results;
      if(results.search("User name required") != -1 || results.search("shelter name required") != -1 || results.search("email required") != -1 || results.search("phone number required") != -1 || results.search("errorzzz") != -1){
        if(results.search("User name required") != -1){
          setString("httpError", "Please provide an username");
        }else if(results.search("shelter name required") != -1){
          setString("httpError", "Please provide a shelter name");
        }else if(results.search("email required") != -1){
          setString("httpError", "Please provide an email");
        }else if(results.search("phone number required") != -1){
          setString("httpError", "Please provide a phone number");
        }else if(results.search("errorzzz") != -1){
          setString("httpError", "An Unknown Error has occurred");
        }
        return false;
      }else{
        return true;
      }
    });

    
  }

  async createAccount(username: String, password: String, email: String, Sheltername: String, token: String){
    var results: String;
    const user = {
      username: username,
      shelterName: Sheltername,
      email: email,
      hashedPassword: password,
    }
    const header = new HttpHeaders({ "Authorization": "Bearer " + token });

    return await this.http.post(`${this.uri}/user/signup`, user, {headers: header }).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data),
      'json': ()=>{return data;}};
      results = res.results;
      console.log("wait what?????");
      if(results.search("Incorrect Token") != -1 || results.search("need username and password") != -1 || results.search("The username is already taken") != -1 || results.search("The email is already taken") != -1 || results.search("The shelter name is already taken") != -1 || results.search("something is just wrong!") != -1 || results.search("Failed to create new record") != -1 || results.search("An interesting error occurred") != -1 || results.search("The password is already taken") != -1){
        if(results.search("Incorrect Token") != -1){
          setString("httpError", "Please check your token");
        }else if(results.search("need username and password") != -1){
          setString("httpError", "Please enter a username and password");
        }else if(results.search("The username is already taken") != -1){
          setString("httpError", "The username is already taken");
        }else if(results.search("The email is already taken") != -1){
          setString("httpError", "The email is already taken");
        }else if(results.search("The shelter name is already taken") != -1){
          setString("httpError", "The shelter name is already taken");
        }else if(results.search("Failed to create new record") != -1){
          setString("httpError", "An error occurred accessing the database");
        }else if(results.search("The password is already taken") != -1){
          setString("httpError", "The password is already taken");
        }else{
          setString("httpError", "An Unknown Error has occurred");
        }
        return false;
      }else{
        return true;
      }
    }).catch(error => {
      let res = {'results': JSON.stringify(error),
      'json': ()=>{return error;}};
      results = res.results;
      console.log("wait what?????!!!!!");
      if(results.search("Incorrect Token") != -1 || results.search("need username and password") != -1 || results.search("The username is already taken") != -1 || results.search("The email is already taken") != -1 || results.search("The shelter name is already taken") != -1 || results.search("something is just wrong!") != -1 || results.search("Failed to create new record") != -1 || results.search("An interesting error occurred") != -1 || results.search("The password is already taken") != -1){
        if(results.search("Incorrect Token") != -1){
          setString("httpError", "Please check your token");
        }else if(results.search("need username and password") != -1){
          setString("httpError", "Please enter a username and password");
        }else if(results.search("The username is already taken") != -1){
          setString("httpError", "The username is already taken");
        }else if(results.search("The email is already taken") != -1){
          setString("httpError", "The email is already taken");
        }else if(results.search("The shelter name is already taken") != -1){
          setString("httpError", "The shelter name is already taken");
        }else if(results.search("Failed to create new record") != -1){
          setString("httpError", "An error occurred accessing the database");
        }else if(results.search("The password is already taken") != -1){
          setString("httpError", "The password is already taken");
        }else{
          setString("httpError", "An Unknown Error has occurred");
        }
        return false;
      }else{
        return true;
      }
    });

    
  }

  async deleteAccount(username: String, password: String, email: String){
    var results: String;
    const deleteProfile = {
      name: username, 
      shelter: this.getShelterName(),
      email: email,
      hashedPassword: password
    }
    return await this.http.post(`${this.uri}/user/deleteAccount`, deleteProfile, this.getLoginHeader()).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data),
      'json': ()=>{return data;}};
      results = res.results;
      if(results.search("User not deleted") != -1 || results.search("Incorrect Token") != -1){
        if(results.search("User not deleted") != -1){
          setString("httpError", "Please check the information provided");
        }
        console.log("User not deleted -> " + results.search("User not deleted"));
        return false;
      }else{
        return true;
      }
    }).catch(error => {
      let res = {'results': JSON.stringify(error),
      'json': ()=>{return error;}};
      results = res.results;
      if(results.search("User not deleted") != -1 || results.search("Incorrect Token") != -1){
        if(results.search("User not deleted") != -1){
          setString("httpError", "Please check the information provided");
        }
        console.log("User not deleted -> " + results.search("User not deleted"));
        return false;
      }else{
        return true;
      }
    });

    
  }
  
  async updateUsername(updatedInfo: String){
    var results: String;
    const updatePackage = {
      shelter: this.getShelterName(),
      userName: updatedInfo
    }
    return await this.http.post(`${this.uri}/user/updateUser`, updatePackage, this.getLoginHeader()).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data),
      'json': ()=>{return data;}};
      results = res.results;
      if(results.search("Incorrect Token") != -1 || results.search("Username Taken") != -1 || results.search("Failed to update") != -1){
        if(results.search("Incorrect Token") != -1){
          setString("httpError", "Please login again");
        }else if(results.search("Username Taken") != -1){
          setString("httpError", "Please use a unique username");
        }else if(results.search("Failed to update") != -1){
          setString("httpError", "There was an error accessing the database");
        }
        return false;
      }else{
        return true;
      }
    }).catch(error => {
      let res = {'results': JSON.stringify(error),
      'json': ()=>{return error;}};
      results = res.results;
      if(results.search("Incorrect Token") != -1 || results.search("Username Taken") != -1 || results.search("Failed to update") != -1){
        if(results.search("Incorrect Token") != -1){
          setString("httpError", "Please login again");
        }else if(results.search("Username Taken") != -1){
          setString("httpError", "Please use a unique username");
        }else if(results.search("Failed to update") != -1){
          setString("httpError", "There was an error accessing the database");
        }
        return false;
      }else{
        return true;
      }
    });

    
  }

  async updatePassword(updatedInfo: String){
    var results: String;
    const updatePackage = {
      shelter: this.getShelterName(),
      password: updatedInfo
    }
    return await this.http.post(`${this.uri}/user/updatePassword`, updatePackage, this.getLoginHeader()).toPromise().then(data=>{
      let res = {'results': JSON.stringify(data),
      'json': ()=>{return data;}};
      results = res.results;
      if(results.search("Incorrect Token") != -1 || results.search("Password Taken") != -1 || results.search("Failed to update") != -1){
        if(results.search("Incorrect Token") != -1){
          setString("httpError", "Please login again");
        }else if(results.search("Password Taken") != -1){
          setString("httpError", "Please use a unique password");
        }else if(results.search("Failed to update") != -1){
          setString("httpError", "There was an error accessing the database");
        }
        
        return false;
      }else{
        return true;
      }
    }).catch(error => {
      let res = {'results': JSON.stringify(error),
      'json': ()=>{return error;}};
      results = res.results;
      if(results.search("Incorrect Token") != -1 || results.search("Password Taken") != -1 || results.search("Failed to update") != -1){
        if(results.search("Incorrect Token") != -1){
          setString("httpError", "Please login again");
        }else if(results.search("Password Taken") != -1){
          setString("httpError", "Please use a unique password");
        }else if(results.search("Failed to update") != -1){
          setString("httpError", "There was an error accessing the database");
        }
        
        return false;
      }else{
        return true;
      }
    });

    
  }

  getAllNames(){
    return this.http.post(`${this.uri}/user/getAllNames`, null);
  }

  getCurrentURIName(){
    return encodeURI(this.getShelterName().toString());
  }

  getLoginHeader(){
    return { headers: new HttpHeaders({ "Authorization": "Bearer " + this.getToken() }) };
  }
   





}