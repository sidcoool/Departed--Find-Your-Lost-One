import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-found-report',
  templateUrl: './found-report.component.html',
  styleUrls: ['./found-report.component.css']
})
export class FoundReportComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  selectedFile: File
  fileName: string = "No Image Selected !"
  scResult:any = {}
  progress: string = "Upload Progress: 0%"
  name: string = ""
  age: string = ""
  city: string = ""
  gname: string = ""
  email: string = ""
  empty1: boolean = true
  empty2: boolean = true
  searching: boolean = false


  notFoundText:string = ""

  onFileChanged(event) {
    this.progress = "Upload Progress: 0%"
    this.selectedFile = event.target.files[0]
    this.fileName = this.selectedFile.name
  }

  onUpload() {
    this.notFoundText = "You will be Notified if " + this.name +  " is Found"
    this.searching = true
    this.empty1 = true
    this.empty2 = true
     
    const uploadData = new FormData();
    uploadData.append('childImage', this.selectedFile, this.selectedFile.name);
    uploadData.append('name', this.name);
    uploadData.append('age', this.age);
    uploadData.append('city', this.city);
    uploadData.append('gname', this.gname);
    uploadData.append('email', this.email);

    console.log(uploadData.getAll('city'))
    console.log(this.selectedFile)

    this.http.post<any>(environment.apiURL + '/childInfo', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = "Upload Progress: " + Math.round(event.loaded / event.total * 100) + "%"
      }
      else if(event.type === HttpEventType.Response) {
        this.scResult = event.body
        console.log(this.scResult)
        this.empty1 = false
        this.searching = false

        console.log(Object.keys(this.scResult.foundChild).length)

        if(Object.keys(this.scResult.foundChild).length > 0){
          this.empty2 = false
        }

      }
    });
  }


}