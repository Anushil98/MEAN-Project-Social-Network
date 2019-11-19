import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class PresentUser {
    private presentUser: string="";

    getPresentUser() {
        return this.presentUser;
    }

    setPresentUser(username: string) {
        this.presentUser = username;
    }
}