// Angular
import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// Theme Routing
import { ThemeRoutingModule } from './theme-routing.module';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    ThemeRoutingModule,
    HttpClientModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService
  ]
})
export class ThemeModule { }
