import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() searchTextEvent = new EventEmitter<string>();

  constructor() {}

  emitSearchText(value: string): void {
    this.searchTextEvent.emit(value);
  }
}
