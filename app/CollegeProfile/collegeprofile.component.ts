import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { course } from './course.model';
import { Department } from './department.model';
import { Subscription } from "rxjs";
import { CollegeProfileService } from './collgeprofile.service';
import { PresentCollegeService } from '../College/presentCollege.service';
import { saveAs } from 'file-saver';
import { File } from './file.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ViewCollegeService } from '../viewCollegeProfile.service';


@Component({
    selector: 'See-College-Profile',
    templateUrl: './collegeprofile.component.html',
    styleUrls: ['./collegeprofile.component.css']
})

export class CollegeProfileComponent implements OnInit, OnDestroy {
    public Dept: string = '';
    public prescol: string = '';
    public file: File[] = [];
    private post: Post[] = [];
    private postSub: Subscription;
    private course: course[] = [];
    private courseSub: Subscription;
    private department: Department[] = [];
    private deptSub: Subscription;
    constructor(private http: HttpClient,
        private collegeprofileservice: CollegeProfileService,
        private presentcol: PresentCollegeService,
        private viewcollege: ViewCollegeService) { }



    ngOnInit() {
        this.post = this.collegeprofileservice.getPost();
        this.postSub = this.collegeprofileservice.getPostUpdatedListener().subscribe((Post: Post[]) => {
            this.post = Post;
        });
        this.department = this.collegeprofileservice.getDepartment();
        this.deptSub = this.collegeprofileservice.getDeptUpdatedListener().subscribe((dept: Department[]) => {
            this.department = dept;
        });
        this.http.get<{ message: string, files: any }>('http://localhost:3000/api/college/file/' + this.viewcollege.getViewCollege())
            .subscribe(respondedData => {
                console.log(respondedData.message);
                console.log(respondedData.files);
                respondedData.files.forEach(element => {
                    const fil = {
                        id: element._id,
                        Description: element.description,
                        filename: element.filename,
                        username: element.col_id
                    }
                    this.file.push(fil);
                });
            });
        this.prescol = this.presentcol.getPresentCollege();
        console.log(this.prescol);
    }
    ngOnDestroy() {
        this.postSub.unsubscribe();
        if (this.Dept !== '') {
            this.courseSub.unsubscribe();
        }

        this.deptSub.unsubscribe();
    }
    getCourse(dept_id: string) {
        this.course = this.collegeprofileservice.getCourse(dept_id);
        this.courseSub = this.collegeprofileservice.getcourseUpdatedListener().subscribe((course: course[]) => {
            this.course = course;
        });
        this.Dept = dept_id;
    }
    onDownload(id: string){
        this.http.get('http://localhost:3000/api/college/file/download/' + id, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        }).subscribe(
            data => saveAs(data, 'FileDownloaded'),
            error => console.error(error)
        );
    }



}