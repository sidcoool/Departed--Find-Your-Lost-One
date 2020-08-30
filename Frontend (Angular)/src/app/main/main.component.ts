import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http: HttpClient) { }

  total: number = 0

  ngOnInit() {
    this.http.get<any>(environment.apiURL + "/findAll")
    .subscribe(data => {
      this.total = data.length
      console.log(data)
    })
  }

}
