import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserGroupConfigurationComponent } from './User-group-configuration/User-group-configuration.component';


// Angular

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
    Ng2SmartTableModule
  ],
  declarations: [
      UserGroupConfigurationComponent
  ]
})
export class UserManagementModule { }
