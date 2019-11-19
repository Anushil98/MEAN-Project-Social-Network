import { Component, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentUser } from '../present.user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'Upload-File-Component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})



export class UploadFileComponent {
    selectedfile = null;
    constructor(private http: HttpClient, private presentuser: PresentUser,private route: Router) {

    }
    onFileSelected(event) {
        console.log(event.target.files[0].type);
        this.selectedfile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedfile);
    }

    onUpload(form: NgForm) {
        console.log(form.value.Description);
        if (this.presentuser.getPresentUser() === "") {
            alert('pleaseSignUp/login');
            return;
        }
        const upload = new FormData();
        upload.append('file', this.selectedfile, 'File');
        upload.append('username', this.presentuser.getPresentUser());
        upload.append('Description', form.value.Description);
        this.http.post<{ messages: string }>('http://localhost:3000/api/student/file/upload', upload).subscribe(respondedData => {
            console.log(respondedData.messages);
            this.route.navigateByUrl('/student/homepage');
        });
    }

}