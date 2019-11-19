import { Component, OnInit } from '@angular/core';
import { PresentUser } from 'src/app/present.user.service';
import { ViewCollegeService } from 'src/app/viewCollegeProfile.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'Second-Page-Component',
    templateUrl: './secondPage.html',
    styleUrls: ['./secondPage.css']
})

export class SecondPage implements OnInit{
    public user = '';
    public view = '';
    constructor(private presentuser: PresentUser, private viewcollege: ViewCollegeService,private http: HttpClient) {
        this.user = this.presentuser.getPresentUser();
        
    }
    ngOnInit(){
        this.http.get<{message: string,institute: any }>('http://localhost:3000/api/'+this.presentuser.getPresentUser()+'/institution')
        .subscribe(respondedData=>{
            console.log(respondedData.message);
            console.log(respondedData.institute);
            this.viewcollege.setViewCollege(respondedData.institute[0].Institution);
        });
    }
}