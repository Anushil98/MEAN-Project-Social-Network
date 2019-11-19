import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LogInComponent {
    constructor(public userservice: UserService) {

    }

    OnLogUser(form: NgForm) {
        if (!form.valid) {
            return;
        }
        this.userservice.LogUser(form.value.username, form.value.password);

        form.resetForm();


    }
}


