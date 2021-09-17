import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Country } from '../model/country';
import { Router } from '@angular/router';
import { Competition } from '../model/competition';
import { UserServiceService } from '../services/user-service.service';

// TODO: Replace this with your own data model type
export interface CountryTableItem extends Country{}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: CountryTableItem[] = [];

/**
 * Data source for the CountryTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CountryTableDataSource extends DataSource<CountryTableItem> {
  data: CountryTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private userService: UserServiceService, private router: Router) {
    super();

    this.userService.getAllCountries().subscribe((coutries : Country[]) => {
      this.data = coutries;
      console.log(this.data)
    })

  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<CountryTableItem[]> {
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
  private getPagedData(data: CountryTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: CountryTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'name': return compare(a.brojSportista, b.brojSportista, isAsc);
        case 'name': return compare(a.brojZlatnihMedalja, b.brojZlatnihMedalja, isAsc);
        case 'name': return compare(a.brojSrebrnihMedalja, b.brojSrebrnihMedalja, isAsc);
        case 'name': return compare(a.brojBronzanihMedalja, b.brojBronzanihMedalja, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
