import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class PresentCollegeService {
    presentCollegeId: string = '';

    setPresentCollege(collegeID: string) {
        this.presentCollegeId = collegeID;
    }
    getPresentCollege() {
        return this.presentCollegeId;
    }
}