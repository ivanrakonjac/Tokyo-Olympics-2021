import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  email: string;
  username: string;
  password: string;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  })

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.email = this.loginForm.value.email
    this.password = this.loginForm.value.password

    this.userService.login(this.email, this.password).subscribe((user: User)=>{

      console.log(user);

      if(user){
        localStorage.setItem('user', user.username);
        localStorage.setItem('type', user.type + "");

        this.userService.changeMessage(user.type + "");

        if(user.type==0) this.router.navigate(['/organizator']);
        else if(user.type==1) this.router.navigate(['/delegat']);
        else if(user.type==2) this.router.navigate(['/vodjaDelegacije']);
      }
      else{
        alert("Bad data");
      }
    });
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }


}
