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
import { clear } from 'console';

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

  dropdownSettings = {};  dropdownClassSearchSettings = {}; ddlInsertGradeSettings = {}; ddlUpdateGradeSettings = {}; ddlUpdateClassSettings ={};

  grade_code = []; class_code = []; selectedDmKhoi = []; selectedDmLop = []; selectedGradesInsert = [];

  descriptionValue: any;
  multiSelectGrades = [];
  checkUserConfigData = true;

  ddNameGroup: any;
  ddCodeGroup: any;
  checkStatus : any;

  // Pagination parameters.
  p: number = 1;
  countPage: number = 10;
  totalItems = 0;

  submitted = false;
  dmKhoiData: any; dmLopData: any; idGrade: any; idClass: any; idUpdate: number;
  userConfigData: any; userConfigGetById: any; // GetById cấu hình người sử dụng fill lên form update

  requiredGradeSearchField = true; reqGradeInsertField = true; reqClassInsertField = true; reqGradeUpdateField = true; reqClassUpdateField = true;
  gradeStatus = "false";

  headerUserGroupConfig = false;

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
  // Lấy mã khối cấu hình nhóm người sử dụng
  get code(): any {
    return this.form.get('code');
  }
  // Lấy tên lớp cấu hình nhóm người sử dụng
  get name(): any {
    return this.form.get('name');
  }
  // Lấy id khối cấu hình nhóm người sử dụng
  get grade_id(): any {
    return this.form.get('grade_id');
  }
  // Lấy id  lớp cấu hình nhóm người sử dụng
  get class_id(): any {
    return this.form.get('class_id');
  }
  // Lấy mô tả cấu hình nhóm người sử dụng
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
          $(".file_placeholder").remove();
          $('#Uploadfile').removeClass('vendor_logo_hide').addClass('vendor_logo');
          $("Uploadfile").remove();

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
      itemsShowLimit: 2,
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
    this.ddlUpdateClassSettings = {
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
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      description: new FormControl(''),
      status: new FormControl(''),
      statusActive: new FormControl(true),
      checkBox : new FormControl(this.checkStatus),
      gradeSearch: new FormControl('', [Validators.required]),
      classSearch: new FormControl('', [Validators.required]),
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
            dmKhoiObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
          })
          this.dmKhoiData.forEach(function (item) {
            dmKhoiInsertObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
          })
          this.dropdownListDmKhoi = dmKhoiObj;
          this.ddlGradeInsert = dmKhoiInsertObj;
          this.ddlGradeUpdate = dmKhoiInsertObj;
        });

  }
  //chọn 1 khối
  onItemSelect(items: any) {
    const arrayGrade = this.multiSelectGrades;
    const grade_codes = [];
    if (arrayGrade.length === 0) {
      arrayGrade.push(items['item_id']);
      grade_codes.push({ 'grades': arrayGrade });
    } else {
      if (arrayGrade[0]['grades'] === undefined) {
        const index = arrayGrade.indexOf(items['item_id']);
        if (index > -1) {
          arrayGrade.splice(index, 1);
        } else {
          arrayGrade.push(items['item_id']);
        }
        grade_codes.push({ 'grades': arrayGrade[0]['grades'] });
      } else {
        const index = arrayGrade[0]['grades'].indexOf(items['item_id']);
        if (index > -1) {
          arrayGrade[0]['grades'].splice(index, 1);
        } else {
          arrayGrade[0]['grades'].push(items['item_id']);
        }
        grade_codes.push({ 'grades': arrayGrade[0]['grades'] });

      }
      this.multiSelectGrades = grade_codes;

    }
    this.multiSelectGrades = grade_codes;
    this.grade_code = grade_codes;
    let selectGrade = [];
    selectGrade = grade_codes[0]['grades'];

    this.userGroupConfigurationService.listDmLop(selectGrade)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] });
          })
          this.dropdownListDmLop = dmLopObj;
        },
        error => {
          return false;
        });
  }
  //bỏ chọn 1 khối
  OnItemDeSelect(item: any) {
    this.selectClassSearch['selectedItems'] = [];
    const arrayGrade = this.multiSelectGrades;
    const arrayAfterUnselect = [];
    if (arrayGrade[0] !== undefined) {
      const index = arrayGrade[0]['grades'].indexOf(item['item_id']);
      if (index > -1) {
        arrayGrade[0]['grades'].splice(index, 1);
      } else {
        arrayGrade[0]['grades'].push(item['item_id']);
      }
      arrayAfterUnselect.push({ 'grades': arrayGrade[0]['grades'] });

    }
    this.multiSelectGrades = arrayAfterUnselect;
    let deSelectGrade = [];
    deSelectGrade = arrayAfterUnselect[0]['grades'];

    this.userGroupConfigurationService.listDmLop(deSelectGrade)
      .subscribe(
        (data) => {
          // onClassSelectObject
          this.dmLopData = data;
          const dmLopObj = [];
          const getArrayAfterDe = [];
          var i = 0;
          this.dmLopData.forEach(function (grades) {
            dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] });
            getArrayAfterDe.push(dmLopObj[i]['item_id']);
            i++;
          })
          this.onClassSelectObject= getArrayAfterDe;
          this.dropdownListDmLop = dmLopObj;
          // this.rememberClassId = getArrayAfterDe;
        },
        error => {
          return false;
        });
  }
  //bỏ chọn tất cả Khối
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
    let deSelectAllGrade = [];
    deSelectAllGrade = arrayAfterUnselect[0]['grades'];
    this.userGroupConfigurationService.listDmLop(deSelectAllGrade)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (item) {
            dmLopObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
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
    this.userGroupConfigurationService.listDmLop(grade_codes)
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
    this.userGroupConfigurationService.listDmLop(arrayAfterUnselect)
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
    this.class_code_update = [];
    this.gradeStatus = "true";
    const grade_codes = [];
    grade_codes.push(item["item_id"]);
    this.grades_code_update = grade_codes;
    this.userGroupConfigurationService.listDmLop(grade_codes)
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
    this.grades_code_update = [];
    this.class_code_update = [];
    // const arrayGrade = this.grades_code_update;
    // const arrayAfterUnselect = [];
    // const index = arrayGrade.indexOf(item['item_id']);
    // if (index > -1) {
    //   arrayGrade.splice(index, 1);
    // }
    // if (arrayGrade.length == 0) {
    //   arrayAfterUnselect.push(0);
    // } else {
    //   arrayAfterUnselect.push(arrayGrade);
    // }
    // this.grades_code_update = arrayAfterUnselect;
    // this.userGroupConfigurationService.listDmLop(arrayAfterUnselect)
    //   .subscribe(
    //     (data) => {
    //       this.dmLopData = data;
    //       const dmLopObj = []
    //       this.dmLopData.forEach(function (grades) {
    //         dmLopObj.push({ 'item_id': grades['id'], 'item_text': grades['name'] })
    //       })
    //       this.ddlClassUpdate = dmLopObj;
    //     },
    //     error => {
    //       return false;
    //     });
  }
  //chọn tất cả khối
  onSelectAll(items: any) {
    const grade = [];
    const grade_codes = [];
    items.forEach(function (item) {
      grade.push(item['item_id']);
    })
    grade_codes.push({'grades': grade});
    this.grade_code = grade_codes;
    this.multiSelectGrades = grade_codes;
    this.dropdownListDmLop = [];
    let selectAllGrade = [];
    selectAllGrade = grade_codes[0]['grades'];
    this.userGroupConfigurationService.listDmLop(selectAllGrade)
      .subscribe(
        (data) => {
          this.dmLopData = data;
          const dmLopObj = []
          this.dmLopData.forEach(function (item) {
            dmLopObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
          })
          this.dropdownListDmLop = dmLopObj;
        },
        error => {
          return false;
        });
  }
  onSubmit(){

  }
  //chọn 1 Lớp
  rememberClassId=[];
  onItemDmLopSelect(item: any) {
    const classCode = this.rememberClassId;
    classCode.push(item['item_id']);
    this.class_code = classCode;
    this.rememberClassId = classCode;
    // this.onClassSelectObject = classCode
  }
  //bỏ chọn 1 Lớp
  OnItemDeSelectClass(item: any){
    const classCode = this.rememberClassId;
    if (classCode[0] !== undefined) {
      const index = classCode.indexOf(item['item_id']);
      if(index > -1)
      {
        classCode.splice(index, 1);
      }else{
        classCode.push(item['item_id']);
      }
    }

    this.class_code = classCode;

  }
  //bỏ chọn tất cả Lớp
  onItemDeSelectAllClass(items: any){
    this.selectClassSearch['selectedItems'] = [];
    const allClassCode = this.onClassSelectObject;
    const arrayAfterUnselect = [];
    items.forEach(function (items) {
      allClassCode.push(items['item_id']);
    });
    arrayAfterUnselect.push({ 'groups': allClassCode });
    this.onClassSelectObject = [];
  }
  onClassSelectInsert(item: any) {
    this.reqClassInsertField = true;
    this.class_code_insert = item['item_id'];
  }
  onClassDeSelectInsert(item: any) {
    this.reqClassInsertField = false;
    this.class_code_insert = [];
  }
  //chọn lớp khi sửa
  onClassSelectUpdate(item: any) {
    this.reqClassUpdateField = true;
    const class_code_updated = [];
    this.class_code_update = class_code_updated;
    this.class_code_update.push(item['item_id']);
    // this.class_code = class_code_updated;
  }
  //Bỏ chọn lớp khi sửa
  onClassDeSelectUpdate(item: any) {
    this.reqClassUpdateField = false;
    this.class_code_update.push(item['item_id']);
  }
  //chọn tất cả Lớp
  onSelectAllDmLop(items: any) {
    const classCode =[];
    items.forEach(function (item) {
      classCode.push(item['item_id'])
    })
    this.onClassSelectObject =classCode;
    this.class_code = classCode;
  }

  searchByKeyWord(search) {
    this.userConfigData = [];
    // this.requiredGradeSearchField = true;
    if (search.trim() === "") {
      // this.checkUserConfigData = false;
      this.notifyService.showError('Vui lòng điền từ khóa tìm kiếm!', 'Thông báo lỗi');
      this.totalItems =1;
      this.p =1;
    } else {
      this.userGroupConfigurationService.searchByKeyWord(search)
        .subscribe(
          result => {
            this.headerUserGroupConfig = true;
            if (result.count != 0) {
              this.userConfigData = [];
              this.checkUserConfigData = true;
              this.userConfigData = result['group_user_configuration'];
              this.totalItems = result['count'];
              this.notifyService.showSuccess('Đã tìm thấy ' + result.count + ' bản gi dữ liệu', 'Thông báo');
              this.p = 1;
            } else {
              this.userConfigData = [];
              this.checkUserConfigData = false;
              this.totalItems = 1;
              this.p = 1;
            }
            this.ngOnDestroy();
          },
          error => {
            this.notifyService.showError(error, 'Thông báo lỗi');
            this.ngOnDestroy();
          });
    }
  }

//lọc dữ liệu
onClassSelectObject =[]
  searchByInput() {

    this.userConfigData = [];

    let selectObject = this.multiSelectGrades;
    let classSelectObject = this.class_code;
    let grades_code;
    let class_codes= [];
    if (classSelectObject.length > 0) {
      class_codes = classSelectObject[0]['classes'];
    } else {
      class_codes = [];
    }
    if (selectObject.length > 0) {
      grades_code = selectObject[0]['grades'];
    } else {
      grades_code = [];
    }
    let status;
    if (this.statusActive.value) {
      status = 'active';
    } else {
      status = 'inactive';
    }
    this.userGroupConfigurationService.searchByInput(grades_code, classSelectObject, status)
      .subscribe(
        result => {
          if (result['count'] === 0) {
            this.p = 1;
            this.totalItems = 1;
            this.headerUserGroupConfig = true;
            this.checkUserConfigData = false;
            this.notifyService.showError('Không tìm thấy dữ liệu', 'Thông báo lỗi');
          } else {
            this.headerUserGroupConfig = true;
            this.checkUserConfigData = true;
            // let arrayData = [];
            // let arrayItem = [];
            // arrayData = result['group_user_configuration'];
            // arrayData.forEach(function(item){
            //   arrayItem.push({id: item['id'], name: item['name'], code: item['code'], grade_name: item['grades_name'], class_name: item['class_name'], description: item['description'], status: item['status']});
            // })
            this.userConfigData = result['group_user_configuration'];

            this.totalItems = result['count'];
            this.p = 1;
          }
          // this.ngOnDestroy();
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
    this.form.get('code').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.form.get('code').updateValueAndValidity();
    this.form.get('name').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('name').updateValueAndValidity();
    this.selectGradeInsert['selectedItems'] = [];
    this.selectClassInsert['selectedItems'] = [];
    this.submitted = true;
    // if (this.form.controls['code'].invalid || this.form.controls['name'].invalid) {
    //   if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
    //     this.reqGradeInsertField = false;
    //     this.reqClassInsertField = false;
    //   }
    //   return;
    // }

    // if ((this.form.controls['code'].value == null || this.form.controls['code'].value == '') && (this.form.controls['name'].value == null || this.form.controls['name'].value == '')) {
    //   if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
    //     this.reqGradeInsertField = false;
    //     this.reqClassInsertField = false;
    //   }
    //   return;
    // } else if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
    //   this.reqGradeInsertField = false;
    //   this.reqClassInsertField = false;
    //   return;
    // }
    // else {
    //   this.reqGradeInsertField = true;
    //   this.reqClassInsertField = true;
    // }

    this.userGroupConfigurationService.addUserGroupConfig(
      this.code.value,
      this.name.value,
      this.grades_code_insert,
      this.class_code_insert,
      this.description.value
    ).subscribe(
      result => {
        $('#addUserGroupConfigurationModal').modal('hide');
        this.notifyService.showSuccess('Dữ liệu (' + result.code + ' - ' + result.name + ') đã được thêm thành công', 'Thông báo');
        this.searchByInput();
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
    // let checked = this.form.controls['checkBox'].value;
    this.form.get('name').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(50)]);
    this.form.get('name').updateValueAndValidity();
    this.submitted = true;
    if ( this.form.controls['name'].invalid) {
      return;
    }
    // if ((this.form.controls['code'].value == null || this.form.controls['code'].value == '') && (this.form.controls['name'].value == null || this.form.controls['name'].value == '')) {
    //   if (this.grades_code_insert.length <= 0 || this.class_code_insert.length <= 0) {
    //     this.reqGradeUpdateField = false;
    //     this.reqClassUpdateField = false;
    //   }
    //   return;
    // } else if (this.grades_code_update.length <= 0 || this.class_code_update.length <= 0) {
    //   this.reqGradeUpdateField = false;
    //   this.reqClassUpdateField = false;
    //   return;
    // }
    // else {
    //   this.reqGradeUpdateField = true;
    //   this.reqClassUpdateField = true;
    // }
    if (this.grades_code_update.length === 0) {
      this.idGrade = '';
    }
    else {
      this.idGrade = this.grades_code_update[0];
    }
    if (this.class_code_update.length === 0) {
      this.idClass = '';
    }
    else {
      this.idClass = this.class_code_update[0];
    }
    if (this.form.controls['checkBox'].value) {
      var status =1;
    } else {
      var status = 0;
    }
    // if (this.status.value === true){
    //   var status = 1;
    // }else{
    //   var status = 0;
    // }

    // Call API cập nhật cấu hình nhóm người sử dụng
    this.userGroupConfigurationService.updateUserGroupConfig(
      id,
      this.code.value,
      this.name.value,
      this.idGrade,
      this.idClass,
      status,
      this.description.value
    ).subscribe(
      result => {
        $('#editUserGroupConfigurationModal').modal('hide');
        this.notifyService.showSuccess('Dữ liệu đã được cập nhật thành công', 'Thông báo');
        this.searchByInput();
        this.ngOnDestroy();
      },
      error => {
        if (error.messages != undefined) {
          if (error.messages.name) {
            this.notifyService.showError(error.messages["name"], 'Thông báo lỗi');
          } else if (error.messages.grade_id) {
            this.notifyService.showError(error.messages["grade_id"], 'Thông báo lỗi');
          } else if (error.messages.class_id) {
            this.notifyService.showError(error.messages["class_id"], 'Thông báo lỗi');
          }
          else {
            this.notifyService.showError(error.messages["code"], 'Thông báo lỗi');
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
          let checkBox = result['status'];
          if(checkBox === 1){
           this.checkStatus =true;
          }
          else{
            this.checkStatus =false;
          }
          let groupCode = result['code'];
          this.ddCodeGroup = groupCode;

          let groupName = result['name'];
          this.ddNameGroup =  groupName;

          let descriptionShow = result['description'];
          this.descriptionValue = descriptionShow;
          let id_grade = result['grade_id'];
          const arr = this.ddlGradeUpdate;
          const arrId = [];
          arr.forEach(function(item){
            arrId.push(item['item_id'])
          })
          let position = arrId.indexOf(id_grade);
          const value = arr[position];
          this.userConfigGetById = result;
          let valueID = value['item_id'];
          let gradesValue = value['item_text'];
          this.selectedGradesUpdate = [{ item_id: valueID, item_text: "" + gradesValue + "" }];
          this.grades_code_update.push(result.grade_id);

          this.userGroupConfigurationService.listDmLop([id_grade])
          .pipe()
          .subscribe(
            (data)=>{
              let classData = data;
              const arrClass = [];
              classData.forEach(function(item)
              {
                arrClass.push({'item_id': item['id'], 'item_text': item['name']});
              })
              this.ddlClassUpdate = arrClass;
               let classId = result['class_id'];
               const arrayClassId = [];
                this.ddlClassUpdate.forEach( function(item){
                arrayClassId.push(item['item_id']);
               });
               let positionClass = arrayClassId.indexOf(classId);
              let valueClass = this.ddlClassUpdate[positionClass];
              let valueClassId = valueClass['item_id'];
              let valueClassName = valueClass['item_text'];
              this.selectedClassUpdate=[{item_id: valueClassId, item_text:""+ valueClassName + ""}];
              this.class_code_update.push(result.class_id);
            }
          );
          // this.form.patchValue(result);
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
          this.notifyService.showSuccess(result.message + ' Bạn có thể tìm kiếm dữ liệu dựa vào công cụ tìm kiếm', 'Thành công');
          this.ngOnDestroy();
        },
        error => {
          if (error.messages != undefined) {
            if (error.messages.import_excel !== undefined) {
              this.notifyService.showError(error.messages.import_excel[0], 'Thông báo lỗi');
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
  // timesId = 1;
  // sortCode(event) {
  //   const array = this.userConfigData;
  //   if (this.timesId === 1) {
  //     array.sort(function (a, b) {
  //       let str = a.code
  //       var nameA = Number(str) // bỏ qua hoa thường
  //       let str2 = b.code;
  //       var nameB = Number(str2); // bỏ qua hoa thường
  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }
  //       // name trùng nhau
  //       return 0;
  //     });
  //     this.timesId++;
  //   } else {
  //     array.reverse(function (a, b) {
  //       let str = a.code;
  //       var nameA = Number(str); // bỏ qua hoa thường
  //       let str2 = b.code;
  //       var nameB = Number(str2); // bỏ qua hoa thường
  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }
  //       // name trùng nhau
  //       return 0;
  //     });
  //     this.timesId = 1
  //   }
  //   this.userConfigData = array;
  // }
  timesCode =1;
  sortCode(){ 
    const array = this.userConfigData;
    if(this.timesCode===1){
      array.sort(function (a, b) {
        let str = a.code; 
        str = str.replace(/\s+/g, ' ');
        // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
        str = str.trim();
        // bắt đầu xóa dấu tiếng việt  trong chuỗi
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");

        // var A = this.loc_xoa_dau(a.fullname);
        // var B = this.loc_xoa_dau(b.fullname);
        var nameA = str.toUpperCase();//chuyển hết thành chữ hoa

        let str2 = b.code;


        str2 = str2.replace(/\s+/g, ' ');
        // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
        str2 = str2.trim();
        // bắt đầu xóa dấu tiếng việt  trong chuỗi
        str2 = str2.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str2 = str2.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str2 = str2.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str2 = str2.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str2 = str2.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str2 = str2.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str2 = str2.replace(/đ/g, "d");
        str2 = str2.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str2 = str2.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str2 = str2.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str2 = str2.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str2 = str2.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str2 = str2.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str2 = str2.replace(/Đ/g, "D");

        var nameB = str2.toUpperCase(); 
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
    // this.userConfigData= array;
    this.timesCode ++;
  }else{
    const array = this.userConfigData;
    array.reverse(function (a, b)//đảo ngược lại sort
     {
      let str = a.code; 
      str = str.replace(/\s+/g, ' ');
      // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
      str = str.trim();
      // bắt đầu xóa dấu tiếng việt  trong chuỗi
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");

      // var A = this.loc_xoa_dau(a.fullname);
      // var B = this.loc_xoa_dau(b.fullname);
      var nameA = str.toUpperCase();

      let str2 = b.code;


      str2 = str2.replace(/\s+/g, ' ');
      // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
      str2 = str2.trim();
      // bắt đầu xóa dấu tiếng việt  trong chuỗi
      str2 = str2.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str2 = str2.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str2 = str2.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str2 = str2.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str2 = str2.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str2 = str2.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str2 = str2.replace(/đ/g, "d");
      str2 = str2.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str2 = str2.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str2 = str2.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str2 = str2.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str2 = str2.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str2 = str2.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str2 = str2.replace(/Đ/g, "D");

      var nameB = str2.toUpperCase(); // chuyển thường thành hoa
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // name trùng nhau
      return 0;
    });
  this.timesCode =1;
  } 
  this.userConfigData= array;
    }
    timesGroupName=1;
    sortGroupName(){
      const array = this.userConfigData;
      if(this.timesGroupName===1){
        array.sort(function (a, b) {
          let str = a.name; 
          str = str.replace(/\s+/g, ' ');
          // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
          str = str.trim();
          // bắt đầu xóa dấu tiếng việt  trong chuỗi
          str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
          str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
          str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
          str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
          str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
          str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
          str = str.replace(/đ/g, "d");
          str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
          str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
          str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
          str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
          str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
          str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
          str = str.replace(/Đ/g, "D");
  
          // var A = this.loc_xoa_dau(a.fullname);
          // var B = this.loc_xoa_dau(b.fullname);
          var nameA = str.toUpperCase();//chuyển hết thành chữ hoa
  
          let str2 = b.name;
  
  
          str2 = str2.replace(/\s+/g, ' ');
          // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
          str2 = str2.trim();
          // bắt đầu xóa dấu tiếng việt  trong chuỗi
          str2 = str2.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
          str2 = str2.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
          str2 = str2.replace(/ì|í|ị|ỉ|ĩ/g, "i");
          str2 = str2.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
          str2 = str2.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
          str2 = str2.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
          str2 = str2.replace(/đ/g, "d");
          str2 = str2.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
          str2 = str2.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
          str2 = str2.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
          str2 = str2.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
          str2 = str2.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
          str2 = str2.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
          str2 = str2.replace(/Đ/g, "D");
  
          var nameB = str2.toUpperCase(); 
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // name trùng nhau
          return 0;
        });
      // this.userConfigData= array;
      this.timesGroupName ++;
    }else{
      const array = this.userConfigData;
      array.reverse(function (a, b)//đảo ngược lại sort
       {
        let str = a.name; 
        str = str.replace(/\s+/g, ' ');
        // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
        str = str.trim();
        // bắt đầu xóa dấu tiếng việt  trong chuỗi
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
  
        // var A = this.loc_xoa_dau(a.fullname);
        // var B = this.loc_xoa_dau(b.fullname);
        var nameA = str.toUpperCase();
  
        let str2 = b.name;
  
  
        str2 = str2.replace(/\s+/g, ' ');
        // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
        str2 = str2.trim();
        // bắt đầu xóa dấu tiếng việt  trong chuỗi
        str2 = str2.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str2 = str2.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str2 = str2.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str2 = str2.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str2 = str2.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str2 = str2.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str2 = str2.replace(/đ/g, "d");
        str2 = str2.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str2 = str2.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str2 = str2.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str2 = str2.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str2 = str2.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str2 = str2.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str2 = str2.replace(/Đ/g, "D");
  
        var nameB = str2.toUpperCase(); // chuyển thường thành hoa
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
    this.timesGroupName =1;
    } 
   this.userConfigData= array;
    }
  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
}
