import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeService } from '../college.service';
import { College } from '../college.model';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'sign-up-college-component',
    templateUrl: './sign_up.component.html',
    styleUrls: ['./sign_up.component.css']
})

export class SignUpCollegeComponent {
    public tag=1;
    constructor(public colegeservice: CollegeService) {

    }

    OnAddCollege(form: NgForm) {

        if (!form.valid) {
            return;
        }
        const coll: College = {
            id: null,
            Name: form.value.Name,
            email: form.value.email,
            address: form.value.address,
            phoneNo: form.value.phoneNo,
            password: form.value.password,
            rating: 0
        };
        this.colegeservice.addCollege(coll);
        form.resetForm();


    }
}


