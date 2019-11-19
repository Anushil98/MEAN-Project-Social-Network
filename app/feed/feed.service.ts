import { Post } from '../post/post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PresentUser } from '../present.user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from './file.model';

@Injectable({ providedIn: 'root' })

export class FeedService {

    public lik: string = "";
    private post: Post[] = [];
    private file: File[] = []
    private postUpdated = new Subject<Post[]>();
    private fileUpdated = new Subject<File[]>();
    private subject = new Subject<string>();

    constructor(private presentUser: PresentUser, private http: HttpClient) {

    }
    getPostUpdatedListener() {
        return this.postUpdated.asObservable();
    }
    getFileUpdatedListener() {
        return this.fileUpdated.asObservable();
    }

    getPost() {
        if (this.presentUser.getPresentUser() === "") {
            alert('Please sign up/login');
            return;
        }
        this.post = [];
        this.http.get<{ post: any }>
            ('http://localhost:3000/api/' + this.presentUser.getPresentUser() + '/friend')
            .subscribe(respondedData => {
                console.log(respondedData.post);

                respondedData.post.forEach(element => {
                    const post: Post = {
                        id: element._id,
                        username: element.username,
                        title: element.title,
                        content: element.content,
                        likes: element.likes,
                    };
                    this.post.push(post);
                    this.postUpdated.next([...this.post]);
                });
            });
        return [...this.post];
    }

    getFiles() {
        if (this.presentUser.getPresentUser() === "") {
            alert('Please sign up/login');
            return;
        }
        this.file = [];
        this.http.get<{ file: any }>
            ('http://localhost:3000/api/student/friends/file/' + this.presentUser.getPresentUser())
            .subscribe(respondedData => {
                console.log(respondedData.file);

                respondedData.file.forEach(element => {
                    const file: File = {
                        id: element._id,
                        username: element.username,
                        Description: element.description,
                        filename: element.filename
                    };
                    this.file.push(file);
                    this.fileUpdated.next([...this.file]);
                });
            });
        return [...this.file];

    }
    download(id: string) {
        return this.http.get('http://localhost:3000/api/student/file/download/' + id, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
    // this.http.get<{ profiepic: any }>('http://localhost:3000/api/' + element.username + '/profilepic')
    //                     .subscribe(respondedData2 => {
    //                         console.log("hey"+respondedData2);
    //                     });

    like(id: string) {
        this.subject = new Subject<string>();
        this.http.get<{ message: string, id: string, likes: string }>
            ('http://localhost:3000/api/like/' + id)
            .subscribe(data => {
                console.log(data.message);
                this.lik = data.likes;
                this.subject.next(this.lik);
            });
        return this.subject.asObservable();

    }

}
