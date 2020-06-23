import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  message_success: string;
  message_error: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      
    });
    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl']  || '/';
  }

 
  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

     this.loading = true;
    this.authenticationService.send_mail(this.f.email.value)
      .subscribe(
        (data:any) => {
          if(data.message == 'Truy cập tài khoản của bạn để cài đặt lại mật khẩu!')
          {
            this.message_success = "Thông tin đã được gửi. Vui lòng kiểm tra Email!";
            this.message_error = null;
          }
          else{
            this.message_error = "Email không đúng hoặc không tồn tại. Vui lòng kiểm tra lại!";
            this.message_success = null;
          }
          
          this.loading = false;
        },
        error => {
          this.message_error = error;
          this.loading = false;
        });
      }

  goBack(){
    this.router.navigate(['/login'])
  }
}
