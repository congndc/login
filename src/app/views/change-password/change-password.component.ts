import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services';
import { first, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changeForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  message_success: string;
  message_error: string;
  token: string;

  constructor(  
    protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected authenticationService: AuthenticationService,
    )
     {
       if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
  }

    

    ngOnInit() {

      this.token = this.route.snapshot.queryParams.token;


      this.changeForm = this.formBuilder.group({
        newpassword: ['', [Validators.required,Validators.minLength(6)]],
        confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
    get f() { return this.changeForm.controls; }

    

  onSubmit() {this.submitted = true;

    // stop here if form is invalid
    if (this.changeForm.invalid) {
      return;
    }
    if(this.f.newpassword.value !=this.f.confirmpassword.value)
    {
            this.message_error = "Mật khẩu không đúng . Vui lòng kiểm tra lại!";;
            this.message_success = null;
            return;
          
        }
          

    this.loading = true;
    this.authenticationService.change_password(this.token, this.f.newpassword.value)
      .subscribe(
        (data:any) => {
          this.message_success = data.messages;
          this.loading = false;
          if(this.router.navigate(['/login'])){
            alert("Bạn đã thay đổi mật khẩu thành công! Nhấn Ok để quay về trang đăng nhập")
          }
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
