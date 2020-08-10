import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../_services';
import { User } from '../../_models';
import { Router } from '@angular/router';
import { constants } from 'os';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../_services/safe-url.pipe.service';

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
  idUser: number;
  srcData: any;
  public img: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private safeUrlPipe: SafeUrlPipe
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  loadImage() {
    this.authenticationService.getPictureUser()
        .subscribe(
              (result) => {
                let url  = window.URL.createObjectURL(result);
                this.srcData = this.safeUrlPipe.transform(url);
              });
            }
  getAccountInformation() {
    this.authenticationService.getAccountInformation()
      .subscribe(
        (data) => {
          this.listInformationUserAccount = data.users[0];
          this.idUser = data.users[0]['id'];
        },
        error => {
          return false;
        });
        this.loadImage();
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
