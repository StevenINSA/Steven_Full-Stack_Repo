import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    if(user.name == undefined
       || user.email == undefined 
       || user.username == undefined 
       || user.password == undefined
       //Checking if the user deleted its content from the fields
       || user.username.length == 0
       || user.email.length == 0
       || user.password.length == 0
       ){
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email){
    //make sure we have the good format of an email
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //Check the email
    return re.test(email);
  }
}
