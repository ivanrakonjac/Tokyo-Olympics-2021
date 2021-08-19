import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  currentUserType:any;
  
  constructor(private breakpointObserver: BreakpointObserver, private userService: UserServiceService, private router: Router) {
    userService.currentMessage.subscribe(message => (this.currentUserType= message));
  }

  ngOnInit(): void {
    
  }

  logout() {
    localStorage.clear();
    this.userService.changeMessage(null);
    console.log("logout");
    this.router.navigate(['/']);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}

