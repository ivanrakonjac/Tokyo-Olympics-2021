import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  hide: boolean = false;

  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  userTypes: any [] = [
    {value: '1', viewValue: 'Delegat'},
    {value: '2', viewValue: 'Vodja delegacije'}
  ];

  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  userType: string;
  passwordConfirmation: string;

  loginForm: FormGroup = this.fb.group({
    passwordConfirmation: ['', [Validators.required]],
    userType: ['', [Validators.required]],
    country: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [/*Validators.required, Validators.email*/]],
    password: ['', [Validators.required, Validators.minLength(2), , Validators.maxLength(12)]]
  })

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }

    this.username = this.loginForm.value.username;
    this.email = this.loginForm.value.email;
    this.password = this.loginForm.value.password;
    this.passwordConfirmation = this.loginForm.value.passwordConfirmation;
    this.userType = this.loginForm.value.userType;
    this.firstName = this.loginForm.value.firstName;
    this.lastName = this.loginForm.value.lastName;
    this.country = this.loginForm.value.country;
    this.userType = this.loginForm.value.userType;

    // this.userService.login(this.email, this.password).subscribe((user: User)=>{

      console.log(this.username);
      console.log(this.email);
      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.country);
      console.log(this.userType);
      console.log(this.password);
      console.log(this.passwordConfirmation);
    

      // if(user){
      //   localStorage.setItem('user', user.username);
      //   localStorage.setItem('type', user.type + "");

      //   this.userService.changeMessage(user.type + "");

      //   if(user.type==0) this.router.navigate(['/organizator']);
      //   else if(user.type==1) this.router.navigate(['/delegat']);
      //   else if(user.type==2) this.router.navigate(['/vodjaDelegacije']);
      // }
      // else{
      //   alert("Bad data");
      // }
    // });
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

}
