import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentUser } from '../present.user.service';
@Component({
    // tslint:disable-next-line: component-selector
    selector: 'Search-Component',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {
    public key: string = "";
    private results = [];
    private noresult: number = 0;

    constructor(private http: HttpClient, private presentuser: PresentUser) {

    }
    AddFriend(value: string) {
        if ((this.presentuser.getPresentUser() === "") || (this.presentuser.getPresentUser() === value)) {
            alert('Please sign up/login');
            return;
        }
        const dost = {
            username: this.presentuser.getPresentUser(),
            friend: value
        };
        this.http.get<{ status: number }>
            ('http://localhost:3000/api/users/friend?username=' + dost.username + '&friend=' + dost.friend)
            .subscribe(respondedData => {
                console.log(respondedData.status);
                if (respondedData.status === 404) {
                    alert('Already  a friend');
                } else {
                    this.http.post<{ message: string }>
                        ('http://localhost:3000/api/users/friend', dost)
                        .subscribe(respondedData => {
                            console.log(respondedData.message);
                        });
                }
            });
    }


    Search(value: string) {
        this.results = [];
        this.key = value;
        if (this.key != '') {
            this.noresult = 0;
            this.http.get<{ message: string, status: number, Searchresults: any }>
                ('http://localhost:3000/api/search/user?user=' + this.key).
                subscribe(respondedData => {
                    this.results.push(respondedData.Searchresults);
                });
        } else {
            this.noresult = 1;
        }

    }

    // OnDelete(value: string){
    //     this.http.delete<{message: string}>('http://localhost:3000/api/delete/user?username='+value)
    //     .subscribe();
    // }

    test() {
        this.http.get<{ testdata: any }>('http://localhost:3000/api/test')
            .subscribe(respondedData => {
                console.log(respondedData.testdata);
            });
    }
}