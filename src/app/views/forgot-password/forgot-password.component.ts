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

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }
  onSubmit(){}
  // Send() {
  //   this.router.navigate(['change-password'])
    
  // }
  goBack(){
    this.router.navigate(['/login'])
  }
}
