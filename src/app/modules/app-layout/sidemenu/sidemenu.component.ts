import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfigService } from 'src/app/services/config.service';
import { CreateSnippetComponent } from '../../snippet/create-snippet/create-snippet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {

  constructor(
    public dialogService: DialogService,
    private config: ConfigService,
    private router: Router
  ) { }

  onSelectItem() {
    // Closing the sidebar
    document.getElementById('sidemenu-drawer')?.click();
  }

  public isActiveRoute(route: string) {
    return this.router.isActive(route, {
      paths: 'subset',
      fragment: 'exact',
      matrixParams: 'exact',
      queryParams: 'subset'
    });
  }

  openCreate() {
    if (this.isActiveRoute('/code/create')) {
      return;
    }
    this.dialogService.open(CreateSnippetComponent, {
      header: 'Create',
      width: '70%',
      contentStyle: this.config.defaultDialogStyles,
      showHeader: false,
      baseZIndex: 10000,
      data: {
        popupMode: true
      }
    });
  }

}
