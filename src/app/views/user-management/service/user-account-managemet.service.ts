import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccountManagementService {

  constructor(private http: HttpClient) { }
// Tìm kiếm cấu hình nhóm người dùng theo mã nhóm và tên nhóm
searchByKeyWord(search: any) {
  return this.http
    // .get(`${environment.apiUrl}/group_user_configuration/list?search=/${search}')
    .post<any>(`${environment.apiUrl}/group_user_configuration/list?search=${search}`, null)
    .pipe(map(res => {
      return res;
    }));
}

}
