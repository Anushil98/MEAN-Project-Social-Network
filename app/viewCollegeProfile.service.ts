import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class ViewCollegeService {
    private viewCollege: string;

    setViewCollege(col_id) {
        this.viewCollege = col_id;
    }
    getViewCollege() {
        return this.viewCollege;
    }
}