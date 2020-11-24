import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import {DatacentersMetErrors} from '../DatacentersMetErrors'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()

  datacenters: any;
  selectedDatacenter:any;
  headers:HttpHeaders;
  errors:any;

  _datacentersMetErrors:DatacentersMetErrors[]=[];
  //_datacentermeterrorsindiv:DatacentersMetErrors;


  verwijderDatacenter:any;

  constructor(private http: HttpClient, public firebaseService: FirebaseService) {
    this.datacenters;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9odGYyMDIwLnppbmRlcmxhYnMuY29tXC9hcGlcL2F1dGhcL2xvZ2luIiwiaWF0IjoxNjA2MjA4NTc5LCJleHAiOjE2MDYzODg1NzksIm5iZiI6MTYwNjIwODU3OSwianRpIjoiZGhFVEpVSGI0NHdIdXZqMSIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.A6g6JGyFe9UpTsBICsj2HeNuXh7dyPLk3szaRMIM4uw`
    })
  }
  
  ngOnInit(): void {
    this.getDatacenters().subscribe((data) => {
      this.datacenters = data.data;
    });
    console.log(this.datacenters);
    
  }

  getMostErrorsDatacenters(){
    // wij hebben een interface gemaakt en hiervan in het componen een list gemaakt, dit geeft elk id weer samen met zijn aantal
    // error. Zo kunnen we uiteindelijk zien welke er weg moet
    this.datacenters.forEach(datacenter => {

      //this._datacentermeterrorsindiv.naam=datacenter.name;

      this.getErrors(datacenter.id).subscribe((data) => {
        //this._datacentermeterrorsindiv.aantal = data.data.length;
        let object={id:datacenter.id,aantal:data.data.length};
        this._datacentersMetErrors.push(object);
      });


    });
    
    let id=Math.max.apply(Math, this._datacentersMetErrors.map(function(o) { return o.id; }))
    this.http.post<any>('https://htf2020.zinderlabs.com/api/datacenters'+id+"/isolate", { headers: this.headers }).subscribe(data => {})
  }



  getDatacenters() {
    return this.http.get<any>('https://htf2020.zinderlabs.com/api/datacenters', { headers: this.headers });
  }

  onSelect(center: any): void {
    this.selectedDatacenter = center;

    this.getErrorsPerDatacenter(center.id).subscribe((data) => {
      console.log(data.data.length)
      this.errors = data.data;

    });

  }

  getErrorsPerDatacenter(id){
    return this.http.get<any>('https://htf2020.zinderlabs.com/api/datacenters/'+id+"/errors", { headers: this.headers });
  }

  getErrors(id){
    return this.http.get<any>('https://htf2020.zinderlabs.com/api/datacenters/'+id+"/errors", { headers: this.headers });
  }

  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
  }

}
