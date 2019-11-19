import { College } from './college.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PresentCollegeService } from './presentCollege.service';
import { Router } from '@angular/router';
import { ViewCollegeService } from '../viewCollegeProfile.service';

@Injectable({ providedIn: 'root' })

export class CollegeService {

    college: College[] = [];
    constructor(private viewCollegeprofile: ViewCollegeService,private http: HttpClient, private presentcollege: PresentCollegeService,private route: Router) {

    }

    addCollege(coll: College) {
        this.http.post<{ messages: string }>('http://localhost:3000/api/college', coll)
            .subscribe(respondedData => {
                console.log(respondedData.messages);
            });
    }

    logCollege(email: string, password: string) {
        this.http.get<{ statuscode: number, messages: string, collegeId: string }>(
            'http://localhost:3000/api/college?email=' + email + '&password=' + password)
            .subscribe(respondedData => {
                if (respondedData.statuscode === 200) {
                    console.log(respondedData.messages);
                    this.presentcollege.setPresentCollege(respondedData.collegeId);
                    this.viewCollegeprofile.setViewCollege(respondedData.collegeId);
                    this.route.navigateByUrl('/college/homePage');
                } else {
                    console.log(respondedData.messages);
                }

            });


    }
}