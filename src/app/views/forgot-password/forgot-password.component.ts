import { AlertService } from './../../_services/alert.service';
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
    private authenticationService: AuthenticationService,
    private alertService: AlertService
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
    this.alertService.clear();
    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }

     this.loading = true;
    this.authenticationService.send_mail(this.f.email.value)
    .pipe(first())
      // .subscribe(
      //   data => {
      //     this.alertService.success(data.message);
      //     this.loading = false;
      //   },
      .subscribe(
        (data:any) => {
          if(data.message == 'Truy cập tài khoản của bạn để cài đặt lại mật khẩu!')
          {
            this.alertService.success(data.message);
          } 
          else{
             this.alertService.error(data.message);
          }
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
      }
  goBack(){
    this.router.navigate(['/login'])
  }
}
