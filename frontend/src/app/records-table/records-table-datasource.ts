import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Router } from '@angular/router';
import { Country } from '../model/country';
import { Record } from '../model/record';
import { UserServiceService } from '../services/user-service.service';

// TODO: Replace this with your own data model type
export interface RecordsTableItem extends Record{}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: RecordsTableItem[] = [
  {_id: 1, discipline: '/', athlete: '/', year: "/" , city: '/', country: '/', nationality: '/', record: "/" }
];

/**
 * Data source for the RecordsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RecordsTableDataSource extends DataSource<RecordsTableItem> {
  data: RecordsTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private userService: UserServiceService, private router: Router) {
    super();

    this.userService.getAllRecords().subscribe((rec : Record[]) => {
      this.data = rec;
      console.log(this.data);
      this.paginator._changePageSize(5); 
    })

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RecordsTableItem[]> {
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
  private getPagedData(data: RecordsTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RecordsTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'discipline': return compare(a.discipline, b.discipline, isAsc);
        case 'athlete': return compare(a.athlete, b.athlete, isAsc);
        case 'year': return compare(a.year, b.year, isAsc);
        case 'city': return compare(a.city, b.city, isAsc);
        case 'country': return compare(a.country, b.country, isAsc);
        case 'nationality': return compare(a.nationality, b.nationality, isAsc);
        case 'record': return compare(a.record, b.record, isAsc);
        case 'id': return compare(+a._id, +b._id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}