import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { Discipline } from '../model/discipline';
import { Sport } from '../model/sport';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-unregister-user',
  templateUrl: './unregister-user.component.html',
  styleUrls: ['./unregister-user.component.css']
})
export class UnregisterUserComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  sports: Sport[];
  disciplines: Discipline[];
  athletes: Athlete[];

  sexes: any [] = [
    {value: 'Muski'},
    {value: 'Zenski'}
  ];

  ngOnInit(): void {
    this.userService.getAllSports().subscribe((sports: Sport[])=>{
      this.sports = sports;
      // this.sports.splice(0, 0, {name: ""});
      // console.log(this.sports);
    })

    this.userService.getAllDisciplinesNames().subscribe((disc: Discipline[])=>{
      this.disciplines = disc;
    })
  }

  searchForm: FormGroup = this.fb.group({
    firstname: [''],
    lastname: [''],
    sport: [''],
    discipline: [''],
    sex: ['']
  })

  onRegister() {
    if (!this.searchForm.valid) {
      return;
    }

    this.userService.searchAthletes(
      this.searchForm.value.firstname,
      this.searchForm.value.lastname,
      this.searchForm.value.sport,
      this.searchForm.value.discipline,
      this.searchForm.value.sex).subscribe((atls: Athlete[])=>{
        this.athletes = atls;
        console.log(this.athletes);
      });

  }

  selectChangeHandlerSport(event: any){
    this.userService.getAllDisciplinesForSport(event).subscribe((disc: Discipline[])=>{
      this.disciplines = disc;
    })
  }
}
