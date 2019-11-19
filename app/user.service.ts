import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PresentUser } from './present.user.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient, private presentUser: PresentUser, private route: Router) {

    }

    addUser(Username: string, Password: string, Email: string) {

        const user: User = {
            username: Username,
            password: Password,
            email: Email,
            Address: null,
            Institution: null,
            First_name: null,
            Last_name: null,
            DOB: null,
            profilePic: null
        };
        this.http.post<{ message: string }>('http://localhost:3000/api/users', user)
            .subscribe((respondData) => {
                console.log(respondData.message);
            });

    }

    LogUser(Username: string, Password: string) {
        const params = new HttpParams().set('username', Username).set('password', Password);
        this.http.get<{ message: string, status: number }>('http://localhost:3000/api/users', { params })
            .subscribe((respondData) => {

                if (respondData.status === 200) {
                    console.log(respondData.message);
                    this.presentUser.setPresentUser(Username);
                    this.route.navigateByUrl('/student/homepage');
                } else if (respondData.status === 404) {
                    console.log(respondData.message);
                    this.presentUser.setPresentUser('');
                    alert('No such User found');
                }
            });
        
    }
}

