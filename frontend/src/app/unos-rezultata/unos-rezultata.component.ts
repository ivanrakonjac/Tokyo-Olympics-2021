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

  fazeTakmicenja: string[] = ["GrupaA", "GrupaB","CETVRT", "POLU", "FINALE"];

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
        if(res.status == "200"){

          if(columnName == "mesto" && (inputFieldValue==1 || inputFieldValue==2 || inputFieldValue==3)){

            let idTakmicara = this.resultsIndiv.find(elem => elem._id == resID).athleteID;
            
            console.log("idTakmicara");
            console.log(idTakmicara);

            this.userService.getAthletesCountry(idTakmicara).subscribe((res: Athlete) => {
              this.userService.incCountryNumOfMedals(res.country, inputFieldValue).subscribe((res: any) => {
                  console.log(res);
              })
            })
          }

          alert("Rezultat je unet!");
        } 
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


                    this.userService.getMatchForMedal(this.choosenComp.competitionName, "PRVO").subscribe((match: Match) =>{                      
                        if(match!=null){

                          
                          let team1Name = ""; let team2Name = "";
                          if(match.brPoenaTim1>match.brPoenaTim2){
                            team1Name = match.team1
                            team2Name = match.team2
                          } 
                          else {
                            team1Name = match.team2
                            team2Name = match.team1
                          }

                          this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[])=>{
                            let team1 = teams.find(t=>t.name == team1Name);
                            let team2 = teams.find(t=>t.name == team2Name);

                            // console.log('-------------------------------------------1');
                            // console.log(team1Name);
                            // console.log(team1.country);
                            // console.log(team2Name);
                            // console.log(team2.country);

                            this.userService.incCountryNumOfMedals(team1.country, 1).subscribe(result => {});
                            this.userService.incCountryNumOfMedals(team1.country, 2).subscribe(result => {});
                          })
                        }
                    });

                    this.userService.getMatchForMedal(this.choosenComp.competitionName, "TRECE").subscribe((match: Match) =>{                      
                      if(match!=null){

                        
                        let teamName = "";
                        if(match.brPoenaTim1>match.brPoenaTim2) teamName = match.team1
                        else teamName = match.team2

                        this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[])=>{
                          let team = teams.find(t=>t.name == teamName);

                          // console.log('-------------------------------------------3');
                          // console.log(teamName);
                          // console.log(team.country);

                          this.userService.incCountryNumOfMedals(team.country, 3).subscribe(result => {});

                        })
                      }
                  })
                  }
                  else if(faza == "POLU") {
                    this.formirajFinale();
                    this.userService.setNumOfFinishedMatches(this.choosenComp.competitionName, 0);
                    this.userService.setCompetitionFaza(this.choosenComp.competitionName, "FINALE");
                  }
                  break;
                case 4:
                  if(faza == "CETVRT"){
                    this.formirajPoluFinale();
                    this.userService.setNumOfFinishedMatches(this.choosenComp.competitionName, 0);
                    this.userService.setCompetitionFaza(this.choosenComp.competitionName, "POLU");
                    console.log("CETVRT INSIDE");
                  }
                  console.log("CETVRT");
                  break;
                case 30:
                  this.formirajCetvrtFinale();
                  this.userService.setCompetitionFaza(this.choosenComp.competitionName, "CETVRT");
                  this.userService.setNumOfFinishedMatches(this.choosenComp.competitionName, 0);
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

  formirajCetvrtFinale(){
    this.userService.getSortedTeams(this.choosenComp._id, "GrupaA").subscribe((teamsA:Team[])=> {
      this.userService.getSortedTeams(this.choosenComp._id, "GrupaB").subscribe((teamsB:Team[])=> {
        
        for (let i = 0; i < 4; i++) {
          this.userService.setTeamGroupName2(teamsA[i].name, "A" + (i+1)).subscribe(resultA => {
            this.userService.setTeamGroupName2(teamsB[i].name, "B" + (i+1)).subscribe(resultB => {

              this.userService.resetBodoveIRazliku(teamsA[i].name, this.choosenComp._id);
              this.userService.resetBodoveIRazliku(teamsB[i].name, this.choosenComp._id);

              if(i==3){
                this.dodajMec("A1", "B4", this.choosenComp.competitionName, "CETVRT", "");
                this.dodajMec("B2", "A3", this.choosenComp.competitionName, "CETVRT", "");
                this.dodajMec("B1", "A4", this.choosenComp.competitionName, "CETVRT", "");
                this.dodajMec("A2", "B3", this.choosenComp.competitionName, "CETVRT", "");
              }
            })
          })
          
        }
      })
    })
  }

  formirajFinale(){
    this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[]) => {
        let A1: Team = teams.find(m => m.grupa == "AA1");
        let A2: Team = teams.find(m => m.grupa == "AA2");

        let B1: Team = teams.find(m => m.grupa == "BB1");
        let B2: Team = teams.find(m => m.grupa == "BB2");

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

        this.userService.resetBodoveIRazliku2(finaleA.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(finaleA.name, "F1");
        });
        this.userService.resetBodoveIRazliku2(finaleB.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(finaleB.name, "F2");
        });
        this.userService.resetBodoveIRazliku2(treceA.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(treceA.name, "T1");
        });
        this.userService.resetBodoveIRazliku2(treceB.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(treceB.name, "T2");
        });

     })

  }

  formirajPoluFinale(){
    this.userService.getTeamsForCompetition(this.choosenComp._id).subscribe((teams: Team[]) => {

        let A1: Team = teams.find(m => m.grupa == "A1"); let A2: Team = teams.find(m => m.grupa == "A2");
        let A3: Team = teams.find(m => m.grupa == "A3"); let A4: Team = teams.find(m => m.grupa == "A4");

        let B1: Team = teams.find(m => m.grupa == "B1"); let B2: Team = teams.find(m => m.grupa == "B2");
        let B3: Team = teams.find(m => m.grupa == "B3"); let B4: Team = teams.find(m => m.grupa == "B4");

        let A1B4: Team; let B2A3: Team;
        let B1A4: Team; let A2B3: Team;

        if(A1.bodovi > B4.bodovi) A1B4 = A1;
        else A1B4 = B4;  

        if(B2.bodovi > A3.bodovi) B2A3 = B2;
        else B2A3 = A3;  

        if(B1.bodovi > A4.bodovi) B1A4 = B1;
        else B1A4 = A4; 

        if(A2.bodovi > B3.bodovi) A2B3 = A2;
        else A2B3 = B3; 

        console.log(A1B4);
        console.log(B2A3);
        console.log(B1A4);
        console.log(A2B3);

        this.dodajMec(A1B4.grupa, B2A3.grupa, this.choosenComp.competitionName, "POLU", "");
        this.dodajMec(B1A4.grupa, A2B3.grupa, this.choosenComp.competitionName, "POLU", "");

        this.userService.resetBodoveIRazliku2(A1B4.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(A1B4.name, "AA1");
        });
        this.userService.resetBodoveIRazliku2(B2A3.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(B2A3.name, "AA2");
        });
        this.userService.resetBodoveIRazliku2(B1A4.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(B1A4.name, "BB1");
        });
        this.userService.resetBodoveIRazliku2(A2B3.name, this.choosenComp._id).subscribe(res => {
          this.userService.setTeamGroupName(A2B3.name, "BB2");
        });

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