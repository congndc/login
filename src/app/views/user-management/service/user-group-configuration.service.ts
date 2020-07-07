import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGroupConfigurationService {

  constructor(private http: HttpClient) { }

  // Lấy danh sách khối
  listDmKhoi() {
    return this.http.get<any>(`${environment.apiUrl}/grade/list`)
      .pipe(map(res => {
        return res;
      }));
  }

  // Lấy danh sách lớp
  listDmLop() {
    return this.http.get<any>(`${environment.apiUrl}/class/list`)
      .pipe(map(res => {
        return res;
      }));
  }

  // Lấy danh sách cấu hình nhóm người dùng
  listUserGroupConfig() {
    return this.http.get<any>(`${environment.apiUrl}/group_user_configuration/list`)
      .pipe(map(res => {
        return res;
      }));
  }

  // Tải file mẫu
  public downloadSampleFile(id: string): void {
    this.http.get(`${environment.apiUrl}/group_user_configuration/download_sample_file_excel/${id}`,
      { responseType: 'blob' }).subscribe(res => {
        window.open(window.URL.createObjectURL(res));
      });
  }

  // Import excel cấu hình nhóm người dùng
  importFile(formData: FormData) {
    let headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const httpOptions = { headers: headers };

    return this.http.post<any>(`${environment.apiUrl}/group_user_configuration/import`, formData, httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  // Export file Excel cấu hình nhóm người dùng
  public exportFile() {

    this.http.get(`${environment.apiUrl}/group_user_configuration/list?export_files`,
      { responseType: 'blob' }).subscribe(res => {
        window.open(window.URL.createObjectURL(res));
      });
  }

  // Thêm mới cấu hình nhóm người dùng
  addUserGroupConfig(code: string, name: string, grade_id: number, class_id: number, description: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/group_user_configuration/create`, { code, name, grade_id, class_id, description })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  // GetById cấu hình nhóm người dùng, sử dụng cho form cập nhật cấu hình nhóm người dùng
  getByIdUserGroupConfig(id: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/group_user_configuration/show/${id}`)
      .pipe(map(res => {
        return res;
      }));
  }

  // Cập nhật cấu hình nhóm người dùng
  updateUserGroupConfig(id: number, code: string, name: string, grade_id: number, class_id: number, description: string) {
    return this.http
      .put<any>(`${environment.apiUrl}/group_user_configuration/update/${id}`, { code, name, grade_id, class_id, description })
      .pipe(map(res => {
        return res;
      }));
  }

  // Xóa cấu hình nhóm người dùng
  deleteUserGroupConfig(id: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/group_user_configuration/delete/${id}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
