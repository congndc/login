import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ConfiguationInformationRoutingModule } from './configuration-information-routing.module';
import { SemesterConfigurationComponent } from './semester-configuration/semester-configuration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ConfiguationInformationRoutingModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDropdownModule.forRoot( ),  
    NgxIntlTelInputModule,
  ],

  declarations: [
    SemesterConfigurationComponent
  ],
  exports: [
  ], providers: [

  ]
})
export class ConfiguationInformationModule { }
