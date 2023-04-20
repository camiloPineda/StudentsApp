import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsViewComponent } from './students/students-view/students-view.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'students', component: StudentsViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
