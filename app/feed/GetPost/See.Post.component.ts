import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeedService } from '../feed.service';
import { Post } from '../../post/post.model';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { File } from '../file.model';
import {saveAs} from 'file-saver';
@Component({
    selector: "See-Feed-Component",
    templateUrl: "./See.Post.component.html",
    styleUrls: ["./See.Post.component.css"]
})


export class SeeFeedComponent implements OnInit, OnDestroy {

    public likes: string = "";
    File: File[] = [];
    Post: Post[] = [];
    private PostSub: Subscription;
    private FileSub: Subscription;
    constructor(public postservice: FeedService, private http: HttpClient) {

    }

    ngOnInit() {
        this.Post = this.postservice.getPost();
        this.PostSub = this.postservice.getPostUpdatedListener().subscribe((Post: Post[]) => {
            this.Post = Post;
        });
        this.File = this.postservice.getFiles();
        this.FileSub = this.postservice.getFileUpdatedListener().subscribe((File: File[]) => {
            this.File = File;
        });
    }
    ngOnDestroy() {
        this.PostSub.unsubscribe();
        this.FileSub.unsubscribe();
    }
    onDownload(id: string){
        this.postservice.download(id).subscribe(
            data => saveAs(data, 'FileDownloaded'),
            error => console.error(error)
        );
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
