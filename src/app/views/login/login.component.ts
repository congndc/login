import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_services/alert.service';
import { NotificationService } from '../../_services/notification.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  // convenience getter for easy access to form fields
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifyService: NotificationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  //   showToasterSuccess(){
  //     this.notifyService.showSuccess("Data shown successfully !!", "ItSolutionStuff.com")
  // }

  // showToasterError(){
  //     this.notifyService.showError("Something is wrong", "ItSolutionStuff.com")
  // }

  // showToasterInfo(){
  //     this.notifyService.showInfo("This is info", "ItSolutionStuff.com")
  // }

  // showToasterWarning(){
  //     this.notifyService.showWarning("This is warning", "ItSolutionStuff.com")
  // }
  get f() { return this.loginForm.controls; }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember_me: [false]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value, this.f.remember_me.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          this.notifyService.showError(error, 'Thông báo lỗi');
          this.loading = false;
        });
  }
}

