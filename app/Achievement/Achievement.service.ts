import { Certificate } from "./Achievement.model";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { PresentUser } from '../present.user.service';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })

export class AchievementService {

    private Certi: Certificate[] = [];
    private CertiUpdated = new Subject<Certificate[]>();

    constructor(private presentuser: PresentUser, private http: HttpClient) {

    }

    addAchievement(Certi_No: string, Certi_name: string, Issuer: string, DOI: Date) {

        const certificate: Certificate = {
            username: this.presentuser.getPresentUser(),
            Certificate_no: Certi_No,
            Certificate_Name: Certi_name,
            Issued_By: Issuer,
            Date_Of_Issue: DOI
        };
        if(this.presentuser.getPresentUser() === ""){
            alert('Please sign up/login');
            return;
        }
        this.http.post<{ message: string }>('http://localhost:3000/api/' + certificate.username + '/Achievement', certificate)
            .subscribe((respondedData) => {
                console.log(respondedData.message);
            });
    }

    getAchievementUpdateListener() {
        return this.CertiUpdated.asObservable();
    }

    getAchievement() {
        this.Certi=[];
        if(this.presentuser.getPresentUser() === ""){
            alert('Please sign up/login');
            return;
        }
        this.http.get<{ message: string, certificate: any,status: number }>
        ('http://localhost:3000/api/' + this.presentuser.getPresentUser()+ '/Achievement')
            .subscribe((respondedData) => {
                console.log(respondedData.message);
                if(respondedData.status===404){
                    return [];
                }
                respondedData.certificate.forEach(element => {
                    const certificate: Certificate = {
                        username: element.Username,
                        Certificate_no: element.Certificate_no,
                        Certificate_Name: element.Certificate_Name,
                        Issued_By: element.Issued_By,
                        Date_Of_Issue: (new Date(element.Date_Of_Issue))
                    };
                    this.Certi.push(certificate);
                    this.CertiUpdated.next([...this.Certi]);
                });
            });
        return [...this.Certi];
    }
}