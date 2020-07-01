import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../_models';
import { AuthenticationService } from '../../../_services';
import { NotificationService } from '../../../_services/notification.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  public currentUser: Observable<User>;
  changePass: FormGroup;
  loading = false;
  submitted = false;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected authenticationService: AuthenticationService,
    private notifyService: NotificationService
  ) { }

  get f() { return this.changePass.controls; }
  ngOnInit() {
    const tokenValue = localStorage.getItem('currentUser');
    this.email = JSON.parse(tokenValue).email;
    this.changePass = this.formBuilder.group({
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.changePass.invalid) {
      return;
    }
    if (this.f.new_password.value !== this.f.confirm_password.value) {
      this.notifyService.showWarning('Mật khẩu mới không trùng khớp', 'Thông báo!');
      return;
    }
    this.loading = true;
    this.authenticationService.user_update(this.email, this.f.old_password.value, this.f.new_password.value)
      .subscribe(
        (data: any) => {
          this.notifyService.showSuccess(data.message, 'Thành công!');
          this.loading = false;
        },
        error => {
          this.notifyService.showError(error, 'Thông báo lỗi');
          this.loading = false;
        });
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
