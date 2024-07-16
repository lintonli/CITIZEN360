import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IUser } from '../Models/users';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  form!:FormGroup
  errorMessage:string=''
  successMessage:string=''
  constructor(private auth:AuthenticationService, private route:Router){}
  onSubmit(){
if(this.form.valid){
  const {UNAME,EMAIL,UPASSWORD,ROLE}=this.form.value;
  const newUser:IUser={
    ID: (this.auth.getUsers().length +1).toString(),
    UNAME,
    EMAIL,
    UPASSWORD,
    ROLE,
    status:""
  };
  const user= this.auth.getUser(EMAIL);
  if(user){
    this.errorMessage='user email already exists'
console.log("user email already exists")
  }else{
    this.auth.registerUser(newUser);
    this.successMessage='user registered successfully'
    this.route.navigate(['login'])
  }
}else{
  this.errorMessage='please fill all the required fields'
}
  }
  ngOnInit(): void {
    this.form= new FormGroup({
      UNAME: new FormControl(null, Validators.required),
      EMAIL: new FormControl(null, [Validators.email, Validators.required]),
      UPASSWORD: new FormControl(null, Validators.required),
      ROLE: new FormControl(null, Validators.required)
    })
  }

}
