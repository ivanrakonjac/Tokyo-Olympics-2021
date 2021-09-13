import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Competition } from '../model/competition';
import { Team } from '../model/team';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-athlete-to-team',
  templateUrl: './add-athlete-to-team.component.html',
  styleUrls: ['./add-athlete-to-team.component.css']
})
export class AddAthleteToTeamComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  competitions: Competition[];
  teams: Team[];

  ngOnInit(): void {
    this.userService.getAllUnformedCompetitions().subscribe((competitions: Competition[])=>{
      this.competitions = competitions;
    })
  }

  registrationForm: FormGroup = this.fb.group({
    competition: ['', [Validators.required]],   
    sex: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]] ,
    sport: ['', [Validators.required]],
    discipline: ['', [Validators.required]],
    country: ['', [Validators.required]],
    team: ['', [Validators.required]]    
  })

  
  selectChangeHandler (event: any) {
    this.registrationForm.controls.sex.setValue(event.sex);
    this.registrationForm.controls.sport.setValue(event.sport);
    this.registrationForm.controls.discipline.setValue(event.discipline);
    this.registrationForm.controls.country.setValue(localStorage.getItem('country'));

    this.userService.getTeamsForCompetition(event._id).subscribe((teams: Team[]) => {
      this.teams = teams;
    })

  }

  onRegister() {

    if (!this.registrationForm.valid) {
      return;
    }

    this.userService.getSportOfAthlete(this.registrationForm.value.firstname, this.registrationForm.value.lastname).subscribe((res: any)=>{

        if( res != null && res.sport != this.registrationForm.value.sport){
          alert("Ovaj sportista je vec prijavljen za sport: " + res.sport + "!");
        }
        else{
            const newAthlete = {
              _id: null,
              firstname:  this.registrationForm.value.firstname,
              lastname: this.registrationForm.value.lastname,
              competition: this.registrationForm.value.competition.competitionName,
              sex: this.registrationForm.value.sex,
              sport: this.registrationForm.value.sport,
              discipline: this.registrationForm.value.discipline,
              country:  this.registrationForm.value.country,
              team: this.registrationForm.value.team.name,
            }

            this.userService.addAthlete(newAthlete).subscribe((res: any)=>{

              console.log(res)

              if(res.athlete == "ok"){
                alert("New athlete added!");

                this.userService.incNumOfTeamPlayers(this.registrationForm.value.team.name);

                this.router.navigate(['/addAthleteToTeam']);
              }
              else{
                alert("Something went wrong...");
              }
            });
        }
    });
  }
}
