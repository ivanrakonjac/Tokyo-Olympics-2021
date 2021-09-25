import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  hide: boolean = false;
  hide2: boolean = false;

  ngOnInit(): void {
  }

  email: string;
  username: string;
  password: string;
  newPassword: string;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]],
    newPassword: ['', [Validators.required, Validators.minLength(8), , Validators.maxLength(12), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){3,})(?=(.*[\\d]){2,})(?=(.*[\\W]){2,})(?!.*\\s)[a-zA-Z].{7,11}$")]]
  })

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.email = this.loginForm.value.email
    this.password = this.loginForm.value.password
    this.newPassword = this.loginForm.value.newPassword

    if (this.loginForm.value.password == this.loginForm.value.newPassword) {
      this.loginForm.controls['newPassword'].setErrors({'incorrect': true});
      return;
    }

    this.userService.login(this.email, this.password).subscribe((user: User)=>{

      if(user){

        this.userService.changePassword(user.username, this.newPassword).subscribe((res:any) => {
          if(res.passwordChanged == "ok"){
            alert("Password promenjen!")
            this.router.navigate(['/']);
          }else{
            alert("Password ne moze biti promenjen!")
          }
        });
      }
      else{
        alert("Password or username is not correct!");
      }
    });
  }

}
