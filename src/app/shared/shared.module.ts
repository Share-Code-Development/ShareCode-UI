import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FocusTrapModule } from 'primeng/focustrap';
import {
  matAddRound, matDeleteRound, matContentCopyRound,
  matOpenInFullRound, matDoneRound,
  matVisibilityRound, matDataObjectRound, matFavoriteRound,
  matInterestsRound, matIntegrationInstructionsRound
} from '@ng-icons/material-icons/round';
import { NgIconsModule } from '@ng-icons/core';
import { CodeItemComponent } from './code-item/code-item.component';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreateSnippetComponent } from './create-snippet/create-snippet.component';
import { RouterModule } from '@angular/router';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { CodeHighlighterModule } from '../modules/code-highlighter/code-highlighter.module';
import { ChipModule } from 'primeng/chip';
import { ValidityColorsModule } from '../modules/validity-colors.module';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { NgPipesModule } from 'ngx-pipes';



const commons: any[] = [
  NavbarComponent,
  SidemenuComponent,
  CodeItemComponent,
  CreateSnippetComponent,
  ErrorMessageComponent,
  EmptyListComponent
]

@NgModule({
  declarations: commons,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      matAddRound, matDeleteRound, matContentCopyRound,
      matOpenInFullRound, matDoneRound, matVisibilityRound, matDataObjectRound,
      matFavoriteRound, matInterestsRound, matIntegrationInstructionsRound
    }),
    TooltipModule,
    DynamicDialogModule,
    FocusTrapModule,
    RouterModule,
    ReactiveFormsModule,
    CodeHighlighterModule,
    ChipModule,
    ValidityColorsModule,
    NgPipesModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    NgPipesModule,
    ...commons
  ],
})
export class SharedModule { }
