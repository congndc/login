import { AccountInformationComponent } from './account-information.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChangePassComponent } from './change-pass.component';
import { AccountRoutingModule } from './account-routing.module';



@NgModule({
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule
  ],
  declarations: [
    AccountInformationComponent,
    ChangePassComponent,
  ]
})
export class AccountModule { }
