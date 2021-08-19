import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';


  currentUserType:any;

  ngOnInit(): void {
    this.userService.changeMessage(localStorage.getItem('type'));
  }

  
  constructor(private userService: UserServiceService, public router: Router) {
    userService.currentMessage.subscribe(message => (this.currentUserType= message));
  }

}

