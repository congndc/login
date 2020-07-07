import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";
import { UserGroupConfigurationService } from '../service/user-group-configuration.service';
import { NotificationService } from '../../../_services/notification.service';
import { UserGroupConfiguration } from '../../../_models/user-group-configuration';
import { Observable } from 'rxjs';



@Component({
  selector: "app-user-group-configuration",
  templateUrl: "./user-group-configuration.component.html",
  styleUrls: ["./user-group-configuration.component.scss"],
})
export class UserGroupConfigurationComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  userGroupConfiguration: Observable<UserGroupConfiguration>;
  form: FormGroup;

  // Pagination parameters.
  p: Number = 1;
  count: Number = 5;

  dmKhoiData: any;
  dmLopData: any;
  userConfigData: any;
  idGrade: number;
  idClass: number;
  idUpdate: number;
  userConfigGetById: any; // GetById cấu hình người dùng fill lên form update

  constructor(
    private fb: FormBuilder,
    private userGroupConfigurationService: UserGroupConfigurationService,
    private notifyService: NotificationService
  ) {
    // console.log('constructor: logging starting...');
    // this.interval = setInterval(() => {
    //   console.log(this.count++);
    // }, 1000);
  }

  // Lấy id dropdown selected Grade
  perPageSelected(id: number) {
    this.count = id;
  }
  // Lấy id dropdown selected Grade
  gradeIdSelected(id: number) {
    this.idGrade = id;
  }
  // Lấy id dropdown selected Class
  classIdSelected(id: number) {
    this.idClass = id;
  }
  // Lấy mã khối cấu hình nhóm người dùng
  get code(): any {
    return this.form.get('code');
  }
  // Lấy tên lớp cấu hình nhóm người dùng
  get name(): any {
    return this.form.get('name');
  }
  // Lấy id khối cấu hình nhóm người dùng
  get grade_id(): any {
    return this.form.get('grade_id');
  }
  // Lấy id  lớp cấu hình nhóm người dùng
  get class_id(): any {
    return this.form.get('class_id');
  }
  // Lấy mô tả cấu hình nhóm người dùng
  get description(): any {
    return this.form.get('description');
  }

  ngOnInit() {
    // Validate form
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(2)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      grade_id: new FormControl('', [Validators.required]),
      class_id: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    // Get danh mục khối
    this.userGroupConfigurationService.listDmKhoi()
      .subscribe(
        (data) => {
          this.dmKhoiData = data.grades;
        },
        error => {
          return false;
        });

    // Get danh mục lớp
    this.userGroupConfigurationService.listDmLop()
      .subscribe(
        (data) => {
          this.dmLopData = data.classes;
        },
        error => {
          return false;
        });

    // Get dữ liệu cấu hình nhóm người sử dụng
    this.userGroupConfigurationService.listUserGroupConfig()
      .subscribe(
        (data) => {
          this.userConfigData = data.group_user_configuration;
        },
        error => {
          return false;
        });
  }
  onSubmit() {

  }

  // Thêm mới cấu hình nhóm người sử dụng
  addUserGroupConfig() {
    this.userGroupConfigurationService.addUserGroupConfig(
      this.code.value,
      this.name.value,
      this.idGrade,
      this.idClass,
      this.description.value,
    ).subscribe(
      result => {
        this.notifyService.showSuccess('Dữ liệu đã được thêm thành công', 'Thông báo');
        this.ngOnDestroy();
      },
      error => {
        Object.keys(error).forEach(function (key) {
          this.notifyService.showError(error[key], 'Thông báo lỗi');
        });
      });
  }

  // Cập nhật cấu hình nhóm người sử dụng
  updateUserGroupConfig(id: number) {
    if (this.idGrade) {
      console.log(this.idGrade);
    } else {
      this.idGrade = this.userConfigGetById.grade_id
    }
    if (this.idClass) {
      console.log(this.idClass);
    } else {
      this.idClass = this.userConfigGetById.class_id
    }

    // Call API cập nhật cấu hình nhóm người sử dụng
    this.userGroupConfigurationService.updateUserGroupConfig(
      id,
      this.code.value,
      this.name.value,
      this.idGrade,
      this.idClass,
      this.description.value
    ).subscribe(
      result => {
        this.notifyService.showSuccess('Dữ liệu đã được cập nhật thành công', 'Thông báo');
        this.ngOnDestroy();
      },
      error => {
        Object.keys(error).forEach(function (key) {
          alert(error);
          this.notifyService.showError(error[key], 'Thông báo lỗi');
        });
      });
  }

  // Reset form
  resetUserGroupConfigForm() {
    this.form.reset();
  }

  // GetById cấu hình nhóm người sử dụng
  getByIdUserGroupConfig(id: number) {
    this.userGroupConfigurationService.getByIdUserGroupConfig(id)
      .subscribe(
        result => {
          this.notifyService.showSuccess(result.message, 'Thành công');
          this.userConfigGetById = result;
          this.form.patchValue(result);
        },
        error => {
          Object.keys(error).forEach(function (key) {
            this.notifyService.showError(error[key], 'Thông báo lỗi');
          });
        });
  }

  // Xóa cấu hình nhóm người sử dụng
  deleteUserGroupConfig(id: number) {
    let isDelete = confirm('Bạn chắc chắn muốn xóa dữ liệu này?');
    if (isDelete) {
      this.userGroupConfigurationService.deleteUserGroupConfig(id)
        .subscribe(
          result => {
            this.notifyService.showSuccess('Dữ liệu đã được xóa thành công!', 'Thông báo');
            this.ngOnDestroy();
          },
          error => {
            this.notifyService.showError(error, 'Thông báo lỗi');
          });
    }
  }

  // Tải file mẫu cho chức năng cấu hình nhóm người sử dụng
  downloadSampleFile() {
    this.userGroupConfigurationService.downloadSampleFile('2');
  }

  // Import dữ liệu cấu hình nhóm người sử dụng
  importFile() {
    var formData = new FormData();
    formData.append('import_excel', this.fileInput.nativeElement.files[0])
    this.userGroupConfigurationService.importFile(formData)
      .subscribe(
        result => {
          this.notifyService.showSuccess(result.message, 'Thành công');
          this.ngOnDestroy();
        },
        error => {
          if (error.messages.code) {
            this.notifyService.showError(error.messages["code"] + '-' + error.position, 'Thông báo lỗi');
          } else if (error.messages.import_excel) {
            this.notifyService.showError(error.messages["import_excel"], 'Thông báo lỗi');
          }
          else {
            this.notifyService.showError(error + '\n \ ', 'Thông báo lỗi');
          }
        });
  }

  // Export dữ liệu cấu hình người sử dụng ra file Excel
  exportFile() {
    console.log(this.code.value);
    console.log(this.name.value);
    this.userGroupConfigurationService.exportFile();
  }
  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
}
