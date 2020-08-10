import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SemesterConfigurationComponent } from './semester-configuration/semester-configuration.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Thông tin cấu hình'
    },
    children: [
      {
        path: '',
        redirectTo: 'configuration-information'
      },
      {
        path: 'semester-configuration',
        component: SemesterConfigurationComponent,
        data: {
          title: 'Cấu hình học kỳ'
        }
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguationInformationRoutingModule {}
