import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { FormCompetitionTableDataSource, FormCompetitionTableItem } from './form-competition-table-datasource';

@Component({
  selector: 'app-form-competition-table',
  templateUrl: './form-competition-table.component.html',
  styleUrls: ['./form-competition-table.component.css']
})
export class FormCompetitionTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<FormCompetitionTableItem>;
  dataSource: FormCompetitionTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'sport','discipline', 'form'];

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new FormCompetitionTableDataSource(this.userService, this.router);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  formiraj(id){

    this.userService.setCompetitionAsFormed(id).subscribe((res: any) => {
      if(res.setCompetitionAsFormed != 'ok'){
        alert("Desila se glreska!");
      }else{
        window.location.reload();
      }
    });



  }
}