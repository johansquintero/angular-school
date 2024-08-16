import { Component, EventEmitter, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output("seach-value")
  searchValue = new EventEmitter<string>;

  public search(value:string,event:KeyboardEvent):void{
    if(event.key==='Enter'){
      this.searchValue.emit(value);
    }
  }
}
