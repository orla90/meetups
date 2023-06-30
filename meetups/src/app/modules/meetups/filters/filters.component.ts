import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent {
  @Output() public filterEvent = new EventEmitter();

  filtersForm = new FormGroup({
    timeliness: new FormControl('all'),
  });

  onChange(e: Event) {
    this.filterEvent.emit((e.target as HTMLSelectElement).value);
  }
}
