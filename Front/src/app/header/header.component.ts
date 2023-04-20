import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userLogeed: string;
  dateDay: Date;

  constructor(private router : Router, private loginService: LoginService){}
  ngOnInit(): void {
    this.dateDay = new Date();
    this.userLogeed = this.loginService.getStudentLogged();
  }

  logOut(){
    this.router.navigate(['']);
  }

}
