import { Component, OnInit, OnDestroy } from '@angular/core';
import { DepartmentService } from '../Department.service';
import { Department } from '../Department.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
    // tslint:disable-next-line: component-selector
    selector: 'See-Department-Component',
    templateUrl: './See.Department.component.html',
    styleUrls: ['./See.Department.component.css']
})

export class SeeDepartmentComponent implements OnInit, OnDestroy {
    ShowArea: string = '';
    prof_list = [];
    copy_list = [];
    final_prof_list = [];
    Dept: Department[] = [];
    private DeptSub: Subscription;
    constructor(public departmentservice: DepartmentService, private http: HttpClient) {

    }

    ngOnInit() {
        this.Dept = this.departmentservice.getDepartment();
        this.DeptSub = this.departmentservice.getdeptUpdatelistener().subscribe((dept: Department[]) => {
            this.Dept = dept;
        });
    }
    ngOnDestroy() {
        this.DeptSub.unsubscribe();
    }

    showCourseArea(dept_id: string) {
        this.ShowArea = dept_id;
        this.http.get<{ message: string, professor: any }>('http://localhost:3000/api/professor')
            .subscribe(respondedData => {
                console.log(respondedData.message);
                this.prof_list = respondedData.professor;
                this.copy_list = this.prof_list;
            });

    }

    OnAddProfessor(p_object: any) {
        this.final_prof_list.push(p_object);
        this.prof_list = this.prof_list.filter(item => item !== p_object);
    }

    OnAddCourse(form: NgForm, dept_id: string) {
        if (!form.valid) {
            return;
        }
        const prof = {
            dept_id: dept_id,
            name: form.value.name,
            credit: form.value.credit,
            semester: form.value.semester,
            prof: this.final_prof_list
        };
        this.http.post<{ message: string }>('http://localhost:3000/api/course', prof).subscribe(
            respondedData => {
                console.log(respondedData.message);
            }
        );
        form.resetForm();
        this.final_prof_list = [];
        this.prof_list = this.copy_list;

    }

}
