import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ValidityColorsModule } from '../modules/validity-colors.module';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { NgPipesModule } from 'ngx-pipes';



const commons: any[] = [
  ErrorMessageComponent,
  EmptyListComponent
]

@NgModule({
  declarations: commons,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
    RouterModule,
    ValidityColorsModule,
    NgPipesModule,
    DynamicDialogModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    NgPipesModule,
    TooltipModule,
    ...commons
  ],
})
export class SharedModule { }
