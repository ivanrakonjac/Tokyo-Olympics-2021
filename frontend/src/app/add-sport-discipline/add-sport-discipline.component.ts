import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Sport } from '../model/sport';
import { Discipline } from '../model/discipline';

@Component({
  selector: 'app-add-sport-discipline',
  templateUrl: './add-sport-discipline.component.html',
  styleUrls: ['./add-sport-discipline.component.css']
})
export class AddSportDisciplineComponent implements OnInit {

  hide: boolean = false;

  sports: Sport[];

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllSports().subscribe((sports: Sport[])=>{
      this.sports = sports;
    })
  }

  disciplineName: string;
  disciplineSport: string;

  registrationForm: FormGroup = this.fb.group({
    disciplineName: ['', [Validators.required]],
    sport: ['', [Validators.required]]
  })

  onRegister() {
    if (!this.registrationForm.valid) {
      return;
    }

    

    this.disciplineName = this.registrationForm.value.disciplineName;
    this.disciplineSport = this.registrationForm.value.sport;

    console.log(this.disciplineName);
    console.log(this.disciplineSport);

    this.userService.sportDisciplinaPostoji(this.disciplineName).subscribe((exists: boolean)=>{
        
        if(exists){
          
          alert("Disciplina sa ovim imenom vec postoji!");
          return;

        }else{

          const newSportDiscipline = {
            "name": this.disciplineName,
            "sport": this.disciplineSport
          }

          this.userService.addSportDiscipline(newSportDiscipline).subscribe((discipline: Discipline)=>{
            console.log(discipline);

            if(discipline){
              alert("New discipline added!");
              this.router.navigate(['/addSportDiscipline']);
            }
            else{
              alert("Something went wrong...");
            }
          });
        }
    });

  }

}
