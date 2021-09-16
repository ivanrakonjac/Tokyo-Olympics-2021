import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { Competition } from '../model/competition';
import { Match } from '../model/match';
import { ResultIndivid } from '../model/resultIndivid';
import { Team } from '../model/team';
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
  matches: Match[];
  faza: string = "";

  fazeTakmicenja: string[] = ["POLU", "FINALE"];

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

  resultFormTeam: FormGroup = this.fb.group({
    team1: ['',],
    team2: ['',],
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
        this.faza = this.choosenComp.faza;
        console.log(this.choosenComp);

        this.userService.getMatchesForCompetition(this.choosenComp.competitionName).subscribe ((matches: Match[]) =>{
            this.matches = matches;
            console.log(matches);
        })

      })

      // this.userService.getMatchesForCompetition()
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

  unesiRezultatTeam(m){

    console.log(this.resultFormTeam.value.team1);
    console.log(this.resultFormTeam.value.team2);
    console.log(m);

    if(this.resultFormTeam.value.team1 != "" && this.resultFormTeam.value.team2 != ""){

      let team1 = parseInt(this.resultFormTeam.value.team1);
      let team2 = parseInt(this.resultFormTeam.value.team2);

      this.userService.entryMatchResult(m._id, team1, team2, this.choosenComp.competitionName).subscribe((res: any) =>{
          
          if(team1 > team2){
            this.userService.unesiBodoveIRazliku(m.team1, 2, team1 - team2, this.choosenComp._id);
            this.userService.unesiBodoveIRazliku(m.team2, 1, 0, this.choosenComp._id);
          }
          else{
            this.userService.unesiBodoveIRazliku(m.team1, 1, 0, this.choosenComp._id);
            this.userService.unesiBodoveIRazliku(m.team2, 2, team2 - team1, this.choosenComp._id);
          }

          this.userService.getCompetitionFazaAndNumOfFinishedMatches(this.choosenComp.competitionName).subscribe((res: any) => {
              let faza = res.faza;
              let numOfFinishedMatches = res.numOfFinishedMatches;

              switch (numOfFinishedMatches) {
                case 2:
                  console.log("2");
                  if(faza == "FINALE"){
                    //inc medalje
                    this.userService.setCompetitionFaza(this.choosenComp.competitionName, "GOTOVO");
                  }
                  else if(faza == "POLU") {
                    this.formirajFinale();
                    this.userService.setNumOfFinishedMatches(this.choosenComp.competitionName, 0);
                    this.userService.setCompetitionFaza(this.choosenComp.competitionName, "FINALE");
                  }
                  break;
                case 4:
                  if(faza == "POLU"){
                    // napravi mec za 1. mesto
                    //napravi mec za 3. mesto
                   
                  }
                  else if(faza == "CETVRT"){
                    // napravi polu
                  } 
                  console.log("4");
                  break;
                case 30:
                  //napravi polu
                  console.log("30");
                  break;
              }

              
            
          })
      })
    }
      
  }

  filterItemsOfType(type){
    if(this.matches != null){
      return this.matches.filter(m => m.faza == type);
    }
  }

  getTeamsSorted(){
    this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[]) => {
     console.log(teams.sort((a: Team,b:Team) => b.bodovi - a.bodovi));
    })
  }

  formirajFinale(){
    this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[]) => {
        let A1: Team = teams.find(m => m.grupa == "A1");
        let A2: Team = teams.find(m => m.grupa == "A2");

        let B1: Team = teams.find(m => m.grupa == "B1");
        let B2: Team = teams.find(m => m.grupa == "B2");

        let finaleA: Team; let finaleB: Team;
        let treceA: Team; let treceB: Team;

        if(A1.bodovi > A2.bodovi){
          finaleA = A1;
          treceA = A2;
        }
        else{
          finaleA = A2;
          treceA = A1;
        }

        if(B1.bodovi > B2.bodovi){
          finaleB = B1;
          treceB = B2;
        }
        else{
          finaleB = B2;
          treceB = B1;
        }

        this.dodajMec(finaleA.grupa, finaleB.grupa, this.choosenComp.competitionName, "FINALE", "PRVO");
        this.dodajMec(treceA.grupa, treceB.grupa, this.choosenComp.competitionName, "FINALE", "TRECE");

     })

    
    
  }

  dodajMec(teamGroup1, teamGroup2, competitionName, faza, mesto) {

    this.userService.getTeamByGroupAndCompetitionID(teamGroup1, this.choosenComp._id).subscribe((t1: Team)=>{

      this.userService.getTeamByGroupAndCompetitionID(teamGroup2, this.choosenComp._id).subscribe((t2: Team)=>{

        const newMatch = {
          "_id": null,
          "competitionName": this.choosenComp.competitionName,
          "team1": t1.name,
          "team2": t2.name,
          "faza" : faza,
          "brPoenaTim1" : 0,
          "brPoenaTim2" : 0,
          "mesto": mesto
        }

        this.dodajUtakmicuServis(newMatch);

      })
    })

  }
  
  dodajUtakmicuServis(utakmica){
    this.userService.addMatch(utakmica).subscribe( (res: any) => {
      if(res.status != "200"){
        alert("Problem sa dodavanjem utakmica!");
      } 
    })
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