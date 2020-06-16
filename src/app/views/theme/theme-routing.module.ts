import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý người dùng'
    },
    children: [
      // {
      //   path: '',
      //   redirectTo: 'colors'
      // },
      // {
      //   path: 'colors',
      //   component: ColorsComponent,
      //   data: {
      //     title: 'Colors'
      //   }
      // },
      // {
      //   path: 'typography',
      //   component: TypographyComponent,
      //   data: {
      //     title: 'Typography'
      //   }
      // },
      {
        path: 'user',
        component: UserComponent,
        data: {
          title: 'User'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
