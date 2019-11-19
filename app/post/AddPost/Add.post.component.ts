import { Component } from "@angular/core";
import { PostService } from "../post.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'Add-Post-Component',
    templateUrl: 'Add.post.component.html',
    styleUrls:['Add.post.component.css']
})

export class AddPostComponent{

    constructor(public postservice: PostService){

    }

    OnAddPost(form: NgForm){
        if(!form.valid){
            return;
        }

        this.postservice.addPost(form.value.title,form.value.content);
        form.resetForm();
    }
}
