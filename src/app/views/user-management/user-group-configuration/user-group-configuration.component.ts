import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from "@angular/forms";
import { UserGroupConfigurationService } from '../service/user-group-configuration.service';
import { NotificationService } from '../../../_services/notification.service';
import { UserGroupConfiguration } from '../../../_models/user-group-configuration';
import { Observable, BehaviorSubject, Subject, empty } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { abc } from '../../../../scss/js/jquery-input-file-text.js';
import { count, first } from 'rxjs/operators';
import index from "@angular/cdk/schematics/ng-add";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: "app-user-group-configuration",
  templateUrl: "./user-group-configuration.component.html",
  styleUrls: ["./user-group-configuration.component.scss"],
  // template: `<div>I'm {{message | async}} </div>`
})
export class UserGroupConfigurationComponent implements OnInit {

  message: Subject<string> = new BehaviorSubject('loading :(');

  ngAfterViewInit() {

  }
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('selectGradeSearch') selectGradeSearch: ElementRef;
  @ViewChild('selectClassSearch') selectClassSearch: ElementRef;
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;
  @ViewChild('selectGradeInsert') selectGradeInsert: ElementRef;
  @ViewChild('selectClassInsert') selectClassInsert: ElementRef;
  @ViewChild('selectGradeUpdate') selectGradeUpdate: ElementRef;
  @ViewChild('selectClassUpdate') selectClassUpdate: ElementRef;
  userGroupConfiguration: Observable<UserGroupConfiguration>;
  form: FormGroup;
  dropdownListDmKhoi = []; dropdownListDmLop = [];

  ddlClassInsert = []; ddlGradeInsert = []; ddlClassUpdate = []; ddlGradeUpdate = [];
  selectedGradesUpdate = []; selectedClassUpdate = [];

  grades_code = []; grades_code_insert = []; class_code_insert = []; grades_code_update = []; class_code_update = [];

  dropdownSettings = {};  dropdownClassSearchSettings = {}; ddlInsertGradeSettings = {}; ddlUpdateGradeSettings = {};

  grade_code = []; class_code = []; selectedDmKhoi = []; selectedDmLop = []; selectedGradesInsert = [];

  multiSelectGrades = [];
  checkUserConfigData = true;

  // Pagination parameters.
  p: number = 1;
  countPage: number = 10;
  totalItems = 0;

  submitted = false;
  dmKhoiData: any; dmLopData: any; idGrade: number; idClass: number; idUpdate: number;
  userConfigData: any; userConfigGetById: any; // GetById cấu hình người dùng fill lên form update

  requiredGradeSearchField = true; reqGradeInsertField = true; reqClassInsertField = true; reqGradeUpdateField = true; reqClassUpdateField = true;
  gradeStatus = "false";

  constructor(
    private fb: FormBuilder,
    private userGroupConfigurationService: UserGroupConfigurationService,
    private notifyService: NotificationService
  ) { }

  // Lấy id dropdown selected Grade
  perPageSelected(id: number) {
    this.countPage = id;
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
  get status(): any {
    return this.form.get('status');
  }
  get statusActive(): any {
    return this.form.get('statusActive');
  }

  loadDataCauHinh() {
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

  get f() { return this.form.controls; }

  ngOnInit() {
    $(document).ready(function () {
      // // set text to select company logo
      // $("#Uploadfile").after("<span class='file_placeholder'>Không có tệp nào được chọn</span>");
      // // on change
      $('#Uploadfile').change(function () {
        //  show file name
        if ($("#Uploadfile").val().length > 0) {
          $(".file_placeholder").empty();
          $('#Uploadfile').removeClass('vendor_logo_hide').addClass('vendor_logo');
        } else {
          // show select company logo
          // $('#Uploadfile').removeClass('vendor_logo').addClass('vendor_logo_hide');
          // $("#Uploadfile").after("<span class='file_placeholder'>Không có tệp nào được chọn</span>");
          $(".file_placeholder").empty();
        }
      });

    });
    $(document).ready(function () {
      $('#Uploadfile').inputFileText({ text: 'Chọn tệp' });
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.dropdownClassSearchSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.ddlInsertGradeSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.ddlUpdateGradeSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      closeDropDownOnSelection: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };

    // Validate form
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      description: new FormControl(''),
      status: new FormControl(''),
      statusActive: new FormControl(true),
      gradeSearch: new FormControl('', [Validators.required]),
      classSearch: new FormControl('', [Validators.required])
    });

    // Get danh mục khối
    this.userGroupConfigurationService.listDmKhoi()
      .pipe(first())
      .subscribe(
        (data) => {
          this.dmKhoiData = data;
          const dmKhoiObj = []
          const dmKhoiInsertObj = []
          this.dmKhoiData.forEach(function (item) {
            dmKhoiObj.push({ 'item_id': item['code'], 'item_text': item['name'] })
          })
          this.dmKhoiData.forEach(function (item) {
            dmKhoiInsertObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
          })
          this.dropdownListDmKhoi = dmKhoiObj;
          this.ddlGradeInsert = dmKhoiInsertObj;
          this.ddlGradeUpdate = dmKhoiInsertObj;
        });

  }
  onItemSelect(items: any) {
    this.selectClassSearch['selectedItems'] = [];
    const grade_codes = [];
    if (this.multiSelectGrades.indexOf(items["item_id"]) === -1) {
      this.multiSelectGrades.push(items["item_id"]);
    } else {
      for (var i = this.multiSelectGrades.length - 1; i--;) {
        if (this.multiSelectGrades[i] === this.multiSelectGrades["item_id"]) this.multiSelectGrades[0].splice(i, 1);
      }
    }
    grade_codes.push({ "grades": this.multiSelectGrades });
    this.grade_code = grade_codes;

    this.userGroupConfigurationService.listDmLop(grade_codes[0], this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['code'], 'item_text': grades['name'] });
          })
          this.dropdownListDmLop = dmLopObj;
        },
        error => {
          return false;
        });
  }
  OnItemDeSelect(event: Event) {
    this.selectClassSearch['selectedItems'] = [];
    const arrayGrade = this.multiSelectGrades;
    const arrayAfterUnselect = [];
    if(this.multiSelectGrades[0]['grades'] != undefined){
      const index = arrayGrade[0]['grades'].indexOf(event["item_id"]);
      if (index > -1) {
        arrayGrade[0]['grades'].splice(index, 1);
      }
      arrayAfterUnselect.push({ "grades": arrayGrade[0]['grades'] });
      this.grade_code = arrayAfterUnselect;
    }else{
      const index = arrayGrade.indexOf(event["item_id"]);
      if (index > -1) {
        arrayGrade.splice(index, 1);
      }
      arrayAfterUnselect.push({ "grades": arrayGrade });
      this.grade_code = arrayAfterUnselect;
    }

    this.userGroupConfigurationService.listDmLop(arrayAfterUnselect[0], this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['code'], 'item_text': grades['name'] });
          })
          this.dropdownListDmLop = dmLopObj;
        },
        error => {
          return false;
        });
  }
  onItemDeSelectAll(items: any) {
    this.selectClassSearch['selectedItems'] = [];
    const arrayAfterUnselect = [];
    if (items.length == 0) {
      this.multiSelectGrades = [];
    }
    const arrayGrades = this.multiSelectGrades;

    const index = arrayGrades.indexOf(items["item_id"]);
    if (index > -1) {
      arrayGrades.splice(index, 1);
    }
    arrayAfterUnselect.push({ "grades": arrayGrades });
    this.grade_code = arrayAfterUnselect;
    this.userGroupConfigurationService.listDmLop(arrayAfterUnselect[0], this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (item) {
            dmLopObj.push({ 'item_id': item['code'], 'item_text': item['name'] })
          })
          this.dropdownListDmLop = dmLopObj;
        },
        error => {
          return false;
        });
  }
  onGradeSelectInsert(item: any) {
    this.reqGradeInsertField = true;

    this.selectClassInsert['selectedItems'] = [];
    const grade_codes = [];
    this.gradeStatus = "true";
    grade_codes.push(item["item_id"]);
    this.grades_code_insert = grade_codes[0];
    this.userGroupConfigurationService.listDmLop(grade_codes, this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] });
          })
          this.ddlClassInsert = dmLopObj;
        },
        error => {
          return false;
        });
  }
  OnGradeDeSelectInsert(item: any) {
    this.reqGradeInsertField = false;
    this.selectClassInsert['selectedItems'] = [];
    const arrayGrade = this.grades_code_insert;
    const arrayAfterUnselect = [];
    const index = arrayGrade.indexOf(item['item_id']);
    if (index > -1) {
      arrayGrade.splice(index, 1);
    }
    if (arrayGrade.length == 0) {
      arrayAfterUnselect.push(0);
    } else {
      arrayAfterUnselect.push(arrayGrade);
    }
    this.grades_code_insert = arrayAfterUnselect;
    this.userGroupConfigurationService.listDmLop(arrayAfterUnselect, this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] });
          })
          this.ddlClassInsert = dmLopObj;
        },
        error => {
          return false;
        });
  }
  onGradeSelectUpdate(item: any) {
    this.reqGradeUpdateField = true;
    this.selectClassUpdate['selectedItems'] = [];
    this.gradeStatus = "true";
    const grade_codes = [];
    grade_codes.push(item["item_id"]);
    this.grades_code_update = grade_codes;
    this.userGroupConfigurationService.listDmLop(grade_codes, this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] });
          })
          this.ddlClassUpdate = dmLopObj;
        },
        error => {
          return false;
        });
  }
  OnGradeDeSelectUpdate(item: any) {
    this.reqClassUpdateField = true;
    this.selectClassUpdate['selectedItems'] = [];
    const arrayGrade = this.grades_code_update;
    const arrayAfterUnselect = [];
    const index = arrayGrade.indexOf(item['item_id']);
    if (index > -1) {
      arrayGrade.splice(index, 1);
    }
    if (arrayGrade.length == 0) {
      arrayAfterUnselect.push(0);
    } else {
      arrayAfterUnselect.push(arrayGrade);
    }
    this.grades_code_update = arrayAfterUnselect;
    this.userGroupConfigurationService.listDmLop(arrayAfterUnselect, this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] })
          })
          this.ddlClassUpdate = dmLopObj;
        },
        error => {
          return false;
        });
  }
  onSelectAll(items: any) {
    this.selectClassSearch['selectedItems'] = [];
    const grade = [];
    const grade_codes = [];
    items.forEach(function (item) {
      grade.push(item['item_id']);
    })
    grade_codes.push({ "grades": grade });
    this.grade_code = grade_codes;
    this.multiSelectGrades = grade_codes;
    this.dropdownListDmLop = [];
    this.userGroupConfigurationService.listDmLop(grade_codes[0], this.gradeStatus)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (item) {
            dmLopObj.push({ 'item_id': item['code'], 'item_text': item['name'] })
          })
          this.dropdownListDmLop = dmLopObj;
        },
        error => {
          return false;
        });
  }
  onSubmit(){

  }
  onItemDmLopSelect(item: any) {
    const classCode = [];
    classCode.push(item['item_id']);
    this.class_code = classCode;
  }
  onClassSelectInsert(item: any) {
    this.reqClassInsertField = true;
    this.class_code_insert = item['item_id'];
  }
  onClassDeSelectInsert(item: any) {
    this.reqClassInsertField = false;
    this.class_code_insert = [];
  }
  onClassSelectUpdate(item: any) {
    this.reqClassUpdateField = true;
    this.class_code_update.push(item['item_id']);
  }
  onClassDeSelectUpdate(item: any) {
    this.reqClassUpdateField = false;
    this.class_code_update.push(item['item_id']);
  }
  onSelectAllDmLop(items: any) {
    const classCode = [];
    items.forEach(function (item) {
      classCode.push(item['item_id'])
    })
    this.class_code = classCode;
  }

  searchByKeyWord(search) {
    this.userConfigData = [];
    // this.requiredGradeSearchField = true;
    if (search.trim() === "") {
      this.notifyService.showError('Vui lòng điền từ khóa tìm kiếm!', 'Thông báo lỗi');
    } else {
      this.userGroupConfigurationService.searchByKeyWord(search)
        .subscribe(
          result => {
            if (result.count != 0) {
              this.totalItems = 1;
              this.p = 1;
              this.userConfigData = [];
              this.checkUserConfigData = true;
              this.userConfigData = result['group_user_configuration'];
              this.totalItems = result['count'];
              this.notifyService.showSuccess('Đã tìm thấy ' + result.count + ' bản gi dữ liệu', 'Thông báo');
            } else {
              this.totalItems = 1;
              this.p = 1;
              this.userConfigData = [];
              this.checkUserConfigData = false;
            }
            this.ngOnDestroy();
          },
          error => {
            this.notifyService.showError(error, 'Thông báo lỗi');
            this.ngOnDestroy();
          });
    }
  }

  searchByInput() {
    this.userConfigData = [];
    // if (this.grade_code.length <= 0) {
    //   this.requiredGradeSearchField = false;
    //   return;
    // } else {
    //   this.requiredGradeSearchField = true;
    // }
    let status;
    const class_code = [];
    const class_codes = [];
    this.class_code.forEach(function (item) {
      class_code.push(item);
    })
    class_codes.push({ "classes": class_code });
    const grades_code = [];
    this.grade_code.forEach(function (item) {
      grades_code.push(item);
    })
    if (this.statusActive.value) {
      status = 'active';
    } else {
      status = 'inactive';
    }
    this.userGroupConfigurationService.searchByInput(grades_code[0], class_codes[0], status)
      .subscribe(
        result => {
          if (result['count'] == 0) {
            this.notifyService.showError('Không tìm thấy dữ liệu', 'Thông báo lỗi');
          } else {
            this.userConfigData = result['group_user_configuration'];
            this.totalItems = result['count'];
          }
          this.ngOnDestroy();
        },
        error => {
          Object.keys(error).forEach(function (key) {
            this.notifyService.showError(error[key], 'Thông báo lỗi');
          });
          this.ngOnDestroy();
        });
  }

  // Thêm mới cấu hình nhóm người sử dụng
  addUserGroupConfig() {
    this.description.value = '',
    this.selectGradeInsert['selectedItems'] = [];
    this.selectClassInsert['selectedItems'] = [];
    this.submitted = true;
    if (this.form.controls['code'].invalid || this.form.controls['name'].invalid) {
      return;
    }

    if ((this.form.controls['code'].value == null || this.form.controls['code'].value == '') && (this.form.controls['name'].value == null || this.form.controls['name'].value == '')) {
      if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
        this.reqGradeInsertField = false;
        this.reqClassInsertField = false;
      }
      return;
    } else if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
      this.reqGradeInsertField = false;
      this.reqClassInsertField = false;
      return;
    }
    else {
      this.reqGradeInsertField = true;
      this.reqClassInsertField = true;
    }

    this.userGroupConfigurationService.addUserGroupConfig(
      this.code.value,
      this.name.value,
      this.grades_code_insert,
      this.class_code_insert,
      this.description.value,
    ).subscribe(
      result => {
        $('#addUserGroupConfigurationModal').modal('hide');
        this.notifyService.showSuccess('Dữ liệu (' + result.code + ' - ' + result.name + ') đã được thêm thành công', 'Thông báo');
        this.ngOnDestroy();
      },
      error => {
        if (error.messages['code']) {
          this.notifyService.showError(error.messages['code'], 'Thông báo lỗi');
        } else if (error.messages['name']) {
          this.notifyService.showError(error.messages['name'], 'Thông báo lỗi');
        } else {
          Object.keys(error.messages).forEach(function (key) {
            this.notifyService.showError(error.messages[key], 'Thông báo lỗi');
          });
        }
      });
  }
  // Cập nhật cấu hình nhóm người sử dụng
  updateUserGroupConfig(id: number) {
    this.form.get('code').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('code').updateValueAndValidity();
    this.form.get('name').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('name').updateValueAndValidity();
    this.submitted = true;
    if (this.form.controls['code'].invalid || this.form.controls['name'].invalid) {
      return;
    }
    if ((this.form.controls['code'].value == null || this.form.controls['code'].value == '') && (this.form.controls['name'].value == null || this.form.controls['name'].value == '')) {
      if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
        this.reqGradeUpdateField = false;
        this.reqClassUpdateField = false;
      }
      return;
    } else if (this.grades_code_update.length <= 0 || this.class_code_update.length <= 0) {
      this.reqGradeUpdateField = false;
      this.reqClassUpdateField = false;
      return;
    }
    else {
      this.reqGradeUpdateField = true;
      this.reqClassUpdateField = true;
    }
    if (this.grades_code_update) {
      this.idGrade = this.grades_code_update[0];
    } else {
      this.idGrade = this.userConfigGetById.grade_id
    }
    if (this.class_code_update) {
      this.idClass = this.class_code_update[0];
    } else {
      this.idClass = this.userConfigGetById.class_id
    }

    // Call API cập nhật cấu hình nhóm người sử dụng
    // this.userGroupConfigurationService.updateUserGroupConfig(
    //   id,
    //   this.code.value,
    //   this.name.value,
    //   this.idGrade,
    //   this.idClass,
    //   this.status.value,
    //   this.description.value
    // ).subscribe(
    //   result => {
    //     $('#editUserGroupConfigurationModal').modal('hide');
    //     this.notifyService.showSuccess('Dữ liệu đã được cập nhật thành công', 'Thông báo');
    //     this.searchByInput();
    //     this.ngOnDestroy();
    //   },
    //   error => {
    //     if (error.messages != undefined) {
    //       if (error.messages.name) {
    //         this.notifyService.showError(error.messages["name"], 'Thông báo lỗi');
    //       } else if (error.messages.grade_id) {
    //         this.notifyService.showError(error.messages["grade_id"], 'Thông báo lỗi');
    //       } else if (error.messages.class_id) {
    //         this.notifyService.showError(error.messages["class_id"], 'Thông báo lỗi');
    //       }
    //       else {
    //         this.notifyService.showError(error.messages["code"], 'Thông báo lỗi');
    //       }
    //     }
    //     else {
    //       if (error.message) {
    //         this.notifyService.showError(error.message, 'Thông báo lỗi');
    //       } else {
    //         this.notifyService.showError(error + '\n \ ', 'Thông báo lỗi');
    //       }
    //     }
    //   });
  }

  // Reset form
  resetUserGroupConfigForm() {
    this.form.get('code').clearValidators();
    this.form.get('name').clearValidators();
    this.form.get('code').setValue('');
    this.form.get('name').setValue('');
    this.form.get('description').setValue('');
    this.selectClassInsert['selectedItems'] = [];
    this.selectGradeInsert['selectedItems'] = [];
    this.selectClassUpdate['selectedItems'] = [];
    this.selectGradeUpdate['selectedItems'] = [];
  }
  // GetById cấu hình nhóm người sử dụng
  getByIdUserGroupConfig(id: number) {
    this.resetUserGroupConfigForm();
    this.grades_code_update = [];
    this.class_code_update = [];
    this.userGroupConfigurationService.getByIdUserGroupConfig(id)
      .subscribe(
        result => {
          this.userConfigGetById = result;
          this.selectedGradesUpdate = [{ item_id: result.grade_id, item_text: "" + result.grade_name + "" }];
          this.grades_code_update.push(result.grade_id);
          this.selectedClassUpdate = [{ item_id: result.class_id, item_text: "" + result.class_name + "" }];
          this.class_code_update.push(result.class_id);
          this.form.patchValue(result);
          this.ngOnDestroy();
        },
        error => {
          Object.keys(error).forEach(function (key) {
            this.notifyService.showError(error[key], 'Thông báo lỗi');
          });
          this.ngOnDestroy();
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
            this.searchByInput();
            this.ngOnDestroy();
          },
          error => {
            this.notifyService.showError(error, 'Thông báo lỗi');
            this.ngOnDestroy();
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
          this.fileInput.nativeElement.value = null;
          this.notifyService.showSuccess(result.message + '. Bạn có thể tìm kiếm dữ liệu dựa vào công cụ tìm kiếm', 'Thành công');
          this.ngOnDestroy();
        },
        error => {
          if (error.messages != undefined) {
            if (error.messages.import_excel !== undefined) {
              this.notifyService.showError(error.messages.import_excel[0] + ' - ', 'Thông báo lỗi');
            } else if (error.messages.name) {
              this.notifyService.showError(error.messages["name"] + ' - ' + error.position, 'Thông báo lỗi');
            } else if (error.messages.grade_id) {
              this.notifyService.showError(error.messages["grade_id"] + ' - ' + error.position, 'Thông báo lỗi');
            } else if (error.messages.class_id) {
              this.notifyService.showError(error.messages["class_id"] + ' - ' + error.position, 'Thông báo lỗi');
            }
            else {
              this.notifyService.showError(error.messages["code"] + ' - ' + error.position, 'Thông báo lỗi');
            }
          }
          else {
            if (error.message) {
              this.notifyService.showError(error.message, 'Thông báo lỗi');
            } else {
              this.notifyService.showError(error + '\n \ ', 'Thông báo lỗi');
            }
          }
        });
  }

  // Export dữ liệu cấu hình người sử dụng ra file Excel
  exportFile() {
    // if (this.grade_code.length <= 0) {
    //   this.requiredGradeSearchField = false;
    //   return;
    // } else {
    //   this.requiredGradeSearchField = true;
    // }
    if (this.userConfigData == undefined || this.userConfigData == [] || this.userConfigData.length == 0) {
      this.notifyService.showError('Không tìm thấy dữ liệu không xuất được file, vui lòng thử lại!', 'Thông báo lỗi');
      return;
    } else {
      let searchVal = this.searchByKeyWordInput.nativeElement.value;
      let status;
      const class_code = [];
      const class_codes = [];
      this.class_code.forEach(function (item) {
        class_code.push(item);
      })
      class_codes.push({ "classes": class_code });

      const grades_code = [];
      const grades_codes = [];
      this.grade_code.forEach(function (item) {
        grades_code.push(item);
      })
      grades_codes.push({ "grades": grades_code });

      if (this.statusActive.value) {
        status = 'active';
      } else {
        status = 'inactive';
      }
      this.userGroupConfigurationService.exportFile(searchVal, class_codes[0], grades_codes[0], status);
    }
  }
  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
}
