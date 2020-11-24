import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FirebaseService } from './services/firebase.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDI682kWUFXRszakiutGpF49KtWIVZXcRg",
      authDomain: "hackaton48400.firebaseapp.com",
      databaseURL: "https://hackaton48400.firebaseio.com",
      projectId: "hackaton48400",
      storageBucket: "hackaton48400.appspot.com",
      messagingSenderId: "587154369268",
      appId: "1:587154369268:web:321150383ce500644a8ca1"
    })
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
