import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { login } from '../model/login';
import { TokenService } from '../services/token.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  mostrarLoading: boolean;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private _token: TokenService,
    private dialog: MatDialog
  ) {}

  inicializarFormulario() {
    this.loginForm = new FormGroup({
      Username: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  hide = true;

  login(formDirective: FormGroupDirective): void{
    this.mostrarLoading = true;
    let data: login = {
      Username: String(this.loginForm.get('Username')?.value),
      Password: String(this.loginForm.get('Password')?.value),
    };
    this.loginService.studentLogin(data).subscribe((response) => {
      if(response['response'] == 1){
        const resp = response['token'];
        this._token.setJwt(resp);
        this.loginService.setStudentLogged(data.Username);
        this.router.navigate(['/students']);
      }else{
        this.mostrarLoading = false;
        this.openDialogError();
        formDirective.resetForm();
      }

    });
  }

  openDialogError(){
    this.dialog.open(errorAuthentication);
  }
}

@Component({
  selector: 'errorAuthentication',
  template: `<div class="container">
                <div class="row">
                 <div class="text-center">
                 <mat-icon class="iconDanger mb-3 mt-3">warning</mat-icon>
                 <strong><p>Usuario o contraseña incorrectos</p></strong>
                  <button class="btn btn-success mb-4" (click)="cerrar()">Aceptar</button>
                 </div>
              </div>
            </div>
            `,
            styleUrls: ['./login.component.css']
})

export class errorAuthentication{
  constructor(private dialog: MatDialog){}

  cerrar(){
    this.dialog.closeAll();
  }

}
