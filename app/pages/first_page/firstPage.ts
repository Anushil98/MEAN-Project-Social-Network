import { Component } from '@angular/core';
import { ViewCollegeService } from 'src/app/viewCollegeProfile.service';
import { PresentCollegeService } from 'src/app/College/presentCollege.service';
import { PresentUser } from 'src/app/present.user.service';

@Component({
    selector: 'First-Page-Component',
    templateUrl: './firstPage.html',
    styleUrls: ['./firstPage.css']
})

export class FirstPage{
    constructor(private viewcollege: ViewCollegeService,private presentcollege: PresentCollegeService,private presentuser: PresentUser){
        this.viewcollege.setViewCollege('');
        this.presentuser.setPresentUser('');
        this.presentcollege.setPresentCollege('');
    }
    
}