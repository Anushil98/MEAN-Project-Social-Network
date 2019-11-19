import { Department } from './Department.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PresentCollegeService } from '../presentCollege.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class DepartmentService {

    department: Department[] = [];
    private departmentUpdated = new Subject<Department[]>();
    constructor(private http: HttpClient, private presentcollegeservice: PresentCollegeService,private route: Router) {

    }

    addDepartment(deptName: string) {
        if (this.presentcollegeservice.getPresentCollege() === '') {
            alert('Please log in with a college ID');
            return;
        }

        const dept: Department = {
            col_id: this.presentcollegeservice.getPresentCollege(),
            dept_id: null,
            dept_name: deptName
        };
        this.http.post<{ messages: string }>('http://localhost:3000/api/department', dept)
            .subscribe(respondedData => {
                console.log(respondedData.messages);
                this.route.navigateByUrl('/college/seeDepartment');
            });
        // this.department.push(dept);
        // this.departmentUpdated.next([...this.department]);
    }


    getdeptUpdatelistener() {
        return this.departmentUpdated.asObservable();
    }

    getDepartment() {
        if (this.presentcollegeservice.getPresentCollege() === '') {
            alert('Please sign up/login from college ID');
            return;
        }
        this.department = [];
        this.http.get<{ message: string, departments: any, status: number }>
            ('http://localhost:3000/api/department?collegeID=' + this.presentcollegeservice.getPresentCollege())
            .subscribe(respondedData => {
                console.log(respondedData.message);
                if (respondedData.status !== 200) {
                    return [];
                }
                respondedData.departments.forEach(element => {
                    const dept: Department = {
                        col_id: element.col_id,
                        dept_id: element._id,
                        dept_name: element.dept_name

                    };
                    this.department.push(dept);
                    this.departmentUpdated.next([...this.department]);
                });
            });
        return [...this.department];
    }
}
