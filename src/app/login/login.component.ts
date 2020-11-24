import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'firebase-angular-auth';
  isSignedIn = false
  btnLogin: string = "Login";
  btnRegister: string = "Register";

  constructor(public firebaseService:FirebaseService){}

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null){
      this.isSignedIn = true
    } else{
      this.isSignedIn = false
    }
  }

  async onRegister(email: string, password:string){
    
    await this.firebaseService.register(email,password)
    if(this.firebaseService.Authenticated){
      this.isSignedIn = true
    }
    else{
      this.isSignedIn = false
    }
  }

  async onLogin(email: string, password:string){
    await this.firebaseService.login(email,password)
    if(this.firebaseService.Authenticated){
      this.isSignedIn = true;
    }
    else{
      this.isSignedIn = false;
    }
  }

  onlogout(){
    this.isSignedIn=false;
    this.firebaseService.logout();
  }

}
