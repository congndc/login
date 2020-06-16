import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AppConfiguration } from '../../config/app-configuration';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  title = 'file-configuration-example';
  lstUser: User[];
  constructor(private appConfig: AppConfiguration, private httpClient: HttpClient, private userService: UserService) {}
    ngOnInit(){
      this.title = this.appConfig.title;
      console.log(this.appConfig.title);
      console.log(this.appConfig.baseUrl);
      // return this.httpClient.get(this.appConfig.baseUrl).subscribe(
      //     data => {
      //       this.lstUser = data;
      //     }
      //   );
      this.userService.getUsers(this.appConfig.baseUrl).subscribe(
        data => {
          this.lstUser = data;
        }
      )
    }
  }
