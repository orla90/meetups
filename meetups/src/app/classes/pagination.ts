export class Pagination {
  currentPage: number = 1;
  pageSize: number = 10;
  lastPage: number = 1;
  private _totalCount: number = 0;
  
  constructor() {
    this.reset();
  }
  
  get totalCount(): number {
    return this._totalCount;
  }
  
  set totalCount(value: number) {
    this._totalCount = value;
    this.setLastPage();
  }
  
  public setLastPage(): void {
    this.lastPage = Math.floor(this.totalCount / this.pageSize) || 1;
  }
  
  public reset(): void {
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalCount = 0;
  }
}
