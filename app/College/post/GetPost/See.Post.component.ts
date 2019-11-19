import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "../post.service";
import { Post } from "../post.model";
import { Subscription } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: "See-College-Post-Component",
    templateUrl: "./See.Post.component.html",
    styleUrls: ["./See.Post.component.css"]
})


export class SeeCollegePostComponent implements OnInit, OnDestroy {

    public likes: string = "";
    Post: Post[] = [];
    private PostSub: Subscription;
    constructor(public postservice: PostService, private http: HttpClient) {

    }

    ngOnInit() {
        this.Post = this.postservice.getPost();
        this.PostSub = this.postservice.getPostUpdatedListener().subscribe((Post: Post[]) => {
            this.Post = Post;
        });
    }
    ngOnDestroy() {
        this.PostSub.unsubscribe();
    }
    like(id: string) {
        this.likes = "";
        this.postservice.like(id).subscribe(r => {
            this.likes = r;
            this.Post.forEach(element => {
                if (element.id === id) {
                    element.likes = this.likes as unknown as number;
                }
            });
            this.PostSub = this.postservice.getPostUpdatedListener().subscribe((Post: Post[]) => {
                this.Post = Post;
            });
        });
    }
}
