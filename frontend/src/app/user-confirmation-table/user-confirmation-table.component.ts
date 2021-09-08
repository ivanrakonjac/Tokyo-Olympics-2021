import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { UserConfirmationTableDataSource, UserConfirmationTableItem } from './user-confirmation-table-datasource';

@Component({
  selector: 'app-user-confirmation-table',
  templateUrl: './user-confirmation-table.component.html',
  styleUrls: ['./user-confirmation-table.component.css']
})
export class UserConfirmationTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<UserConfirmationTableItem>;
  dataSource: UserConfirmationTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'username', 'firstname', 'lastname', 'country', 'type', 'confirm', 'deny'];

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new UserConfirmationTableDataSource(this.userService, this.router);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  confirm(id){

    this.userService.setUserStatusAsConfirmed(id).subscribe((res: any) => {
      if(res.setUserStatusAsConfirmed != 'ok'){
        alert("Desila se glreska!");
      }else{
        window.location.reload();
      }
    });
  }

  deny(id){

    this.userService.deleteUser(id).subscribe((res: any) => {
      if(res.deleteUser != 'ok'){
        alert("Desila se glreska!");
      }else{
        window.location.reload();
      }
    });
  }
}
