import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Athlete } from '../model/athlete';
import { Discipline } from '../model/discipline';
import { Sport } from '../model/sport';
import { UserServiceService } from '../services/user-service.service';
import { AthletesTableDataSource, AthletesTableItem } from './athletes-table-datasource';

@Component({
  selector: 'app-athletes-table',
  templateUrl: './athletes-table.component.html',
  styleUrls: ['./athletes-table.component.css']
})
export class AthletesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AthletesTableItem>;
  dataSource: AthletesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstname', 'lastname', 'competition', 'sex', 'sport', 'discipline', 'zastava' ];

  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.dataSource = new AthletesTableDataSource(this.userService, this.router);

    this.userService.getAllSports().subscribe((sports: Sport[])=>{
      this.sports = sports;
      // this.sports.splice(0, 0, {name: ""});
      // console.log(this.sports);
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

  hide: boolean = false;

  sports: Sport[];
  disciplines: Discipline[];
  athletes: Athlete[];

  sexes: any [] = [
    {value: 'Muski'},
    {value: 'Zenski'}
  ];

  searchForm: FormGroup = this.fb.group({
    firstname: [''],
    lastname: [''],
    sport: [''],
    discipline: [''],
    sex: ['']
  })

  onRegister() {
    if (!this.searchForm.valid) {
      return;
    }

    this.userService.searchAthletes(
      this.searchForm.value.firstname,
      this.searchForm.value.lastname,
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