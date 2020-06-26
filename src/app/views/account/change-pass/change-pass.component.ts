import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
  // Change_pass: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  // convenience getter for easy access to form fields
  constructor(
    private formBuilder: FormBuilder,
    private Change_pass: FormGroup,
  ) {

  }

  get f() { return this.Change_pass.controls; }
  ngOnInit() {
    this.Change_pass = this.formBuilder.group({
      old_password: ['', [Validators.required, ]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confluent_password: ['', [Validators.required, Validators.minLength(6)]], 
    });
  }
  onSubmit() {
    
  }
 goBack(){

 }

}
