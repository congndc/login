import { Component } from '@angular/core';
import { AppConfiguration } from '../../config/app-configuration';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  items;
  checkoutForm;
  title = "User-Login";
  submitted: boolean;
  loginForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appConfig: AppConfiguration,
    private httpClient: HttpClient,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService) {
    this.checkoutForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
   
  }
  onSubmit(value: any) {
   
    console.log(value);
    this.submitted = true;
    if (this.loginForm.invalid) {

      return alert('Email hoặc mật khẩu không được để trống.');  
    }
    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    console.log(body)
    this.authService.login(body).subscribe((data: any) => {
      localStorage.setItem('key', JSON.stringify(data));
       this.router.navigate(['/dashboard']) 

     
    },error => {  
      console.log(error); 
      alert('Email hoặc mật khẩu không đúng.');  
    });
    // return this.loginService.login(this.appConfig.baseUrl).subscribe(
    //     data => {
    //       // this.lstUser = data;
    //     }
    //   );
    this.checkoutForm.reset();


  }
}
