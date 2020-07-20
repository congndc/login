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
    .post<any>(`${environment.apiUrl}/group_user_configuration/list?search=${search}`, null)
    .pipe(map(res => {
      return res;
    }));
}
deleteUserAccount(id: number) {
  return this.http
 
}
//list danh sách dropdown
searchByInput(selectObject: any, GroupSelectObject: any, status ){
  return this.http
      .get<any>(`${environment.apiUrl}/user/list?object=${selectObject}&?groups=${GroupSelectObject}`)
      .pipe(map(res => {
        return res;
      }));
}
//list danh sách dropdown

//list danh sách nhóm
listNhom() {
  return this.http.get<any>(`${environment.apiUrl}/group/dropdownlist`)
    .pipe(map(res => {
      return res;
    }));
}
//list danh sách nhóm
}
