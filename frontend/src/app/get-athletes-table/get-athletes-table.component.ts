import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { AthletesTableDataSource } from '../athletes-table/athletes-table-datasource';
import { Athlete } from '../model/athlete';
import { Discipline } from '../model/discipline';
import { Sport } from '../model/sport';
import { UserServiceService } from '../services/user-service.service';
import { GetAthletesTableDataSource, GetAthletesTableItem } from './get-athletes-table-datasource';

@Component({
  selector: 'app-get-athletes-table',
  templateUrl: './get-athletes-table.component.html',
  styleUrls: ['./get-athletes-table.component.css']
})
export class GetAthletesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<GetAthletesTableItem>;
  dataSource: GetAthletesTableDataSource;

    
  hide: boolean = false;
  
  sports = new Array<{sport}>();
  disciplines: Discipline[];
  athletes: Athlete[];
  country: String;

  sexes: any [] = [
    {value: 'Muski'},
    {value: 'Zenski'}
  ];


    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ['id', 'firstname', 'lastname', 'competition', 'sex', 'sport', 'discipline', 'zastava' ];

    constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }
  
    ngOnInit() {

      this.country = localStorage.getItem('country');

      this.dataSource = new GetAthletesTableDataSource(this.userService, this.router);
  
      this.userService.getAllSportsForCountry(this.country).subscribe((sports: Array<{sport}>) => {

        sports.forEach(element => {
          const found = this.sports.find(s => s.sport == element.sport);
          if(found == undefined) {
            this.sports.push(element);
          }
        });

        // this.sports = sports;
        // this.sports.splice(0, 0, {name: ""});
        console.log(this.sports);
      })
  
      this.userService.getAllDisciplinesNames().subscribe((disc: Discipline[])=>{
        this.disciplines = disc;
      })
  
    }
  
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }
  
    searchForm: FormGroup = this.fb.group({
      sport: [''],
      discipline: [''],
      sex: ['']
    })
  
    onRegister() {
      if (!this.searchForm.valid) {
        return;
      }
  
      this.userService.searchAthletes(
        "",
        "",
        this.searchForm.value.sport,
        this.searchForm.value.discipline,
        this.searchForm.value.sex).subscribe((atls: Athlete[])=>{
          this.athletes = atls;
          this.dataSource.changaData(this.athletes);
          console.log(this.athletes);
        });
  
    }
  
    selectChangeHandlerSport(event: any){
      this.userService.getAllDisciplinesForSport(event).subscribe((disc: Discipline[])=>{
        this.disciplines = disc;
      })
    }
}
