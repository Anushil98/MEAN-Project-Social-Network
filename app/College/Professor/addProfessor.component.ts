import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { PresentCollegeService } from '../presentCollege.service';

@Component({
    selector: 'Add-Professor-Component',
    templateUrl: './addProfessor.component.html',
    styleUrls: ['./addProfessor.component.css']
})
export class AddProfessorComponent {
    selectedfile = null;
    imagepreview: string = "";

    constructor(private http: HttpClient, private presentcollege: PresentCollegeService) {

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

    addProfessor(prof: NgForm) {
        if (this.presentcollege.getPresentCollege() === '') {
            alert('Please Login using a college ID');
            prof.resetForm();
            return;
        }
        const uprof = new FormData();
        uprof.append('image', this.selectedfile, 'firstimage');
        uprof.append('col_id', this.presentcollege.getPresentCollege());
        uprof.append('Designation', prof.value.Designation);
        uprof.append('First_Name', prof.value.First_Name);
        uprof.append('Middle_Name', prof.value.Middle_Name);
        uprof.append('Last_Name', prof.value.Last_Name);
        uprof.append('Experience', prof.value.Experience);
        this.http.post<{ messages: string }>('http://localhost:3000/api/professor', uprof)
            .subscribe(respondedData => {
                console.log(respondedData.messages);
            });
    }


}