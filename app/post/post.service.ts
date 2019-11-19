import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PresentUser } from '../present.user.service';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })

export class PostService {

    public lik: string = "";
    private post: Post[] = [];
    private postUpdated = new Subject<Post[]>();
    private subject =new Subject<string>();

    constructor(private presentUser: PresentUser, private http: HttpClient) {

    }

    addPost(title: string, content: string) {
        const post: Post = {
            id: null,
            username: this.presentUser.getPresentUser(),
            title: title,
            content: content,
            likes: 0
        };
        if (this.presentUser.getPresentUser() === "") {
            alert('Please sign up/login');
            return;
        }
        this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
            .subscribe(respondedData => {
                console.log(respondedData.message);
            });
    }

    getPostUpdatedListener() {
        return this.postUpdated.asObservable();
    }

    getPost() {
        if (this.presentUser.getPresentUser() === "") {
            alert('Please sign up/login');
            return;
        }
        this.post = [];
        this.http.get<{ message: string, post: any, status: number }>
            ('http://localhost:3000/api/posts?user=' + this.presentUser.getPresentUser())
            .subscribe(respondedData => {
                console.log(respondedData.message);
                if (respondedData.status === 404) {
                    return [];
                }
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
