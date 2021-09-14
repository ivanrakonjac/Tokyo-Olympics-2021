import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent{

  constructor(private userService: UserServiceService, private router: Router) { }

  data : any;
  file:any;
  
  fileChanged(e) {
      this.file = e.target.files[0];
  }

  uploadDocument() {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        
        this.data = JSON.parse(<string>fileReader.result);
        console.log(this.data);

        this.data.players.forEach(player => {
          console.log(player.firstname, player.lastname)

          this.userService.getSportOfAthlete(player.firstname, player.lastname).subscribe((res: any)=>{

            if( res != null && res.sport != this.data.sport){
              alert("Ovaj sportista je vec prijavljen za sport: " + res.sport + "!");
              return;
            }
            else{
                const newAthlete = {
                  _id: null,
                  firstname:  player.firstname,
                  lastname: player.firstname,
                  competition: this.data.competition,
                  sex: this.data.sex,
                  sport: this.data.sport,
                  discipline: this.data.discipline,
                  country:  this.data.country,
                  team: this.data.team,
                }
    
                this.userService.addAthlete(newAthlete).subscribe((res: any)=>{
    
                  console.log(res)
    
                  if(res.athlete == "ok"){
                    this.userService.incNumOfTeamPlayers(this.data.team);
                  }
                  else{
                    alert("Something went wrong...");
                  }
                });
            }
        });
      })

      alert("New athletes added in team!");
      this.router.navigate(['/addAthletesToTeamFromFile']);

    }
    fileReader.readAsText(this.file);
  }
  
}

/*
Primer pravilne datoteke
{
	"competition": "Kosarka 2021 M",
	"team": "Lejkersi",
	"sex": "Muski",
	"sport": "Kosarka",
	"discipline" : "Kosarka",
	"country" : "Bugarska",
	"players" : [
		{"firstname": "firstName", "lastname": "lastname"},
		{"firstname": "firstName2", "lastname": "lastname2"},
		{"firstname": "firstName3", "lastname": "lastname3"},
		{"firstname": "firstName4", "lastname": "lastname4"},
		{"firstname": "firstName5", "lastname": "lastname5"}
	]
}
*/