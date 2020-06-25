import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInformationComponent } from './account-information.component';
import { ChangePassComponent } from './change-pass.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Account'
    },
    children: [
      {
        path: '',
        redirectTo: 'account-information'
      },
      {
        path: 'account-information',
        component: AccountInformationComponent,
        data: {
          title: 'account-information'
        }
      },
      {
        path: 'change-pass',
        component: ChangePassComponent,
        data: {
          title: 'change-pass'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
