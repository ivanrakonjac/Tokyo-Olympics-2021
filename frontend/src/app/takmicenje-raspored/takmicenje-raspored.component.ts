import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { Team } from '../model/team';
import { User } from '../model/user';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-takmicenje-raspored',
  templateUrl: './takmicenje-raspored.component.html',
  styleUrls: ['./takmicenje-raspored.component.css']
})
export class TakmicenjeRasporedComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router:Router) { }

  competitions: Competition[];

  competitiors: Athlete[];
  teams: Team[];

  username: string;
  tempUserId: string;
  choosenComp: Competition;
  finalsDate: Date;
  finalsTime: Time;

  competitionForm: FormGroup = this.fb.group({
    competition: ['', [Validators.required]],
    finalsDate: ['', [Validators.required]],
    finalsTime: ['', [Validators.required]]
  })

  ngOnInit(): void {

    this.username = localStorage.getItem('user');

    this.userService.getUserId(this.username).subscribe((user: User) => {
        // console.log(user._id);

        this.userService.getAllCompetitionsForSpecificDelegate(user._id).subscribe((allCompetitions:Competition[])=>{
          console.log(allCompetitions);
          this.competitions = allCompetitions;
        })
    })

  }

  napraviRaspored(){

    if (!this.competitionForm.valid) {
      return;
    }

    this.finalsDate = this.competitionForm.value.finalsDate;
    this.finalsTime = this.competitionForm.value.finalsTime;

    this.choosenComp = this.competitions.find(comp => comp.competitionName==this.competitionForm.value.competition);

    if(this.choosenComp.format == 1){
      this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[]) =>{
          this.teams = teams;
          // console.log(this.teams);

          if(teams.length < 4){
            alert("Mora biti prijavaljeno bar 4 tima!");
            return;
          } 

          if(this.choosenComp.minTakmicara != null ){
            this.teams.forEach(team => {
              if(team.numOfPlayers < this.choosenComp.minTakmicara){
                alert("Za tim " + team.name + " morate prijaviti minimun " + this.choosenComp.minTakmicara + " igraca!");
                return;
              }
            })
          }

          if(this.choosenComp.maxTakmicara != null ){
            this.teams.forEach(team => {
              if(team.numOfPlayers > this.choosenComp.minTakmicara){
                alert("Za tim " + team.name + " moze biti prijavljeno max " + this.choosenComp.minTakmicara + " igraca!");
                return;
              }
            })
          }

          switch(this.teams.length){
            case 4:
              break;
            case 8: 
              break;
            case 12:
              this.grupnaFaza();
              break;
            default:
              alert("Broj timova nije odgovarajuci!");
              return;
          }

          console.log("DALJEE");
      })
    }else{
      this.userService.getAllAthletesForCompetition(this.choosenComp.competitionName).subscribe((atl: Athlete[])=>{
        this.competitiors = atl;
        // console.log(this.competitiors)
  
        switch(this.choosenComp.format) {
          case 8:
            this.indiv8TakmicaraSaKvalifikacijama1Pokusaj(this.choosenComp);
            break;
          case 9:
            this.indiv8TakmicaraSaKvalifikacijama3Pokusaja(this.choosenComp);
            break;
          case 10:
            this.indivXTakmicaraBezKvalifikacija1Pokusaj(this.choosenComp);
            break;
          case 11:
            this.indiv8TakmicaraBezKvalifikacija6Pokusaja(this.choosenComp);
            break;
          default:
            alert("default");
        } 
  
        alert("Raspored napravljen");
  
      })
    }

    
  }

  grupnaFaza(){
    let grupaA: Team[] = [];
    let grupaB: Team[] = [];

    for (let i = 0; i <this.teams.length; i++){
      if(i%2==0) grupaA.push(this.teams[i]);
      else grupaB.push(this.teams[i]);
    }

    console.log(grupaA);
    console.log(grupaB);
  }

  indiv8TakmicaraSaKvalifikacijama1Pokusaj(competition){
    // console.log('indiv8TakmicaraSaKvalifikacijama1Pokusaj');
    // console.log(competition);

    console.log(this.competitiors.length);

    this.competitiors.forEach(comp => {
        const newIdivResult = {
            "_id": null,
            "competitionID": competition._id,
            "athleteID": comp._id,
            "competitionName": competition.competitionName,
            "athleteName": comp.firstname + " " + comp.lastname,
            "res1": "0",
            "res2": "z",
            "res3": "x",
            "res4": "x",
            "res5": "x",
            "res6": "x",
            "sum" : -100,
            "mesto" : "z",
            "competitionFormat": competition.format
        }// -100/x -> nece se koristiti; -1/0 -> nije jos upotrebljeno; z -> zakljucano

        this.addResultIdiv(newIdivResult);
    })

    this.setRasporedNapravljen(competition._id);
    this.setDatumVremeFinala(competition._id, this.finalsDate, this.finalsTime);
  }

  indiv8TakmicaraSaKvalifikacijama3Pokusaja(competition){
    // console.log('indiv8TakmicaraSaKvalifikacijama1Pokusaj');
    // console.log(competition);

    console.log(this.competitiors.length);

    this.competitiors.forEach(comp => {
        const newIdivResult = {
            "_id": null,
            "competitionID": competition._id,
            "athleteID": comp._id,
            "competitionName": competition.competitionName,
            "athleteName": comp.firstname + " " + comp.lastname,
            "res1": "0",
            "res2": "0",
            "res3": "0",
            "res4": "z",
            "res5": "z",
            "res6": "z",
            "sum" : -100,
            "mesto" : "z",
            "competitionFormat": competition.format
        }// -100/x -> nece se koristiti; -1/0 -> nije jos upotrebljeno; z -> zakljucano

        this.addResultIdiv(newIdivResult);
    })

    this.setRasporedNapravljen(competition._id);
    this.setDatumVremeFinala(competition._id, this.finalsDate, this.finalsTime);
  }

  indivXTakmicaraBezKvalifikacija1Pokusaj(competition){
    // console.log('indiv8TakmicaraSaKvalifikacijama1Pokusaj');
    // console.log(competition);

    console.log(this.competitiors.length);

    this.competitiors.forEach(comp => {
        const newIdivResult = {
            "_id": null,
            "competitionID": competition._id,
            "athleteID": comp._id,
            "competitionName": competition.competitionName,
            "athleteName": comp.firstname + " " + comp.lastname,
            "res1": "0",
            "res2": "x",
            "res3": "x",
            "res4": "x",
            "res5": "x",
            "res6": "x",
            "sum" : -100,
            "mesto" : "z",
            "competitionFormat": competition.format
        }// -100/x -> nece se koristiti; -1/0 -> nije jos upotrebljeno; z -> zakljucano

        this.addResultIdiv(newIdivResult);
    })

    this.setRasporedNapravljen(competition._id);
    this.setDatumVremeFinala(competition._id, this.finalsDate, this.finalsTime);
  }

  indiv8TakmicaraBezKvalifikacija6Pokusaja(competition){
    // console.log('indiv8TakmicaraSaKvalifikacijama1Pokusaj');
    // console.log(competition);

    console.log(this.competitiors.length);

    this.competitiors.forEach(comp => {
        const newIdivResult = {
            "_id": null,
            "competitionID": competition._id,
            "athleteID": comp._id,
            "competitionName": competition.competitionName,
            "athleteName": comp.firstname + " " + comp.lastname,
            "res1": "0",
            "res2": "0",
            "res3": "0",
            "res4": "0",
            "res5": "0",
            "res6": "0",
            "sum" : -1,
            "mesto" : "z",
            "competitionFormat": competition.format
        }// -100/x -> nece se koristiti; -1/0 -> nije jos upotrebljeno; z -> zakljucano

        this.addResultIdiv(newIdivResult);
    })

    this.setRasporedNapravljen(competition._id);
    this.setDatumVremeFinala(competition._id, this.finalsDate, this.finalsTime);
  }


  //Dodaje dokument u result kolekciju
  addResultIdiv(newIdivResult){
    console.log(newIdivResult);

    this.userService.addResultIdiv(newIdivResult).subscribe((result : any) => {
      if(result.addResultIdiv != "ok"){
        alert("I can not add idividual result!");
      }
    })
  }

  setRasporedNapravljen(competitionID){
    // Setuje da je raspored napravljen
    this.userService.setRasporedNapravljen(competitionID).subscribe((result : any) => {
      if(result.setRasporedNapravljen != "ok"){
        alert("I can not set rasporedNapravljen!");
      }
    })
  }

  setDatumVremeFinala(competitionID,datum,vreme){
    // Setuje datum i vreme finala
    this.userService.setDatumVremeFinala(competitionID,datum,vreme).subscribe((result : any) => {
      if(result.setDatumVremeFinala != "ok"){
        alert("I can not set Datum/Vreme finala!");
      }
    })
  }

}

/* Formati
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
  {value: '10', viewValue: 'Indiv - x takmicara - bez kvalifikacija - 1 pokusa'},
  {value: '11', viewValue: 'Indiv - do 8 takmicara - bez kvalifikacija - 6 pokusaja'}
];
*/
