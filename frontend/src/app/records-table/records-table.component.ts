import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { RecordsTableDataSource, RecordsTableItem } from './records-table-datasource';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<RecordsTableItem>;
  dataSource: RecordsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','disciplina','takmicar', 'nacionalnost', 'godina', 'grad', 'drzava', 'rekord'];

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new RecordsTableDataSource(this.userService, this.router);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
