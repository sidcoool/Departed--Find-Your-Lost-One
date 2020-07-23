import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-lost-report',
  templateUrl: './lost-report.component.html',
  styleUrls: ['./lost-report.component.css']
})
export class LostReportComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  selectedFile: File
  fileName: string = "No Image Selected !"
  scResult: string = ""
  progress: string = "Upload Progress: 0%"
  name: string = ""
  age: string = ""
  city: string = ""
  gname: string = ""
  email: string = ""

  onFileChanged(event) {
    this.progress = "Upload Progress: 0%"
    this.selectedFile = event.target.files[0]
    this.fileName = this.selectedFile.name
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('scfile', this.selectedFile, this.selectedFile.name);
    uploadData.append('name', this.name);
    uploadData.append('age', this.age);
    this.http.post<any>(environment.apiURL + '/file', uploadData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(event => {
      if(event.type === HttpEventType.UploadProgress){
        this.progress = "Upload Progress: " + Math.round(event.loaded / event.total * 100) + "%"
      }
      else if(event.type === HttpEventType.Response) {
        this.scResult = event.body.result
        console.log(this.scResult)
      }
    });
  }


}
