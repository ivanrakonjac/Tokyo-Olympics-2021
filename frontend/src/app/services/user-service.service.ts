import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient, private router: Router) { }

  public currentUserType: any = [];
  public subject = new Subject<any>();

  private messageSource = new  BehaviorSubject(this.currentUserType);
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {this.messageSource.next(message);localStorage.setItem('type', message);}

  uri = 'http://localhost:4000'

  login(email, password){
    
    const data = {
      email: email,
      password: password
    }

    return this.http.post(`${this.uri}/login`, data);

  }

 

}
