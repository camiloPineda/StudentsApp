import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { student } from 'src/app/model/student';
import { LoginService } from 'src/app/services/login.service';
import { StudentService } from 'src/app/services/student.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-students-view',
  templateUrl: './students-view.component.html',
  styleUrls: ['./students-view.component.css'],
})
export class StudentsViewComponent implements OnInit, AfterViewInit {
  studentsList: any = [];

  constructor(
    public dialog: MatDialog,
    private studenService: StudentService
  ) {}

  displayedColumns: string[] = [
    'Username',
    'FirstName',
    'LastName',
    'Age',
    'Career',
    'Actions',
  ];
  dataSource = new MatTableDataSource<StudentElement>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getusers();
  }

  getusers() {
    this.studenService.getAllStudents().subscribe((response) => {
      this.studentsList = response;
      this.dataSource.data = this.studentsList;
    });
  }

  editStudent(element: any) {
   const dialogRef = this.dialog.open(Modify,{
    data: element
   });
   dialogRef.afterClosed().subscribe(result =>{
    this.getusers();
   })
  }

  addStudent() {
    const dialogRef = this.dialog.open(Create, {
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getusers();
    });
  }

  infoStudent(element: any) {
    const dialogRef = this.dialog.open(Info,{
     data: element
    });
    dialogRef.afterClosed().subscribe(result =>{
     this.getusers();
    })
   }

  deleteStudent(element: any) {
    const dialogRef = this.dialog.open(Delete,{
     data: element
    });
    dialogRef.afterClosed().subscribe(result =>{
     this.getusers();
    })
   }
}

export interface StudentElement {
  Username: string;
  FirstName: string;
  LastName: string;
  Age: number;
  Career: string;
}

@Component({
  selector: 'modifyModal',
  templateUrl: 'modifyModal.html',
})
export class Modify {

  studentForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: student, private _snackBar: MatSnackBar, public dialog: MatDialog, private studentService: StudentService) {}

  ngOnInit(){
    this.studentForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      career: new FormControl('', [Validators.required]),
    });

    this.setFromControlValue();
  }

  setFromControlValue(){
    this.studentForm.get('username')?.setValue(this.data.username);
    this.studentForm.get('firstName')?.setValue(this.data.firstName);
    this.studentForm.get('lastName')?.setValue(this.data.lastName);
    this.studentForm.get('age')?.setValue(this.data.age);
    this.studentForm.get('career')?.setValue(this.data.career);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }
  updateStudent() {
    let data: student = {
      username: String(this.studentForm.get('username')?.value),
      firstName: String(this.studentForm.get('firstName')?.value),
      lastName: String(this.studentForm.get('lastName')?.value),
      age: Number(this.studentForm.get('age')?.value),
      career: String(this.studentForm.get('career')?.value),
      id: this.data.id
    }

    this.studentService.updateStudent(data.id, data).subscribe(response =>{
      this.dialog.closeAll();
      this.openSnackBar('Estudiante modificado con éxito', 'Aceptar')
    });
  }
}

@Component({
  selector: 'createModal',
  templateUrl: 'createModal.html',
})
export class Create {
  studentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.studentForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      career: new FormControl('', [Validators.required]),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

  createStudent() {
    let data: student = {
      username: String(this.studentForm.get('username')?.value),
      firstName: String(this.studentForm.get('firstName')?.value),
      lastName: String(this.studentForm.get('lastName')?.value),
      age: Number(this.studentForm.get('age')?.value),
      career: String(this.studentForm.get('career')?.value),
      id: 0
    }
    this.studentService
      .createStudent(data)
      .subscribe((response) => {
        this.dialog.closeAll();
        this.openSnackBar('Estudiante creado con éxito', 'Aceptar')
      });
  }
}

@Component({
  selector: 'infoModal',
  templateUrl: 'infoModal.html',
})
export class Info {

  student: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: student, private _snackBar: MatSnackBar, public dialog: MatDialog, private studentService: StudentService) {}

  ngOnInit() {

  }

  getStudentId(){
    // let data: student = new student();
    // data.id = this.data.id;
    // this.studentService.getStudentId(data.id).subscribe(response => console.log(response));

    this.dialog.closeAll();
  }
}

@Component({
  selector: 'deleteModal',
  templateUrl: 'deleteModal.html',
})
export class Delete {

  constructor(@Inject(MAT_DIALOG_DATA) public data: student, private _snackBar: MatSnackBar, public dialog: MatDialog, private studentService: StudentService) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    })
  }

  deleteStudent(){
    let data: student = {
      username: this.data.username,
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      age: this.data.age,
      career: this.data.career,
      id: this.data.id
    }
    this.studentService.deleteStudent(data).subscribe(response =>{
      this.dialog.closeAll();
      this.openSnackBar('Estudiante eliminado con éxito', 'Aceptar')
    });
  }
}
