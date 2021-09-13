import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { ResultIndivid } from '../model/resultIndivid';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-unos-rezultata',
  templateUrl: './unos-rezultata.component.html',
  styleUrls: ['./unos-rezultata.component.css']
})
export class UnosRezultataComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router:Router) { }

  competitions: Competition[];
  choosenComp: Competition; 
  username: string;
  tempUserId: string;
  resultsIndiv: ResultIndivid[];

  competitionForm: FormGroup = this.fb.group({
    competition: ['', [Validators.required]],
  })

  resultForm: FormGroup = this.fb.group({
    res1: ['',],
    res2: ['',],
    res3: ['',],
    res4: ['',],
    res5: ['',],
    res6: ['',],
    mesto: ['',],
  })


  ngOnInit(): void {

    this.username = localStorage.getItem('user');

    this.userService.getUserId(this.username).subscribe((user: User) => {
        // console.log(user._id);

        this.userService.getAllCompForDelegateWithSchedule(user._id).subscribe((allCompetitions:Competition[])=>{
          console.log(allCompetitions);
          this.competitions = allCompetitions;
        })
    })

  }

  selectChangeHandler(event){
    console.log(event);
    this.userService.getAllIndivResultsForCompetition(event).subscribe((results: ResultIndivid[]) =>{
      this.resultsIndiv = results;
      this.choosenComp = this.competitions.find(competition => competition._id == this.competitionForm.value.competition);
      // console.log(this.choosenComp);
    })
  }

  napraviRaspored(){

    if (!this.competitionForm.valid) {
      return;
    }
  }

  unesiRezultat(result){
    
    this.unosIzInputFileda(result._id, this.resultForm.value.res1, "res1", this.choosenComp.format)
    this.unosIzInputFileda(result._id, this.resultForm.value.res2, "res2", this.choosenComp.format);
    this.unosIzInputFileda(result._id, this.resultForm.value.res3, "res3", this.choosenComp.format)
    this.unosIzInputFileda(result._id, this.resultForm.value.res4, "res4", this.choosenComp.format);
    this.unosIzInputFileda(result._id, this.resultForm.value.res5, "res5", this.choosenComp.format)
    this.unosIzInputFileda(result._id, this.resultForm.value.res6, "res6", this.choosenComp.format);
    this.unosIzInputFileda(result._id, this.resultForm.value.mesto, "mesto", this.choosenComp.format);

  }

  unosIzInputFileda(resID, inputFieldValue, columnName, competitionFormat){ 
    if(inputFieldValue != "") {
      this.userService.unesiRezultat(resID, columnName, inputFieldValue, competitionFormat).subscribe((res: any) => {
        console.log(res);
        if(res.status == "200") alert("Rezultat je unet!");
        else alert("Trenutno nije moguce uneti rezultat"); 
      });
    }
  }
}

/* Formati podsetnik
formats: any [] = [
  {value: '1', viewValue: 'Ekipno - 2 grupe - po 6 ekipa'},
  {value: '2', viewValue: 'Tenis - singl - 4'},
  {value: '3', viewValue: 'Tenis - singl - 8'},
  {value: '4', viewValue: 'Tenis - singl - 16'},
  {value: '5', viewValue: 'Tenis - dubl - 4'},
  {value: '6', viewValue: 'Tenis - dubl - 8'},
  {value: '7', viewValue: 'Tenis - dubl - 16'},
  {value: '8', viewValue: 'Indiv - 8 takmicara - sa kvalifikacijama - 1 pokusaj'},
  {value: '9', viewValue: 'Indiv - do 8 takmicara - sa kvalifikacijama - 3 pokusaja'},
  {value: '10', viewValue: 'Indiv - x takmicara - bez kvalifikacija - 1 pokusaj'},
  {value: '11', viewValue: 'Indiv - do 8 takmicara - bez kvalifikacija - 6 pokusaja'}
];
*/