import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../Models/users';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  
  form!:FormGroup
  errorMessage:string=''
  constructor(private route:Router, private auth:AuthenticationService) {}
  onSubmit() {
    if(this.form.valid){
 const email = this.form.value.EMAIL;
 const password =this.form.value.UPASSWORD;
 const user = this.auth.loginUser(email,password);
 if (user) {
   this.route.navigate(['dashboard']);
 } else {
   this.errorMessage = 'invalid credentials';
 }
    }
  }
  ngOnInit(): void {
  this.form=new FormGroup({
    EMAIL:new FormControl(null, Validators.required),
    UPASSWORD:new FormControl(null, Validators.required)
  })
  }
}
