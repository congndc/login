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
  
  dropdownListDmKhoi = []; dropdownListDmLop = [];

  ddlGroupInsert = [];  ddlGroupUpdate = [];selectedGroupsUpdate = [];
  

   ddlInsertGroupSettings = {}; ddlUpdateGroupSettings = {};selectedGroupsInsert = [];

   grades_code = []; grades_code_insert = []; grades_code_update = []; 

  multiSelectGroups = [];
  checkUserConfigData = true;

  dropdownSettings = {}; dropdownGroupSearchSettings={};
  dropdownDoiTuongSettings={};
  selectedNhom=[]; selectedDoiTuong=[];
  checkUserAccountData =true;
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
   
    
  
  
}
onItemDoiTuongSelect(items: any){

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
  OnGroupDeSelectUpdate(item: any) {
    
  }
  onSelectAllDoiTuong(items:any){

  }
  onSelectAll(items: any) {
  
  }
  onSubmit(){

  }
  onItemDmLopSelect(item: any) {
   
  }

  onGroupDeSelectInsert(item: any) {
  
  }
  onGroupSelectUpdate(item: any) {
   
  }
  onGroupDeSelectUpdate(item: any) {
   
  }
  onSelectAllDmLop(items: any) {
   
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
              this.checkUserAccountData = true;
              this.userAccountData = result['group_user_configuration'];
              this.totalItems = result['count'];
              this.notifyService.showSuccess('Đã tìm thấy ' + result.count + ' bản gi dữ liệu', 'Thông báo');
            } else {
              this.totalItems = 1;
              this.p = 1;
              this.userAccountData = [];
              this.checkUserAccountData = false;
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
    this.userAccountData = [
      
        {
        code: '1',
        user_name: 'admin1',
        full_name: 'Nguyen1',
        email: 'nguyen1@gmail.com',
        group_user: 'Nhóm 1',
        },
        {
        code: '2',
        user_name: 'admin2',
        full_name: 'Nguyen2',
        email: 'nguyen2@gmail.com',
        group_user: 'Nhóm 2',
        },
        {
        code: '3',
        user_name: 'admin3',
        full_name: 'Nguyen3',
        email: 'nguyen3@gmail.com',
        group_user: 'Nhóm 3',
        },
        {
        code: '4',
        user_name: 'admin4',
        full_name: 'Nguyen4',
        email: 'nguyen43@gmail.com',
        group_user: 'Nhóm 4',
        },
        {
        code: '5',
        user_name: 'admin5',
        full_name: 'Nguyen5',
        email: 'nguyen5@gmail.com',
        group_user: 'Nhóm 5',
        },
        {
        code: '6',
        user_name: 'admin6',
        full_name: 'Nguyen6',
        email: 'nguyen6@gmail.com',
        group_user: 'Nhóm 6',
        },
        {
        code: '7',
        user_name: 'admin7',
        full_name: 'Nguyen7',
        email: 'nguyen7@gmail.com',
        group_user: 'Nhóm 7',
        },
        {
        code: '8',
        user_name: 'admin8',
        full_name: 'Nguyen8',
        email: 'nguyen8@gmail.com',
        group_user: 'Nhóm 8',
        },
        {
        code: '9',
        user_name: 'admin9',
        full_name: 'Nguyen9',
        email: 'nguyen9@gmail.com',
        group_user: 'Nhóm 9',
        },
        {
        code: '10',
        user_name: 'admin10',
        full_name: 'Nguyen10',
        email: 'nguyen10@gmail.com',
        group_user: 'Nhóm 10',
        },
        {
        code: '11',
        user_name: 'admin11',
        full_name: 'Nguyen11',
        email: 'nguyen11@gmail.com',
        group_user: 'Nhóm 11',
        },
        {
        code: '12',
        user_name: 'admin12',
        full_name: 'Nguyen12',
        email: 'nguyen12@gmail.com',
        group_user: 'Nhóm 12',
        },
        {
        code: '13',
        user_name: 'admin13',
        full_name: 'Nguyen13',
        email: 'nguyen13@gmail.com',
        group_user: 'Nhóm 13',
        },
        {
        code: '14',
        user_name: 'admin14',
        full_name: 'Nguyen14',
        email: 'nguyen14@gmail.com',
        group_user: 'Nhóm 14',
        },
        {
        code: '15',
        user_name: 'admin15',
        full_name: 'Nguyen15',
        email: 'nguyen15@gmail.com',
        group_user: 'Nhóm 15',
        },
        {
        code: '16',
        user_name: 'admin16',
        full_name: 'Nguyen16',
        email: 'nguyen16@gmail.com',
        group_user: 'Nhóm 16',
        },
        {
        code: '17',
        user_name: 'admin17',
        full_name: 'Nguyen17',
        email: 'nguyen17@gmail.com',
        group_user: 'Nhóm 17',
        },
        {
        code: '18',
        user_name: 'admin18',
        full_name: 'Nguyen18',
        email: 'nguyen18@gmail.com',
        group_user: 'Nhóm 18',
        },
        {
        code: '19',
        user_name: 'admin19',
        full_name: 'Nguyen19',
        email: 'nguyen19@gmail.com',
        group_user: 'Nhóm 19',
        },
        {
        code: '20',
        user_name: 'admin20',
        full_name: 'Nguyen20',
        email: 'nguyen20@gmail.com',
        group_user: 'Nhóm 20',
        },
        {
        code: '21',
        user_name: 'admin21',
        full_name: 'Nguyen21',
        email: 'nguyen21@gmail.com',
        group_user: 'Nhóm 21',
        },
        {
        code: '22',
        user_name: 'admin22',
        full_name: 'Nguyen22',
        email: 'nguyen22@gmail.com',
        group_user: 'Nhóm 22',
        },
        {
        code: '23',
        user_name: 'admin23',
        full_name: 'Nguyen23',
        email: 'nguyen23@gmail.com',
        group_user: 'Nhóm 23',
        },
        {
        code: '24',
        user_name: 'admin24',
        full_name: 'Nguyen24',
        email: 'nguyen24@gmail.com',
        group_user: 'Nhóm 24',
        },
        {
        code: '25',
        user_name: 'admin25',
        full_name: 'Nguyen25',
        email: 'nguyen25@gmail.com',
        group_user: 'Nhóm 25',
        },
        {
        code: '26',
        user_name: 'admin26',
        full_name: 'Nguyen26',
        email: 'nguyen26@gmail.com',
        group_user: 'Nhóm 26',
        },
        {
        code: '27',
        user_name: 'admin27',
        full_name: 'Nguyen27',
        email: 'nguyen27@gmail.com',
        group_user: 'Nhóm 27',
        },
       
      
    ];

  }

  // Thêm mới cấu hình nhóm người sử dụng
  addUserAccount() {
    this.form.get('user_name').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);

    this.form.get('password').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('confirm_password').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('email').setValidators([Validators.required, Validators.email, Validators.maxLength(100)]);
    this.submitted = true;
    if (this.form.controls['user_name'].invalid || this.form.controls['password'].invalid|| this.form.controls['confirm_password'].invalid|| this.form.controls['email'].invalid) {
      return;
    }
    
    else {
      this.reqGroupInsertField = true;
    }
    
  }
  // Cập nhật cấu hình nhóm người sử dụng
  updateUserAccount() {
    this.form.get('user_name').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('user_name').updateValueAndValidity();
    this.form.get('password').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('password').updateValueAndValidity();
    this.form.get('confirm_password').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('confirm_password').updateValueAndValidity();
    this.form.get('email').setValidators([Validators.required, Validators.email, Validators.maxLength(100)]);
    this.form.get('email').updateValueAndValidity();
    this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // if (this.form.controls['user_name'].invalid || this.form.controls['password'].invalid|| this.form.controls['confirm_password'].invalid|| this.form.controls['email'].invalid) {
    //   return;
    // }
    // else {
    //   this.reqGroupUpdateField = true;
    // }
    
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
    let isDelete = confirm('Bạn chắc chắn muốn xóa dữ liệu này?');
    if (isDelete) {
      // this.userAccountManagementService.deleteUserAccount(id)
      //   .subscribe(
      //     result => {
      //       this.notifyService.showSuccess('Dữ liệu đã được xóa thành công!', 'Thông báo');
      //       this.searchByInput();
      //       this.ngOnDestroy();
      //     },
      //     error => {
      //       this.notifyService.showError(error, 'Thông báo lỗi');
      //       this.ngOnDestroy();
      //     });
    }
  }


  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
}


