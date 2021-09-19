import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { CountryTableDataSource, CountryTableItem } from './country-table-datasource';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CountryTableItem>;
  dataSource: CountryTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'brojSportista','brojZlatnihMedalja', 'brojSrebrnihMedalja', 'brojBronzanihMedalja', 'zastava'];

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new CountryTableDataSource(this.userService, this.router);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
