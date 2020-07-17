import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGroupConfigurationComponent } from './User-group-configuration/User-group-configuration.component';
import { UserAccountManagementComponent } from './user-account-management/user-account-management.component';


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
      {
        path: 'user-account-management',
        component: UserAccountManagementComponent,
        data: {
          title: 'Quản lý tài khoản người dùng'
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
