import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from 'src/app/classes/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() pagination!: Pagination;
  @Output() onPaginationChange = new EventEmitter();
  @Input() perPageCounts = [5, 10, 15];
  @Input() defaultPerPage = 10;
  pages: number[] = [];

  ngOnInit(): void {
    this.pagination.pageSize = this.defaultPerPage;
  }

  nextPage(): void {
    this.pagination.currentPage++;
    this.emitPaginationChange();
  }

  prevPage(): void {
    this.pagination.currentPage--;
    this.emitPaginationChange();
  }

  onPerPageChange(): void {
    this.pagination.setLastPage();
    if (this.pagination.currentPage >= this.pages.length) {
      this.pagination.currentPage = this.pagination.lastPage;
    }
    this.emitPaginationChange();
  }

  emitPaginationChange(): void {
    this.onPaginationChange.emit(this.pagination);
  }

  range = (): number[] | [] => {
    this.pages = [];
    for (let i = 0; i < this.pagination.lastPage; ++i) {
      this.pages.push(i + 1);
    }
    return this.pages;
  };

  jumpTo(pageNo: number): void {
    this.pagination.currentPage = pageNo;
    this.emitPaginationChange();
  }
}
