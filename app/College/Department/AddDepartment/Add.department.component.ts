import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../Department.service';
import { NgForm } from '@angular/forms';
import { PresentCollegeService } from '../../presentCollege.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'Add-Department-Component',
    templateUrl: './Add.department.component.html',
    styleUrls: ['./Add.department.component.css']
})

export class AddDepartmentComponent {

    constructor(private department: DepartmentService, private presentcollegeservice: PresentCollegeService) {

    }

    OnAddDepartment(form: NgForm) {
        if (this.presentcollegeservice.getPresentCollege() === '') {
            form.resetForm();
            alert('Please Login from a college ID');
            return;
        }
        if (!form.valid) {
            return;
        }
        this.department.addDepartment(form.value.name);
        form.resetForm();

    }
}
