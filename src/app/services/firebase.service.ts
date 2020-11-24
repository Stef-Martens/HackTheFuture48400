import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  Authenticated = false

  constructor(public firebaseAuth : AngularFireAuth) { }

  logout(){
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }

  async register(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res=>{
      this.Authenticated = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async login(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
    .then(res=>{
      this.Authenticated = true
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }
}