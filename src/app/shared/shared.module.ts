import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { HighlightModule } from 'ngx-highlightjs';

import {
  matAddRound, matDeleteRound, matContentCopyRound,
  matOpenInFullRound, matDoneRound,
  matVisibilityRound, matDataObjectRound, matFavoriteRound, matInterestsRound, matIntegrationInstructionsRound
} from '@ng-icons/material-icons/round';
import { NgIconsModule } from '@ng-icons/core';
import { CodeItemComponent } from './code-item/code-item.component';
import { TooltipModule } from 'primeng/tooltip';


const commons: any[] = [
  NavbarComponent,
  SidemenuComponent,
  CodeItemComponent
]

@NgModule({
  declarations: commons,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      matAddRound, matDeleteRound, matContentCopyRound,
      matOpenInFullRound, matDoneRound, matVisibilityRound, matDataObjectRound, matFavoriteRound, matInterestsRound, matIntegrationInstructionsRound
    }),
    TooltipModule,
    HighlightModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ...commons
  ],
  providers: [
  ]
})
export class SharedModule { }
