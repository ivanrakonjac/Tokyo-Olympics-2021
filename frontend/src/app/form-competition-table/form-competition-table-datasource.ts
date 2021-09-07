import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
import { Competition } from '../model/competition';

// TODO: Replace this with your own data model type
export interface FormCompetitionTableItem extends Competition{}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: FormCompetitionTableItem[] = [];

/**
 * Data source for the FormCompetitionTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FormCompetitionTableDataSource extends DataSource<FormCompetitionTableItem> {
  data: FormCompetitionTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private userService: UserServiceService, private router: Router) {
    super();

    this.userService.getAllUnformedCompetitions().subscribe((comps : Competition[]) => {
      this.data = comps;
      console.log(this.data)
    })

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FormCompetitionTableItem[]> {
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
  private getPagedData(data: FormCompetitionTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: FormCompetitionTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.competitionName, b.competitionName, isAsc);
        case 'sport': return compare(a.sport, b.sport, isAsc);
        case 'discipline': return compare(a.discipline, b.discipline, isAsc);
        // case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}