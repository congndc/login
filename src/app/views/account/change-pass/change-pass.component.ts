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
      old_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.changePass.invalid) {
      return;
    }
    if (this.f.new_password.value !== this.f.confirm_password.value) {
      this.notifyService.showWarning('Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp, vui lòng kiểm tra lại!', 'Cảnh báo!');
      return;
    }
    this.loading = true;
    this.authenticationService.user_update(this.email, this.f.old_password.value, this.f.new_password.value)
      .subscribe(
        (data: any) => {
          this.notifyService.showSuccess(data.message, 'Thành công!');
          this.router.navigate(['/dashboard']);
        },
        error => {
          if (error.old_password) {
            this.notifyService.showError(error.old_password, 'Thông báo lỗi');
          } else if (error.new_password) {
            this.notifyService.showError(error.new_password, 'Thông báo lỗi');
          } else {
            this.notifyService.showError(error, 'Thông báo lỗi');
          }
          this.loading = false;
        });
  }
  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
