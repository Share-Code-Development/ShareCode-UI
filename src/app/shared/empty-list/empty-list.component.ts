import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-list',
  templateUrl: './empty-list.component.html',
  styleUrls: ['./empty-list.component.scss']
})
export class EmptyListComponent {

  @Input() public message: string = 'No items found';
  @Input() public icon: string = 'data_object';

  constructor() { }

}
