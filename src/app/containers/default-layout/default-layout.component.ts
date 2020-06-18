import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../_services';
import { User } from '../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  env = environment;
  currentUser: User;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
