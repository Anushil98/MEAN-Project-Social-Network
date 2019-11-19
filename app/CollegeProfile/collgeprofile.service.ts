import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post.model';
import { course } from './course.model';
import { Department } from './department.model';
import { Subject } from 'rxjs';
import { ViewCollegeService } from '../viewCollegeProfile.service';


@Injectable({ providedIn: 'root' })

export class CollegeProfileService {

    private post: Post[] = [];
    private postUpdated = new Subject<Post[]>();
    private course: course[] = [];
    private courseUpdated = new Subject<course[]>();
    private department: Department[] = [];
    private deptUpdated = new Subject<Department[]>();
    
    constructor(private http: HttpClient, private viewcolege: ViewCollegeService) {

    }

    getPost() {
        this.post = [];
        this.http.get<{ message: string, post: any, status: number }>
            ('http://localhost:3000/api/posts?user=' + this.viewcolege.getViewCollege())
            .subscribe(respondedData => {
                console.log(respondedData.message);
                if (respondedData.status === 404) {
                    return [];
                }
                respondedData.post.forEach(element => {
                    const post: Post = {
                        id: element._id,
                        username: element.username,
                        title: element.title,
                        content: element.content,
                        likes: element.likes,
                    };
                    this.post.push(post);
                    this.postUpdated.next([...this.post]);
                });
            });
        return [...this.post];
    }
    getPostUpdatedListener() {
        return this.postUpdated.asObservable();
    }
    getDepartment() {
        this.department = [];
        this.http.get<{ message: string, departments: any, status: number }>
            ('http://localhost:3000/api/department?collegeID=' + this.viewcolege.getViewCollege())
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
                    this.deptUpdated.next([...this.department]);
                });
            });
        return [...this.department];
    }
    getDeptUpdatedListener() {
        return this.deptUpdated.asObservable();
    }

    getCourse(dept_id: string) {
        this.course = [];
        this.http.get<{ message: string, courses: any, status: number }>
            ('http://localhost:3000/api/course/' + dept_id)
            .subscribe(respondedData => {
                console.log(respondedData.message);
                if (respondedData.status !== 200) {
                    return [];
                }
                respondedData.courses.forEach(element => {
                    const courses: course = {
                        dept_id: element.dept_id,
                        name: element.name,
                        credit: element.credit,
                        semester: element.semester,
                        prof: element.prof
                    };
                    this.course.push(courses);
                    this.courseUpdated.next([...this.course]);
                });
            });
        return [...this.course];
    }
    getcourseUpdatedListener() {
        return this.courseUpdated.asObservable();
    }
    
}