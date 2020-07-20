import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../_services';
import { User } from '../../_models';
import { Router } from '@angular/router';
import { constants } from 'os';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  env = environment;
  currentUser: User;
  listInformationUserAccount: [];
  groupCode: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  getAccountInformation() {
    this.authenticationService.getAccountInformation()
      .subscribe(
        (data) => {
          var groupCodes = '';
          this.listInformationUserAccount = data.account[0];
          for (let i = 0; i < data.groups.length; i++) {
            groupCodes += data.groups[i]['group_name'] + ', ';
        }
        this.groupCode = groupCodes.slice(0, -2);
        },
        error => {
          return false;
        });
  }
  changePassword(){
    this.router.navigate(['/account/change-pass']);
    // redirectTo: 'account-information'
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
