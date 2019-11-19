import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
    selector: 'sign-up-component',
    templateUrl: './sign_up.component.html',
    styleUrls: ['./sign_up.component.css']
})

export class SignUpComponent {
    public tag = 1;
    constructor(public userservice: UserService) {

    }

    OnAddUser(form: NgForm) {

        if (!form.valid) {
            return;
        }

        this.userservice.addUser(form.value.username, form.value.password, form.value.email);
        form.resetForm();
        this.tag = 2;
    }
}


