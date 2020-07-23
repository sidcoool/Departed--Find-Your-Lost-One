import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  userName: string = ""

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/main'])
  }

  // logout = () => {
  //   localStorage.removeItem("name")
  //   this.router.navigate(['/'])
  // }

}
