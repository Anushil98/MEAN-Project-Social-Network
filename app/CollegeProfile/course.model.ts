export interface course {
    dept_id: string;
    name: string;
    credit: string;
    semester: string;
    prof: {
        Designation: string;
        First_Name: string;
        Middle_Name: string;
        Last_Name: string;
        Experience: number;
        prof_img: string;
    };
}
