import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeService } from '../college.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'login-college-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LogInCollegeComponent {
    constructor(public collegeservice: CollegeService) {

    }

    OnLogCollege(form: NgForm) {
        if (!form.valid) {
            return;
        }
        this.collegeservice.logCollege(form.value.email, form.value.password);
        form.resetForm();
    }
}


