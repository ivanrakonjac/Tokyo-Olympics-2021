import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Sport } from '../model/sport';
import { Discipline } from '../model/discipline';
import { User } from '../model/user';

@Component({
  selector: 'app-add-competition',
  templateUrl: './add-competition.component.html',
  styleUrls: ['./add-competition.component.css']
})
export class AddCompetitionComponent implements OnInit {
  
  hide: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  sports: Sport[];
  disciplines: Discipline[];
  delegates: User[];

  formats: any [] = [
    {value: '1', viewValue: 'Ekipno - 2 grupe - po 6 ekipa'},
    {value: '8', viewValue: 'Individualno - 8 takmicara - sa kvalifikacijama - 1 pokusaj'},
    {value: '9', viewValue: 'Individualno - do 8 takmicara - sa kvalifikacijama - 3 pokusaja'},
    {value: '10', viewValue: 'Individualno - x takmicara - bez kvalifikacija - 1 pokusaj'},
    {value: '11', viewValue: 'Individualno - do 8 takmicara - bez kvalifikacija - 6 pokusaja'}
  ];

  sexes: any [] = [
    {value: 'Muski'},
    {value: 'Zenski'}
  ];

  types: any [] = [
    {value: 'Ekipno'},
    {value: 'Pojedinacno'}
  ];

  ngOnInit(): void {
    this.userService.getAllSports().subscribe((sports: Sport[])=>{
      this.sports = sports;
    })

    this.userService.getAllDisciplinesNames().subscribe((disc: Discipline[])=>{
      this.disciplines = disc;
    })

    this.userService.getAllDelegates().subscribe((del: User[])=>{
      this.delegates = del;
      console.log(this.delegates);
    })
  }

  registrationForm: FormGroup = this.fb.group({
    competitionName: ['', [Validators.required]],
    sport: ['', [Validators.required]],
    discipline: ['', [Validators.required]],
    format: ['', [Validators.required]],
    sex: ['', [Validators.required]],
    type: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    location: ['', [Validators.required]],
    delegate: ['', [Validators.required]],
    formatRezultata: ['', [Validators.required]],
    minTakmicara: [''],
    maxTakmicara: [''],
    maxTakmicaraUFinalu: ['']
  })

  onRegister() {
    if (!this.registrationForm.valid) {
      return;
    }

    // console.log(this.registrationForm.value.competitionName);
    // console.log(this.registrationForm.value.sport);
    // console.log(this.registrationForm.value.discipline);
    // console.log(this.registrationForm.value.format);
    // console.log(this.registrationForm.value.sex);
    // console.log(this.registrationForm.value.type);
    // console.log(this.registrationForm.value.startDate);
    // console.log(this.registrationForm.value.endDate);
    // console.log(this.registrationForm.value.location);
    // console.log(this.registrationForm.value.delegate);
    // console.log(this.registrationForm.value.formatRezultata);
    // console.log(this.registrationForm.value.minTakmicara);
    // console.log(this.registrationForm.value.maxTakmicara);
    // console.log(this.registrationForm.value.maxTakmicaraUFinalu);
    // console.log(this.registrationForm.value.datumFinala);
    // console.log(this.registrationForm.value.vremeFinala);

    const newCompetition = {
      _id: null,
      competitionName:  this.registrationForm.value.competitionName,
      sport: this.registrationForm.value.sport,
      discipline: this.registrationForm.value.discipline,
      format:  this.registrationForm.value.format,
      sex: this.registrationForm.value.sex,
      type: this.registrationForm.value.type,
      startDate: this.registrationForm.value.startDate,
      endDate:  this.registrationForm.value.endDate,
      location:  this.registrationForm.value.location,
      delegat:  this.registrationForm.value.delegate,
      formirano: 0,
      rasporedNapravljen: 0,
      formatRezultata: this.registrationForm.value.formatRezultata,
      minTakmicara:this.registrationForm.value.minTakmicara,
      maxTakmicara: this.registrationForm.value.maxTakmicara,
      maxTakmicaraUFinalu: this.registrationForm.value.maxTakmicaraUFinalu,
      numOfFinishedMatches: 0,
      faza: "/" 
    }

    this.userService.addCompetition(newCompetition).subscribe((competition: any)=>{

      console.log(competition)

      if(competition){
        alert("New competition added!");
        this.router.navigate(['/addCompetition']);
      }
      else{
        alert("Something went wrong...");
      }
    });

  }

  selectChangeHandlerSport(event: any){
    this.userService.getAllDisciplinesForSport(event).subscribe((disc: Discipline[])=>{
      this.disciplines = disc;
    })
  }

  // selectChangeHandlerDiscipline(event: any){
  //   console.log("selectChangeHandlerDiscipline");
  //   console.log(event);
  //   let sportName;

  //   this.userService.getSportNameOfDiscipline(event).subscribe((sportName: any)=>{
  //     console.log(sportName.sport);

  //     this.userService.sportByName(sportName.sport).subscribe((sp: Sport[])=>{
  //       this.registrationForm.value.sport = sp[0].name;
  //     });

  //   });
  // }

}
