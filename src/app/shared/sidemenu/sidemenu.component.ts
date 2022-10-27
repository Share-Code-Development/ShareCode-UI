import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSelectItem() {
    document.getElementById('sidemenu-drawer')?.click();
  }

}
