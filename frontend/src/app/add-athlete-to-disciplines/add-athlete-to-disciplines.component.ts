import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Sport } from '../model/sport';
import { Discipline } from '../model/discipline';
import { Competition } from '../model/competition';

@Component({
  selector: 'app-add-athlete-to-disciplines',
  templateUrl: './add-athlete-to-disciplines.component.html',
  styleUrls: ['./add-athlete-to-disciplines.component.css']
})
export class AddAthleteToDisciplinesComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  sports: Sport[];
  disciplines: Discipline[];

  sexes: any [] = [
    {value: 'Muski'},
    {value: 'Zenski'}
  ];

  ngOnInit(): void {
    this.userService.getAllSports().subscribe((sports: Sport[])=>{
      this.sports = sports;
    })
  }

  registrationForm: FormGroup = this.fb.group({
    sport: ['', [Validators.required]],   
    sex: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]] ,
    discipline: ['', [Validators.required]],
    country: ['', [Validators.required]]  
  })

  // Evenet == name of sport
  selectChangeHandler (event: any) {
    this.userService.getAllDisciplinesForSport(event).subscribe((disc: Discipline[])=>{
      this.disciplines = disc;
    })
    this.registrationForm.controls.country.setValue(localStorage.getItem('country'));
  }

  onRegister() {

    if (!this.registrationForm.valid) {
      return;
    }

    console.log(this.registrationForm.value.firstname);
    console.log(this.registrationForm.value.lastname);
    console.log(this.registrationForm.value.sport);
    console.log(this.registrationForm.value.discipline);
    console.log(this.registrationForm.value.sex);
    console.log(this.registrationForm.value.country);


    this.userService.getSportOfAthlete(this.registrationForm.value.firstname, this.registrationForm.value.lastname).subscribe((res: any)=>{

        if( res != null && res.sport != this.registrationForm.value.sport){
          alert("Ovaj sportista je vec prijavljen za sport: " + res.sport + "!");
        }
        else{

          this.registrationForm.value.discipline.forEach(disc => {

            this.userService.getCompetitionName(disc, this.registrationForm.value.sex).subscribe((competitionName: any)=>{

              if(competitionName != null){

                console.log(competitionName);

                const newAthlete = {
                  firstname:  this.registrationForm.value.firstname,
                  lastname: this.registrationForm.value.lastname,
                  competition: competitionName.competitionName,
                  sex: this.registrationForm.value.sex,
                  sport: this.registrationForm.value.sport,
                  discipline: disc,
                  country:  this.registrationForm.value.country
                }
    
                this.userService.addAthlete(newAthlete).subscribe((res: any)=>{
    
                  console.log(res)
    
                  if(res.athlete == "ok"){
                    alert("Athlete added in discipline!");
                    this.router.navigate(['/addAthleteOnCompetition']);
                  }
                  else{
                    alert("Something went wrong 1...");
                  }
                });

              }
              else{
                alert("Ne postoji takmicenje za ovu disciplinu");
              }
              
            });
            
            

          });
    



            
        }
    });
  }

}
