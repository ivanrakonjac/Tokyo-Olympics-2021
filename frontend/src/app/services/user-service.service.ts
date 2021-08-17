import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  login(username, password){
    
    const data = {
      username: username,
      password: password
    }

    this.http.post(`${this.uri}/login`, data);

  }

}
