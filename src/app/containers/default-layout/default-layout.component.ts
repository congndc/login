import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  env = environment;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
