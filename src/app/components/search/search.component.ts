import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();

  constructor(
    public _carts: CartsService,
  ) {}

  ngOnInit(): void {}

  public onSearch(searchTerm: string): void {
    this.searched.emit(searchTerm);
  }
}
