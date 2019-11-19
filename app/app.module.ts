import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign_up/sign_up.component';
import { LogInComponent } from './login/login.component';
import { AddAchievementComponent } from './Achievement/Add_Achievement/Add.Achievement.component';
import { SeeAchievementComponent } from './Achievement/See_Achievement/See.Achivement.component';
import { AddPostComponent } from './post/AddPost/Add.post.component';
import { SeePostComponent } from './post/GetPost/See.Post.component';
import { SeeDepartmentComponent } from './College/Department/Seedepartment/See.department.component';
import { AddDepartmentComponent } from './College/Department/AddDepartment/Add.department.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './Search/search.component';
import { UploadComponent } from './upload/upload.component';
import { SeeFeedComponent } from './feed/GetPost/See.Post.component';
import { LogInCollegeComponent } from './College/login/login.component';
import { SignUpCollegeComponent } from './College/sign_up/sign_up.component';
import { AddProfessorComponent } from './College/Professor/addProfessor.component';
import { FirstPage } from './pages/first_page/firstPage';
import { AppRoutingModule } from './app-routing.model';
import { SecondPage } from './pages/SecondPage/secondPage';
import { AddCollegePostComponent } from './College/post/AddPost/Add.post.component';
import { SeeCollegePostComponent } from './College/post/GetPost/See.Post.component';
import { UploadFileComponent } from './FileUpload/upload.component';
import { CollegeUploadFileComponent } from './College/FileUpload/upload.component';
import { CollegeProfileComponent } from './CollegeProfile/collegeprofile.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    AddAchievementComponent,
    SeeAchievementComponent,
    AddPostComponent,
    SeePostComponent,
    SeeDepartmentComponent,
    AddDepartmentComponent,
    SearchComponent,
    UploadComponent,
    SeeFeedComponent,
    LogInCollegeComponent,
    SignUpCollegeComponent,
    AddProfessorComponent,
    AddCollegePostComponent,
    SeeCollegePostComponent,
    UploadFileComponent,
    CollegeUploadFileComponent,
    CollegeProfileComponent,
    FirstPage,
    SecondPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
