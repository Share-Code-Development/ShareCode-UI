import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSnippetComponent } from '@app/modules/snippet/create-snippet/create-snippet.component';
import { CodeComponent } from './code.component';
import { ViewSnippetComponent } from './view-snippet/view-snippet.component';

const routes: Routes = [
  {
    path: '',
    component: CodeComponent,
    children: [
      {
        path: 'create',
        component: CreateSnippetComponent
      },
      {
        path: ':id',
        component: ViewSnippetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
