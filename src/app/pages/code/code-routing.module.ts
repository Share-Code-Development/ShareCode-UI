import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSnippetComponent } from '@app/modules/snippet/create-snippet/create-snippet.component';
import { CodeComponent } from './code.component';

const routes: Routes = [
  {
    path: '',
    component: CodeComponent,
    children: [
      {
        path: 'create',
        component: CreateSnippetComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRoutingModule { }
