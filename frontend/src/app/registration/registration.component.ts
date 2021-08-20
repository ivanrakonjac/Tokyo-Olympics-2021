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
  type: string;
  passwordConfirmation: string;


  registrationForm: FormGroup = this.fb.group({
    passwordConfirmation: ['', [Validators.required, Validators.minLength(2), , Validators.maxLength(12)]],
    userType: ['', [Validators.required]],
    country: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), , Validators.maxLength(12), Validators.pattern("^(?=.*?[A-Z])(?=(.*[a-z]){3,})(?=(.*[\\d]){2,})(?=(.*[\\W]){2,})(?!.*\\s)[a-zA-Z].{7,11}$")]]
  })

  onRegister() {
    if (!this.registrationForm.valid) {
      return;
    }

    this.username = this.registrationForm.value.username;
    this.email = this.registrationForm.value.email;
    this.password = this.registrationForm.value.password;
    this.passwordConfirmation = this.registrationForm.value.passwordConfirmation;
    this.type = this.registrationForm.value.userType;
    this.firstName = this.registrationForm.value.firstName;
    this.lastName = this.registrationForm.value.lastName;
    this.country = this.registrationForm.value.country;

    if (this.registrationForm.value.password != this.registrationForm.value.passwordConfirmation) {
      this.registrationForm.controls['passwordConfirmation'].setErrors({'incorrect': true});
      return;
    }

    const newUser = {
      username:  this.username,
      email: this.email,
      password: this.password,
      firstName:  this.firstName,
      lastName: this.lastName,
      country: this.country,
      type:  this.type
    }

    if(this.type == "1"){
      //newUser je Delegat
      this.registerNewUser(newUser);
    }
    else if(this.type == "2"){
        //newUser je Vodja delegacije
        this.userService.vodjaDelegacijePostoji(this.country).subscribe((exists: boolean)=>{

          if(exists){
            alert("Vodja za ovu delegaciju je vec registrovan");
            return;
          }else{
            this.registerNewUser(newUser);
          }

        });
    }else{
      alert("Something went wrong...");
      this.router.navigate(['/organizator']);
    }

  }

  registerNewUser(newUser){
    this.userService.register(newUser).subscribe((user: User)=>{

      console.log(user);

      if(user){
        alert("New user added!");
        this.router.navigate(['/organizator']);
      }
      else{
        alert("Something went wrong...");
      }
    });
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }

}
