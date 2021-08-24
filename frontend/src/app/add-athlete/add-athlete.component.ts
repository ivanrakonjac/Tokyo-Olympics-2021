import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Competition } from '../model/competition';

@Component({
  selector: 'app-add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.css']
})
export class AddAthleteComponent implements OnInit {

  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  competitions: Competition[];

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
    country: ['', [Validators.required]]    
  })

  
  selectChangeHandler (event: any) {
    this.registrationForm.controls.sex.setValue(event.sex);
    this.registrationForm.controls.sport.setValue(event.sport);
    this.registrationForm.controls.discipline.setValue(event.discipline);
    this.registrationForm.controls.country.setValue(localStorage.getItem('country'));
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
              firstname:  this.registrationForm.value.firstname,
              lastname: this.registrationForm.value.lastname,
              competition: this.registrationForm.value.competition.competitionName,
              sex: this.registrationForm.value.sex,
              sport: this.registrationForm.value.sport,
              discipline: this.registrationForm.value.discipline,
              country:  this.registrationForm.value.country
            }

            this.userService.addAthlete(newAthlete).subscribe((res: any)=>{

              console.log(res)

              if(res.athlete == "ok"){
                alert("New athlete added!");
                this.router.navigate(['/addAthleteOnCompetition']);
              }
              else{
                alert("Something went wrong...");
              }
            });
        }
    });
  }


}
