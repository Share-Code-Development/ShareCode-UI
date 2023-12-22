import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfigService } from 'src/app/services/config.service';
import { CreateSnippetComponent } from '../../snippet/create-snippet/create-snippet.component';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  constructor(
    public dialogService: DialogService,
    private config: ConfigService
    ) { }

  ngOnInit(): void {
  }

  onSelectItem() {
    // Closing the sidebar
    document.getElementById('sidemenu-drawer')?.click();
  }

  openCreate() {
    this.dialogService.open(CreateSnippetComponent, {
      header: 'Create',
      width: '70%',
      contentStyle: this.config.defaultDialogStyles,
      showHeader: false,
      baseZIndex: 10000,
    });
  }

}
