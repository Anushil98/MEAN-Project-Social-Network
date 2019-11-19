import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPage } from './pages/first_page/firstPage';
import { SignUpComponent } from './sign_up/sign_up.component';
import { SignUpCollegeComponent } from './College/sign_up/sign_up.component';
import { SecondPage } from './pages/SecondPage/secondPage';
import { AddPostComponent } from './post/AddPost/Add.post.component';
import { AddAchievementComponent } from './Achievement/Add_Achievement/Add.Achievement.component';
import { SeePostComponent } from './post/GetPost/See.Post.component';
import { AddCollegePostComponent } from './College/post/AddPost/Add.post.component';
import { SeeCollegePostComponent } from './College/post/GetPost/See.Post.component';
import { AddDepartmentComponent } from './College/Department/AddDepartment/Add.department.component';
import { AddProfessorComponent } from './College/Professor/addProfessor.component';
import { SeeDepartmentComponent } from './College/Department/Seedepartment/See.department.component';
import { UploadComponent } from './upload/upload.component';
import { UploadFileComponent } from './FileUpload/upload.component';
import { CollegeUploadFileComponent } from './College/FileUpload/upload.component';
import { CollegeProfileComponent } from './CollegeProfile/collegeprofile.component';
const routes = [
    { path: '', component: FirstPage },
    { path: 'student', component: SignUpComponent },
    { path: 'college', component: SignUpCollegeComponent },
    { path: 'student/homepage', component: SecondPage },
    { path: 'student/addPost', component: AddPostComponent },
    { path: 'student/addAchievement', component: AddAchievementComponent },
    { path: 'student/seePost', component: SeePostComponent },
    { path: 'college/addPost', component: AddCollegePostComponent },
    { path: 'college/seePost', component: SeeCollegePostComponent },
    { path: 'college/homePage', component: CollegeProfileComponent},
    { path: 'college/addDepartment', component: AddDepartmentComponent},
    { path: 'college/seeDepartment', component: SeeDepartmentComponent},
    { path: 'college/addProfessor' , component: AddProfessorComponent },
    { path: 'student/profilePic' , component: UploadComponent },
    { path: 'student/file/upload' , component: UploadFileComponent},
    { path: 'college/file/upload' , component: CollegeUploadFileComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }