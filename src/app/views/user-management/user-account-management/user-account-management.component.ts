import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserAccountManagement } from '../../../_models/userAccountManagement';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAccountManagementService } from '../service/user-account-managemet.service';
import { NotificationService } from '../../../_services/notification.service';
declare var $: any;
@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.scss']
})
export class UserAccountManagementComponent implements OnInit {

  message: Subject<string> = new BehaviorSubject('loading :(');

  ngAfterViewInit() {

  }
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('selectGroupSearch') selectGroupSearch: ElementRef;
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;
  @ViewChild('selectGroupInsert') selectGroupInsert: ElementRef;
  @ViewChild('selectGroupUpdate') selectGroupUpdate: ElementRef;
  userAccountManagement: Observable<UserAccountManagement>;
  form: FormGroup;
  
  
  dropdownSettings = {}; dropdownGroupSearchSettings={};
  selectedNhom=[];
  checkuserAccountData =true;
  // Pagination parameters.
  p: number = 1;
  countPage: number = 10;
  totalItems = 0;


  submitted = false;
  // dmKhoiData: any; dmLopData: any; idGrade: number; idClass: number; idUpdate: number;
  userAccountData: any; 
  userAccountGetById: any; // GetById cấu hình người dùng fill lên form update
  requiredGroupSearchField = true; reqGroupInsertField = true;  reqGroupUpdateField = true;
  GroupStatus = "false";

  constructor(
    private fb: FormBuilder,
    private userAccountManagementService: UserAccountManagementService,
    private notifyService: NotificationService
  ) { }

  // Lấy id dropdown selected Grade
  perPageSelected(id: number) {
    this.countPage = id;
  }
  


  get f() { return this.form.controls; }

  ngOnInit() {
    $(document).ready(function () {
      
      $('#Uploadfile').change(function () {
        
        if ($("#Uploadfile").val().length > 0) {
          $(".file_placeholder").empty();
          $('#Uploadfile').removeClass('vendor_logo_hide').addClass('vendor_logo');
        } else {
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
    this.dropdownGroupSearchSettings = {
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
    // this.ddlInsertGradeSettings = {
    //   singleSelection: true,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Chọn tất cả',
    //   unSelectAllText: 'Bỏ chọn tất cả',
    //   itemsShowLimit: 1,
    //   allowSearchFilter: true,
    //   closeDropDownOnSelection: true,
    //   searchPlaceholderText: 'Tìm kiếm',
    //   noDataAvailablePlaceholderText: 'Không có dữ liệu',
    //   showSelectedItemsAtTop: false,
    //   defaultOpen: false
    // };
    // this.ddlUpdateGradeSettings = {
    //   singleSelection: true,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Chọn tất cả',
    //   unSelectAllText: 'Bỏ chọn tất cả',
    //   itemsShowLimit: 1,
    //   allowSearchFilter: true,
    //   closeDropDownOnSelection: true,
    //   searchPlaceholderText: 'Tìm kiếm',
    //   noDataAvailablePlaceholderText: 'Không có dữ liệu',
    //   showSelectedItemsAtTop: false,
    //   defaultOpen: false
    // };

    // Validate form
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      user_name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      group_user: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      status: new FormControl(''),
      statusActive: new FormControl(true),
      groupSearch: new FormControl('', [Validators.required]),
    });
  //  this.userAccountData = { 
  //     columns: [
  //       {
  //       code: '1',
  //       user_name: 'admin1',
  //       full_name: 'Nguyen1',
  //       email: 'nguyen1@gmail.com',
  //       group_user: 'Nhóm 1',
  //       },
  //       {
  //       code: '2',
  //       user_name: 'admin2',
  //       full_name: 'Nguyen2',
  //       email: 'nguyen2@gmail.com',
  //       group_user: 'Nhóm 2',
  //       },
  //       {
  //       code: '3',
  //       user_name: 'admin3',
  //       full_name: 'Nguyen3',
  //       email: 'nguyen3@gmail.com',
  //       group_user: 'Nhóm 3',
  //       },
       
  //     ]   
  // };
}
  onItemSelect(items: any) {
   
  }
  OnItemDeSelect(event: Event) {
   
  }
  onItemDeSelectAll(items: any) {
    
  }
  onGroupSelectInsert(item: any) {
    
  }
  OnGroupDeSelectInsert(item: any) {
  
  }
  onGroupSelectUpdate(item: any) {
   
  }
  OnGroupDeSelectUpdate(item: any) {
    
  }
  onSelectAll(items: any) {
    
  }
  onSubmit(){

  }
  searchByKeyWord(search) {
    this.userAccountData = [];
    if (search.trim() === "") {
      this.notifyService.showError('Vui lòng điền từ khóa tìm kiếm!', 'Thông báo lỗi');
    } else {
      this.userAccountManagementService.searchByKeyWord(search)
        .subscribe(
          result => {
            if (result.count != 0) {
              this.totalItems = 1;
              this.p = 1;
              this.userAccountData = [];
              this.checkuserAccountData = true;
              this.userAccountData = result['group_user_configuration'];
              this.totalItems = result['count'];
              this.notifyService.showSuccess('Đã tìm thấy ' + result.count + ' bản gi dữ liệu', 'Thông báo');
            } else {
              this.totalItems = 1;
              this.p = 1;
              this.userAccountData = [];
              this.checkuserAccountData = false;
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
    this.userAccountData = [];

  }

  // Thêm mới cấu hình nhóm người sử dụng
  addUserAccount() {

  }
  // Cập nhật cấu hình nhóm người sử dụng
  updateUserAccount(id: number) {

  }

  // Reset form
  resetUserAccountForm() {
    // this.form.get('code').clearValidators();
    // this.form.get('name').clearValidators();
    // this.form.get('code').setValue('');
    // this.form.get('name').setValue('');
    // this.form.get('description').setValue('');
    // this.selectGroupInsert['selectedItems'] = [];
     // this.selectGroupUpdate['selectedItems'] = [];
  }
  // GetById cấu hình nhóm người sử dụng
  getByIdUserAccount(id: number) {

  }

  // Xóa cấu hình nhóm người sử dụng
  deleteUserAccount(id: number) {
  }


  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
}


