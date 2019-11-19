import { Component, OnInit, OnDestroy } from "@angular/core";
import { AchievementService } from "../Achievement.service";
import { Certificate } from "../Achievement.model";
import { Subscription } from "rxjs";


@Component({
    selector:"See-Achievement-component",
    templateUrl: "./See.Achievement.component.html",
    styleUrls: ["./See.Achievement.component.css"]
})

export class SeeAchievementComponent implements OnInit, OnDestroy {

    Certi: Certificate[] = [];
    private CertiSub: Subscription;
    constructor(public AchievementService: AchievementService){

    }

    ngOnInit() {
        this.Certi = this.AchievementService.getAchievement();
        this.CertiSub = this.AchievementService.getAchievementUpdateListener().subscribe((Certi: Certificate[])=>{
            this.Certi=Certi;
        });
    }
    ngOnDestroy(){
        this.CertiSub.unsubscribe();
    }

}
