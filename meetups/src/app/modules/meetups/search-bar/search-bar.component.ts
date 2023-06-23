import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() public searchInput = '';
  @Output() public searchEvent = new EventEmitter();
  
  search(searchInput: string) {
    this.searchEvent.emit(searchInput);
  }
}
