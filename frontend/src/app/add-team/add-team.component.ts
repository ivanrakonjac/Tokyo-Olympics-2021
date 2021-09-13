import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Competition } from '../model/competition';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

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
    teamName: ['', [Validators.required]],
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

    const newTeam = {
      _id: null,
      name: this.registrationForm.value.teamName,
      competition: this.registrationForm.value.competition,
      sex: this.registrationForm.value.sex,
      sport: this.registrationForm.value.sport,
      discipline: this.registrationForm.value.discipline,
      country: this.registrationForm.value.country
    }

    this.userService.addTeam(newTeam).subscribe((res: any) => {
        if(res.status == "200") alert("Tim je dodat!");
        else alert("Tim trenutno ne moze biti dodat");
        this.router.navigate(['/addTeam']);
    })

  }

}
