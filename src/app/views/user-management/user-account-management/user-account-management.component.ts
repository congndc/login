import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserAccountManagement } from '../../../_models/userAccountManagement';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserAccountManagementService } from '../service/user-account-managemet.service';
import { NotificationService } from '../../../_services/notification.service';
import { first } from 'rxjs/operators';
import { exit } from 'process';

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
  @ViewChild('selectOjectSearch') selectOjectSearch: ElementRef;
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;
  @ViewChild('selectGroupInsert') selectGroupInsert: ElementRef;
  @ViewChild('selectGroupUpdate') selectGroupUpdate: ElementRef;
  userAccountManagement: Observable<UserAccountManagement>;
  form: FormGroup;
  //Khai báo mảng Đối tượng 
  dropdownListDoiTuong : any=[];
  selectedDoiTuong = [];
  // Khai báo mảng Nhóm
  dropdownGroupList=[];
  ddlGroupInsert = [];  
  ddlGroupUpdate = [];
  selectedGroupsUpdate = [];

  ddlInsertGroupSettings = {};
  ddlUpdateGroupSettings = {};
  selectedGroupsInsert = [];


  onSelectObject = [];
  onGroupSelectObject = [];
  checkUserConfigData = true;

  dropdownSettings = {};
  dropdownGroupSearchSettings={};
  dropdownDoiTuongSettings={};
  selectedGroup=[]; 
  checkUserAccountData =true;
  // Pagination parameters.
  p: number = 1;
  countPage: number = 10;
  totalItems = 0;


  submitted = false;
  dmNhomData: any;
  userAccountData: any; 
  userAccountGetById: any; // GetById cấu hình người dùng fill lên form update
  requiredGroupSearchField = true; 
  reqGroupInsertField = true;  
  reqGroupUpdateField = true;
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
  get statusActive(): any {
    return this.form.get('statusActive');
  }
  get f() { return this.form.controls; }
  
  ngOnInit() {
    // dữ liệu Đối tượng
    this.dropdownListDoiTuong =[
      { item_id: 1, item_text: 'Giáo viên' },
      { item_id: 2, item_text: 'Học sinh' },
      { item_id: 3, item_text: 'Phụ huynh' },
    ];
    
   
    // setting drop Đối tượng
    this.dropdownSettings = {
      singleSelection: true,
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
    //Setting Nhóm
    this.dropdownGroupSearchSettings = {
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
   
    this.userAccountManagementService.listNhom()
    .pipe(first())
    .subscribe(
      (data) => {
        this.dmNhomData = data['groups'];
        const dmNhomObj = []
        this.dmNhomData.forEach(function (item) {
          dmNhomObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
        })
      
        this.dropdownGroupList = dmNhomObj;
      });
  
  
}
onItemSelectedGroup(item: any){
  const objects = [];
  const index = this.onGroupSelectObject.indexOf(event["item_id"]);
    if (index > -1) {
      objects.splice(index, 1);
    }else{
      objects.push(item["item_id"]);
    }
    this.onGroupSelectObject = objects;
}
  onItemSelect(item: any) {
  
    const objects = [];
    const index = this.onSelectObject.indexOf(event["item_id"]);
      if (index > -1) {
        objects.splice(index, 1);
      }else{
        objects.push(item["item_id"]);
      }
      this.onSelectObject = objects;
    
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
  onSelectAllNhom(items:any){
    
  }
  onSelectAll(items: any) {
    // this.selectGroupSearch['selectedItems'] = [];
    const group = [];
    const group_id=[];
    console.log(items);
    items.forEach(function (item) {
      group.push(item['item_id']);
    })
    group_id.push({'groups':group});
    this.onGroupSelectObject = group;// push lên onGroupSelectObject để lọc
    this.userAccountManagementService.listNhom()
      .subscribe(
        (data) => {
          this.dmNhomData = data['groups'];
          const groupObj = []
          this.dmNhomData.forEach(function (item) {
            groupObj.push({ 'item_id': item['id'], 'item_text': item['name'] })
          })
          this.dropdownGroupList = groupObj;
        },
        error => {
          return false;
        });
   
    
  }
  onSubmit(){

  }


  onGroupDeSelectInsert(item: any) {
  
  }
  onGroupSelectUpdate(item: any) {
   
  }
  onGroupDeSelectUpdate(item: any) {
   
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

  searchByInput(id: number) {
    this.userAccountData=[];
    let selectObject = this.onSelectObject;
    let GroupSelectObject = this.onGroupSelectObject;
    if (this.statusActive.value) {
      status = 'active';
    } else {
      status = 'inactive';
    }
    this.userAccountManagementService.searchByInput(selectObject, GroupSelectObject, status)
    .subscribe(
      result=>{
        if (result['count'] == 0) {
          this.notifyService.showError('Không tìm thấy dữ liệu', 'Thông báo lỗi');
        } else {
          this.userAccountData = result['users'];
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


