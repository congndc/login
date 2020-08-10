import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserGroupConfigurationService {

  constructor(private http: HttpClient) { }

  // Lấy danh sách khối
  listDmKhoi() {
    return this.http.post<any>(`${environment.apiUrl}/grade/dropdownlist`, null)
      .pipe(map(res => {
        return res;
      }));
  }

  // Lấy danh sách lớp
  listDmLop(grades: any) {
    return this.http.post<any>(`${environment.apiUrl}/class/dropdownlist`, { grades })
      .pipe(map(res => {
        return res;
      }));
  }

  // Lấy danh sách cấu hình nhóm người sử dụng
  listUserGroupConfig() {
    return this.http.post<any>(`${environment.apiUrl}/group_user_configuration/list`, null)
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

  // Import excel cấu hình nhóm người sử dụng
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

  // Export file Excel cấu hình nhóm người sử dụng
  public exportFile(search: any, classes: [], grades: [], status: any) {

    if (search) {
      var export_file = 'export_files';
      this.http.post(`${environment.apiUrl}/group_user_configuration/list?export_files&search=${search}`, `export_file`,
        // { 'export_excels'},
        { responseType: 'blob' as 'json' })
        .subscribe(res => {
          window.open(window.URL.createObjectURL(res));
        });
    } else {
      this.http.post(`${environment.apiUrl}/group_user_configuration/list?export_files`,
        { export_file, classes, grades, status },
        { responseType: 'blob' as 'json' })
        .subscribe(res => {
          window.open(window.URL.createObjectURL(res));
        });
    }
  }

  // Thêm mới cấu hình nhóm người sử dụng
  addUserGroupConfig(code: string, name: string, grade_id: any, class_id: any, description: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/group_user_configuration/create`, { code, name, grade_id, class_id, description })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  // GetById cấu hình nhóm người sử dụng, sử dụng cho form cập nhật cấu hình nhóm người sử dụng
  getByIdUserGroupConfig(id: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/group_user_configuration/show/${id}`)
      .pipe(map(res => {
        return res;
      }));
  }

  // Cập nhật cấu hình nhóm người sử dụng
  updateUserGroupConfig(id: number, code: string, name: string, grade_id: any, class_id: any, status: number, description: string) {
    return this.http
      .put<any>(`${environment.apiUrl}/group_user_configuration/update/${id}`, { code, name, grade_id, class_id, status, description })
      .pipe(map(res => {
        return res;
      }));
  }

  // Xóa cấu hình nhóm người sử dụng
  deleteUserGroupConfig(id: number) {
    return this.http
      .delete<any>(`${environment.apiUrl}/group_user_configuration/delete/${id}`)
      .pipe(map(res => {
        return res;
      }));
  }

  // Tìm kiếm cấu hình nhóm người sử dụng theo mã nhóm và tên nhóm
  searchByKeyWord(search: any) {
    return this.http
      // .get(`${environment.apiUrl}/group_user_configuration/list?search=/${search}')
      .post<any>(`${environment.apiUrl}/group_user_configuration/list`,{search})
      .pipe(map(res => {
        return res;
      }));
  }

  searchByInput(grades: any, classes: any, status) {
    return this.http.post(`${environment.apiUrl}/group_user_configuration/list`, { grades, classes, status })
      .pipe(map(res => {
        return res;
      }));
  }
}
