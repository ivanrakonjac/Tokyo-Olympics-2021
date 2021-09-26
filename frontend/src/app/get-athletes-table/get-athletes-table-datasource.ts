import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Athlete } from '../model/athlete';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

// TODO: Replace this with your own data model type
export interface GetAthletesTableItem extends Athlete{}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: GetAthletesTableItem[] = [
  {"_id" : 1, "firstname" : "/", "lastname": "/", "competition": "/", "sex": "/", "sport": "/", "discipline":"/", "country": "/", "team":"/"}
];

/**
 * Data source for the GetAthletesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GetAthletesTableDataSource extends DataSource<GetAthletesTableItem> {
  data: GetAthletesTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private userService: UserServiceService, private router: Router) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<GetAthletesTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: GetAthletesTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: GetAthletesTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstname': return compare(a.firstname, b.firstname, isAsc);
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'competition': return compare(a.competition, b.competition, isAsc);
        case 'sex': return compare(a.sex, b.sex, isAsc);
        case 'sport': return compare(a.sport, b.sport, isAsc);
        case 'discipline': return compare(a.discipline, b.discipline, isAsc);
        default: return 0;
      }
    });
  }

  public changaData(data: Athlete[]){
    this.data = data;
    this.paginator._changePageSize(5); 
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
