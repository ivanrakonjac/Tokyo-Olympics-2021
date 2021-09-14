import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent{

  text : ArrayBuffer;
  file:any;
  
  fileChanged(e) {
      this.file = e.target.files[0];
  }

  uploadDocument() {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        console.log(fileReader.result, JSON.parse(<string>fileReader.result));
        
      }
      fileReader.readAsText(this.file);
  }
  
}
