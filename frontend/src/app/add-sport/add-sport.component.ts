import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Sport } from '../model/sport';

@Component({
  selector: 'app-add-sport',
  templateUrl: './add-sport.component.html',
  styleUrls: ['./add-sport.component.css']
})
export class AddSportComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  sports: any [] = [];

  sport: string;

  registrationForm: FormGroup = this.fb.group({
    sport: ['', [Validators.required]]
  })

  onRegister() {
    if (!this.registrationForm.valid) {
      return;
    }

    

    this.sport = this.registrationForm.value.sport;

    this.userService.sportPostoji(this.sport).subscribe((exists: boolean)=>{
        if(exists){
          alert("Sport sa ovim imenom vec postoji!");
          return;
        }else{

          const newSport = {
            "name": this.registrationForm.value.sport
          }

          this.userService.addSport(newSport).subscribe((sport: Sport)=>{
            console.log(sport);

            if(sport){
              alert("New sport added!");
              this.router.navigate(['/addSport']);
            }
            else{
              alert("Something went wrong...");
            }
          });
        }
    });

  }


}
