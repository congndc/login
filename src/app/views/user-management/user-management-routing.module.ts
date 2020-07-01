import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupConfigurationComponent } from './User-group-configuration/User-group-configuration.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý người sử dụng'
    },
    children: [
      {
        path: '',
        redirectTo: 'user-management'
      },
      {
        path: 'user-management',
        component: UserGroupConfigurationComponent,
        data: {
          title: 'Cấu hình nhóm người sử dụng'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule {}
