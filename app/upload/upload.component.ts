import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentUser } from '../present.user.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViewCollegeService } from '../viewCollegeProfile.service';
@Component({
    selector: 'Add-ProfilePic-Component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})



export class UploadComponent implements OnInit {
    @ViewChild('filepicker', { static: false }) someInput: ElementRef;
    selectedfile = null;
    imagepreview: string = "";
    public colleges: {
        id: string,
        name: string
    }[] = [];

    constructor(private http: HttpClient, private presentuser: PresentUser,private viewcollege: ViewCollegeService) {

    }
    ngOnInit() {
        if (this.presentuser.getPresentUser() === "") {
            alert('pleaseSignUp/login');
            return;
        }
        this.http.get<{ message: string, college: any }>('http://localhost:3000/api/college/list')
            .subscribe(respondedData => {
                console.log(respondedData.message);
                respondedData.college.forEach(element => {
                    const col= {
                        id: element._id,
                        name: element.Name
                    };
                    this.colleges.push(col);
                });
            });
    }
    onFileSelected(event) {
        console.log(event.target.files[0].type);
        this.selectedfile = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.imagepreview = reader.result as string;
        };
        reader.readAsDataURL(this.selectedfile);
    }

    onUpload() {
        if (this.presentuser.getPresentUser() === "") {
            alert('pleaseSignUp/login');
            this.imagepreview = "";
            this.someInput.nativeElement.value = "";
            return;
        }
        const upload = new FormData();
        upload.append('image', this.selectedfile, 'firstimage');
        upload.append('username', this.presentuser.getPresentUser());
        this.http.post<{ message: string }>('http://localhost:3000/api/upload', upload).subscribe(respondedData => {
            console.log(respondedData.message);
            this.someInput.nativeElement.value = "";
            this.imagepreview = "";
        });
    }

    addDetails(form: NgForm) {
        if (this.presentuser.getPresentUser() === "") {
            alert('pleaseSignUp/login');
            return;
        }
        if (!form) {
            form.resetForm();
            return;

        }
        const body = {
            username: this.presentuser.getPresentUser(),
            institute: form.value.institute,
            Address: form.value.Address,
            First_Name: form.value.First_Name,
            Last_Name: form.value.Last_Name,
            DOB: form.value.DOB
        };

        this.http.post<{ message: string }>('http://localhost:3000/api/user/addDetail', body).subscribe(respondedData => {
            console.log(respondedData.message);
            this.viewcollege.setViewCollege(form.value.institute);

        });
    }

}