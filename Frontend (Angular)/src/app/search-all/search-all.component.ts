import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})

// curChild:any = {
  //   age: ""
  //   city: ""
  //   db_img: "aamir-khan-770x433.jpg"
  //   email: ""
  //   gname: ""
  //   imgURL: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD"
  //   isFound: true
  //   name: ""
  //   }

export class SearchAllComponent implements OnInit {

  constructor(private http: HttpClient) { }

  allChildren = []
  filteredChildren = []
  selectedAge = "All Age"
  selectedCity = "All City"

  currentCity = "all"
  currentAge = 0



  filterChildren = (filterCity, filterAge) => {
    if(filterCity == "all"){
      this.selectedCity = "All City"
    }
    else if(filterCity != 'x'){
      this.selectedCity = filterCity 
    }

    if(filterAge == 0){
      this.selectedAge = "All Age"
    }
    else if(filterAge != -1){
      this.selectedAge = String(filterAge-5) + '-' + String(filterAge)
    }

    if(filterCity != 'x')
      this.currentCity = filterCity

    if(filterAge != -1)
      this.currentAge = filterAge


    this.filteredChildren = this.allChildren.filter(child => {
      if((child.city.toLowerCase() == this.currentCity || this.currentCity == "all") && ((child.age <= this.currentAge && child.age >= this.currentAge-5) || this.currentAge == 0))
        return child
    })
  }



  ngOnInit() {
    this.http.get<any>(environment.apiURL + "/findAll")
    .subscribe(data => {
      this.allChildren = data;
      this.filteredChildren = data;
      console.log(data)
    })
  }

}
