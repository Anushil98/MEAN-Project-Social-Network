import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AchievementService } from "../Achievement.service";

@Component({
    selector:"Add-Achievement-component",
    templateUrl: "./Add.Achievement.component.html",
    styleUrls: ["./Add.Achievement.component.css"]
})

export class AddAchievementComponent{

    constructor(public certi: AchievementService){

    }
    OnAddAchievement(form: NgForm){
        if (!form.valid){
            return;
        }
        
        this.certi.addAchievement(form.value.Certi_no,form.value.Certi_name,form.value.Issuer,form.value.DOI);
        form.resetForm();
    }

    
}