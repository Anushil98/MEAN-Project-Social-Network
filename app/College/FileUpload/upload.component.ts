import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PresentCollegeService } from '../presentCollege.service';

@Component({
    selector: 'Upload-College-File-Component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})

export class CollegeUploadFileComponent {
    selectedfile = null;
    constructor(private http: HttpClient, private presentcollege: PresentCollegeService,private route: Router) {

    }
    onFileSelected(event) {
        console.log(event.target.files[0].type);
        this.selectedfile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedfile);
    }

    onUpload(form: NgForm) {
        console.log(form.value.Description);
        if (this.presentcollege.getPresentCollege() === "") {
            alert('pleaseSignUp/login');
            return;
        }
        const upload = new FormData();
        upload.append('file', this.selectedfile, 'File');
        upload.append('col_id', this.presentcollege.getPresentCollege());
        upload.append('Description', form.value.Description);
        this.http.post<{ messages: string }>('http://localhost:3000/api/college/file/upload', upload).subscribe(respondedData => {
            console.log(respondedData.messages);
            this.route.navigateByUrl('/college/homePage');
        });
    }
}