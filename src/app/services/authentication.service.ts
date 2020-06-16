import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { map } from "rxjs/operators";

import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.appRoot;

  constructor(
    private http: HttpClient,
  ) { }



  login(body) {
    return this.http
      .post<any>(this.baseUrl + "login", body)
      .pipe(
        map(data => {
          if (data.success) {
            
            localStorage.setItem("IsLogin", "true")
          } 
          return data
        })
      )
  }



}
