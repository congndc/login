import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { UserAccountManagement } from '../../../_models/userAccountManagement';
import { NotificationService } from '../../../_services/notification.service';
import { UserAccountManagementService } from '../service/user-account-managemet.service';
import { SafeUrlPipe } from '../../../_services/safe-url.pipe.service';
import { FlagsComponent } from '../../icons/flags.component';
import { TooltipLabel, CountryISO, SearchCountryField } from 'ngx-intl-tel-input';

declare var $: any;
@Component({
  selector: 'app-user-account-management',
  templateUrl: './user-account-management.component.html',
  styleUrls: ['./user-account-management.component.scss']
})
export class UserAccountManagementComponent implements OnInit {
  public imagePath;
  imgURL: any; imgURLUpdate: any;
  public message: string;
  ngAfterViewInit() {

  }
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('selectGroupSearch') selectGroupSearch: ElementRef;
  @ViewChild('selectOjectSearch') selectOjectSearch: ElementRef;
  @ViewChild('selectPermissionInsert') selectPermissionInsert: ElementRef;
  @ViewChild('selectGenderInsert') selectGenderInsert: ElementRef;

  @ViewChild('selectProvince') selectProvince: ElementRef;
  @ViewChild('selectDistrictUpdate') selectDistrictUpdate: ElementRef;
  @ViewChild('selectWardUpdate') selectWardUpdate: ElementRef;
  // @ViewChild('selectObjectInsert') selectObjectInsert: ElementRef;
  @ViewChild('searchByKeyWordInput') searchByKeyWordInput: ElementRef;
  @ViewChild('selectGroupInsert') selectGroupInsert: ElementRef;
  @ViewChild('selectGroupUpdate') selectGroupUpdate: ElementRef;
  @ViewChild('changePassword') changePassword: ElementRef;
  userAccountManagement: Observable<UserAccountManagement>;
  form: FormGroup;
  selectedFile: File
  marked = false;
  cbxChangePassword = false;
  //Khai báo mảng Đối tượng
  ddlObject: any = []; ddlGender: any = [];
  selectedDoiTuong = [];
  // Khai báo mảng Nhóm
  dropdownGroupList = [];
  ddlPermissionData = [];
  ddlObjectInsert = [];
  ddlGroupInsert = [];
  ddlGroupUpdate = [];
  selectedGroupsUpdate = [];

  ddlInsertGroupSettings = {};
  ddlUpdateGroupSettings = {};
  selectedGroupsInsert = [];

  group_update = []; dropdownGroupInsertList = []; permission_update = []; multiSelectGroupUpdate = []; selectedObjectInsert = [];
  selectedPermissionInsert = []; onSelectPermission = []; multiSelectUser = []; selectedGroupUpdate = [];
  group_insert = []; multiSelectGroupInsert = []; selectedGroupInsert = []; onGenderInsert = []; selectedGenderInsert = [];
  ddlObjectUpdate = []; multiSelectObjectUpdate = []; selectedObjectUpdate = [];

  onLinkProfileInsert: any; selectedLinkProfileInsert: any;
  onLinkProfileUpdate: any;

  onGenderUpdate = []; selectedGenderUpdate = []; gender_update = [];
  ward_update = []; ddlWard = []; selectedWard = []; ddlWardSettings = {};
  district_update = []; ddlDistrict = []; selectedDistrict = []; ddlDistrictSettings = {};
  province_update = []; ddlProvince = []; selectedProvince = []; ddlProvinceSettings = {};

  onSelectObject = [];
  onGroupSelectObject = [];
  checkUserConfigData = true;

  ddlObjectSettings = {}; dropdownGroupInsertSettings = {}; ddlObjectUpdateSettings = {}; ddlPermissionSettings = {}; ddlObjectInsertSettings = {}; ddlGenderInsertSettings = {};
  dropdownGroupSearchSettings = {};
  ddlGroupUpdateSettings = {};
  dropdownDoiTuongSettings = {};
  selectedGroup = [];
  checkUserAccountData = true;
  headerUserAccount = false;

  ddlLinkProfileSettings = {}; ddlLinkProfileInsertData = []; ddlLinkProfileUpdateData = [];
  // Pagination parameters.
  p: number = 1;
  countPage: number = 10;
  totalItems = 0;


  submitted = false;
  groupData: any;
  userData: any;
  permissionData: any;
  userAccountData: any;
  userAccountGetById: any; // GetById cấu hình người sử dụng fill lên form update
  //requiredGroupSearchField = true;

  requiredObjectFilter = true;
  requiredPermissionInsert = true;
  // requiredGroupInsert = true;
  requiredUserInsert = true;
  requiredGroupUpdate = true;
  requiredGenderInsert = true;
  requiredGenderUpdate = true;
  requiredObjectUpdate = true;
  group_id = [];
  group = [];
  permission_id: any;
  gender_id: any;

  province_id: any;
  district_id: any;
  ward_id: any;
  selectedProvinceOption: number;
  selectedProfileInsert= [];
  selectedProfileUpdate = [];
  // checkLinkProfile: true;
  constructor(
    private fb: FormBuilder,
    private userAccountManagementService: UserAccountManagementService,
    private notifyService: NotificationService,
    private safeUrlPipe: SafeUrlPipe
  ) { }

  // Lấy id dropdown selected Grade
  perPageSelected(id: number) {
    this.countPage = id;
  }
  get status(): any {
    return this.form.get('status');
  }
  get statusFilter(): any {
    return this.form.get('statusFilter');
  }
  get username(): any {
    return this.form.get('username');
  }
  get email(): any {
    return this.form.get('email');
  }
  get password(): any {
    return this.form.get('password');
  }
  get code(): any {
    return this.form.get('code');
  }
  get fullname(): any {
    return this.form.get('fullname');
  }
  get dob(): any {
    return this.form.get('dob');
  }
  get gender(): any {
    return this.form.get('gender');
  }
  get phone(): any {
    return this.form.get('phone');
  }
  get address(): any {
    return this.form.get('address');
  }
  get codeProfile(): any {
    return this.form.get('codeProfile');
  }
  get f() { return this.form.controls; }

  ngOnInit() {
    // this.form.controls['status'].value = true;
    // dữ liệu Đối tượng
    this.ddlObject = [
      { item_id: 1, item_text: 'Giáo viên' },
      { item_id: 2, item_text: 'Học sinh' },
      { item_id: 3, item_text: 'Phụ huynh' },
    ];
    this.ddlGender = [
      { item_id: 0, item_text: 'Nữ' },
      { item_id: 1, item_text: 'Nam' },
      { item_id: 2, item_text: 'Khác' },
    ];
    // setting drop Xã/ Phường
    this.ddlWardSettings = {
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
    // setting drop Xã/ Phường
    this.ddlDistrictSettings = {
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
    // setting drop Xã/ Phường
    this.ddlProvinceSettings = {
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

    // setting drop Quyền truy cập hệ thống
    this.ddlObjectSettings = {
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
    // setting drop update Quyền truy cập hệ thống
    this.ddlObjectUpdateSettings = {
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
    this.ddlObjectInsertSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.ddlGenderInsertSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 1,
      allowSearchFilter: false,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    this.ddlPermissionSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Chọn tất cả',
      unSelectAllText: 'Bỏ chọn tất cả',
      itemsShowLimit: 3,
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
    this.dropdownGroupInsertSettings = {
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
    this.ddlGroupUpdateSettings = {
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
    this.ddlLinkProfileSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 1,
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    let nameFormat = "[a-zA-Z\s]+$";
    // Validate form
    this.form = this.fb.group({
      code: new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]),
      username: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      group_user: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100),
      Validators.pattern("[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ\n" +
        "fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu\n" +
        "UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ, ' ']*")]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      // phone: new FormControl('', [Validators.pattern('(09)[0-9 ]{9}')]),
      phone: new FormControl('', [Validators.pattern("(0)[0-9 ]{9}")]),
      address: new FormControl(''),
      statusFilter: new FormControl(true),
      status: new FormControl(''),
      // statusActive: new FormControl(true),
      groupSearch: new FormControl('', [Validators.required]),
      codeProfile: new FormControl(''),
    }, {
      validator: MustMatch('password', 'confirm_password')
    });
    this.userAccountManagementService.getSystemAccess()
      .subscribe(
        (data) => {
          let permissionData = data['permission'];
          const permissionObj = [];
          permissionData.forEach(function (item) {
            permissionObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
          });
          this.ddlObject = permissionObj;
          this.ddlObjectUpdate = permissionObj;
          this.ddlPermissionData = permissionObj;
        });
    // this.userAccountManagementService.getListUsers()
    //   .subscribe(
    //     (data) => {
    //       this.userData = data['object'];
    //       const userObj = [];
    //       this.userData.forEach(function (item) {
    //         userObj.push({ 'item_id': item['object_code'], 'item_text': item['object_code'] + ' - ' + item['fullname'] });
    //       });
    //       this.ddlUserData = userObj;
    //     });
    this.userAccountManagementService.listNhom()
      .pipe(first())
      .subscribe(
        (data) => {
          this.groupData = data['group_user_configuration'];
          const groupObj = [];
          const groupIdObj = [];
          this.groupData.forEach(function (item) {
            groupObj.push({ 'item_id': item['code'], 'item_text': item['code'] + '-' + item['name'] });
          });
          this.groupData.forEach(function (item) {
            groupIdObj.push({ 'item_id': item['id'], 'item_text': item['code'] + '-' + item['name'] });
          });
          this.dropdownGroupList = groupObj;
          this.dropdownGroupInsertList = groupIdObj;
          this.ddlGroupUpdate = groupObj;
          this.ddlObjectInsert = groupObj;
        });
    this.userAccountManagementService.getProvince()
      .subscribe(
        (data) => {
          let provinceData = data['rows'];
          const provinceObj = [];
          provinceData.forEach(function (item) {
            provinceObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
          });
          this.ddlProvince = provinceObj;
        });
    this.userAccountManagementService.getListUsers()
      .subscribe(
        (data) => {
          let profileData = data['object'];
          const profileObj = [];
          profileData.forEach(function (item) {
            profileObj.push({ 'item_id': item['code'], 'item_text': item['code'] + ' - ' + item['fullname'] });
          });
          this.ddlLinkProfileInsertData = profileObj;
          this.ddlLinkProfileUpdateData = profileObj;
        });
  }
  preview(files) {
    if (files.length === 0)
      return;
    this.selectedFile = files[0];
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;

    }
  }
  previewUpdate(files) {
    if (files.length === 0)
      return;
    this.selectedFile = files[0];
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURLUpdate = reader.result;

    }
  }
  onSelectLinkProfileInsert(item: any) {
    this.onLinkProfileInsert = item['item_id'];
    this.userAccountManagementService.getInfoProfile(item['item_id'])
      .subscribe(
        (data) => {
          // this.resetUserAccountForm();
          this.code.value = item['item_id'];
          this.selectedProvince = [];
          this.selectedDistrict = [];
          this.selectedWard = [];
          const selectedGenderInsert = [];
          const selectedProvinceUpdate = [];
          const selectedDistrictUpdate = [];
          const selectedWardUpdate = [];
          let provice = data['object'][0]['province_id'];
          let district = data['object'][0]['district_id'];
          let ward = data['object'][0]['ward_id'];
          if (provice) {
            this.district_update = [];
            this.district_update.push(provice);
            this.userAccountManagementService.getDistrict(provice)
              .subscribe(
                (data) => {
                  let districtData = data['districts'];
                  const districtObj = [];
                  districtData.forEach(function (item) {
                    districtObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlDistrict = districtObj;
                  var mapDistrict = districtData.map(function (x) { return x.id; }).indexOf(district);
                  selectedDistrictUpdate.push({ 'item_id': districtData[mapDistrict]['id'], 'item_text': districtData[mapDistrict]['name'] });
                  this.selectedDistrict = selectedDistrictUpdate;

                });
          }
          if (district) {
            this.ward_update = [];
            this.ward_update.push(district);
            this.userAccountManagementService.getWard(district)
              .subscribe(
                (data) => {
                  let wardData = data['wards'];
                  const wardObj = [];
                  wardData.forEach(function (item) {
                    wardObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlWard = wardObj;
                  var mapWard = wardData.map(function (x) { return x.id; }).indexOf(ward);
                  selectedWardUpdate.push({ 'item_id': wardData[mapWard]['id'], 'item_text': wardData[mapWard]['name'] });
                  this.selectedWard = selectedWardUpdate;
                });
          }
          let gender = data['object'][0]['gender'];
          if (gender >= 0) {
            var mapGender = this.ddlGender.map(function (x) { return x.item_id; }).indexOf(gender);
            selectedGenderInsert.push({ 'item_id': this.ddlGender[mapGender]['item_id'], 'item_text': this.ddlGender[mapGender]['item_text'] });
            this.selectedGenderInsert = selectedGenderInsert;
            this.onGenderInsert.push(gender);
            this.requiredGenderInsert = true;
          }
          if (provice) {
            this.province_update = [];
            this.province_update.push(provice);
            var mapProvince = this.ddlProvince.map(function (x) { return x.item_id; }).indexOf(provice);
            selectedProvinceUpdate.push({ 'item_id': this.ddlProvince[mapProvince]['item_id'], 'item_text': this.ddlProvince[mapProvince]['item_text'] });
            this.selectedProvince = selectedProvinceUpdate;
          }
          this.form.patchValue(data['object'][0]);
        });
  }
  onDeSelectLinkProfileInsert(item: any) {
    this.resetUserAccountForm();
    this.code.value = [];
  }
  onSelectLinkProfileUpdate(item: any) {
    this.userAccountManagementService.getInfoProfile(item['item_id'])
      .subscribe(
        (data) => {
          // this.resetUserAccountForm();
          this.code.value = item['item_id'];
          this.selectedProvince = [];
          this.selectedDistrict = [];
          this.selectedWard = [];
          const selectedGenderInsert = [];
          const selectedProvinceUpdate = [];
          const selectedDistrictUpdate = [];
          const selectedWardUpdate = [];
          let provice = data['object'][0]['province_id'];
          let district = data['object'][0]['district_id'];
          let ward = data['object'][0]['ward_id'];
          if (provice) {
            this.district_update = [];
            this.district_update.push(provice);
            this.userAccountManagementService.getDistrict(provice)
              .subscribe(
                (data) => {
                  let districtData = data['districts'];
                  const districtObj = [];
                  districtData.forEach(function (item) {
                    districtObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlDistrict = districtObj;
                  var mapDistrict = districtData.map(function (x) { return x.id; }).indexOf(district);
                  selectedDistrictUpdate.push({ 'item_id': districtData[mapDistrict]['id'], 'item_text': districtData[mapDistrict]['name'] });
                  this.selectedDistrict = selectedDistrictUpdate;

                });
          }
          if (district) {
            this.ward_update = [];
            this.ward_update.push(district);
            this.userAccountManagementService.getWard(district)
              .subscribe(
                (data) => {
                  let wardData = data['wards'];
                  const wardObj = [];
                  wardData.forEach(function (item) {
                    wardObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlWard = wardObj;
                  var mapWard = wardData.map(function (x) { return x.id; }).indexOf(ward);
                  selectedWardUpdate.push({ 'item_id': wardData[mapWard]['id'], 'item_text': wardData[mapWard]['name'] });
                  this.selectedWard = selectedWardUpdate;
                });
          }
          let gender = data['object'][0]['gender'];
          if (gender >= 0) {
            var mapGender = this.ddlGender.map(function (x) { return x.item_id; }).indexOf(gender);
            selectedGenderInsert.push({ 'item_id': this.ddlGender[mapGender]['item_id'], 'item_text': this.ddlGender[mapGender]['item_text'] });
            this.selectedGenderInsert = selectedGenderInsert;
            this.onGenderInsert.push(gender);
          }
          if (provice) {
            this.province_update = [];
            this.province_update.push(provice);
            var mapProvince = this.ddlProvince.map(function (x) { return x.item_id; }).indexOf(provice);
            selectedProvinceUpdate.push({ 'item_id': this.ddlProvince[mapProvince]['item_id'], 'item_text': this.ddlProvince[mapProvince]['item_text'] });
            this.selectedProvince = selectedProvinceUpdate;
          }
          this.form.patchValue(data['object'][0]);
        });
  }
  onDeSelectLinkProfileUpdate(item: any) {
    this.resetUserAccountForm();
    this.code.value = [];
  }
  onItemSelectedGroup(item: any) {
    const arrayGroup = this.onGroupSelectObject;
    const group = [];
    if (arrayGroup.length === 0) {
      arrayGroup.push(item['item_id']);
      group.push({ 'groups': arrayGroup });
    } else {
      if (arrayGroup[0]['groups'] === undefined) {
        const index = arrayGroup.indexOf(item['item_id']);
        if (index > -1) {
          arrayGroup.splice(index, 1);
        } else {
          arrayGroup.push(item['item_id']);
        }
        group.push({ 'groups': arrayGroup });
      } else {
        const index = arrayGroup[0]['groups'].indexOf(item['item_id']);
        if (index > -1) {
          arrayGroup[0]['groups'].splice(index, 1);
        } else {
          arrayGroup[0]['groups'].push(item['item_id']);
        }
        group.push({ 'groups': arrayGroup[0]['groups'] });

      }
      this.onGroupSelectObject = group;

    }
    this.onGroupSelectObject = group;
  }
  onItemSelect(item: any) {
    // const object = [];
    // const objects = [];
    // const index = this.onSelectObject.indexOf(item['item_id']);
    // if (index > -1) {
    //   object.splice(index, 1);
    //   this.onSelectObject.splice(index, 1);
    // } else {
    //   objects.push(item['item_id']);
    //   this.onSelectObject.push(item['item_id']);
    // }
    // this.onSelectObject = objects;
    const arrayObject = this.onSelectObject;
    const object = [];
    if (arrayObject.length === 0) {
      arrayObject.push(item['item_id']);
      object.push({ 'permission': arrayObject });
    } else {
      if (arrayObject[0]['permission'] === undefined) {
        const index = arrayObject.indexOf(item['item_id']);
        if (index > -1) {
          arrayObject.splice(index, 1);
        } else {
          arrayObject.push(item['item_id']);
        }
        object.push({ 'permission': arrayObject });
      } else {
        const index = arrayObject[0]['permission'].indexOf(item['item_id']);
        if (index > -1) {
          arrayObject[0]['permission'].splice(index, 1);
        } else {
          arrayObject[0]['permission'].push(item['item_id']);
        }
        object.push({ 'permission': arrayObject[0]['permission'] });

      }
      this.onSelectObject = object;

    }
    this.onSelectObject = object;
  }
  onItemDeSelect(item: any) {
    const arrayGroup = this.onGroupSelectObject;
    const arrayAfterUnselect = [];
    if (arrayGroup[0] !== undefined) {
      const index = arrayGroup[0]['groups'].indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup[0]['groups'].splice(index, 1);
      } else {
        arrayGroup[0]['groups'].push(item['item_id']);
      }
      arrayAfterUnselect.push({ 'groups': arrayGroup[0]['groups'] });

    }
    this.onGroupSelectObject = arrayAfterUnselect;
  }
  onSelectAllObject(items: any) {
    // const objects = [];
    // items.forEach(function (items) {
    //   objects.push(items['item_id']);
    // });
    // this.onSelectObject = objects;
    // if (groupInserts.length > 0) {
    //   this.requiredGroupInsert = true;
    // }
    const object = [];
    const objects = [];
    items.forEach(function (items) {
      object.push(items['item_id']);
    });
    objects.push({ 'permission': object });
    this.onSelectObject = objects;
  }
  onDeSelectAllObject(items: any) {
    // const objects = [];
    // items.forEach(function (items) {
    //   objects.push(items['item_id']);
    // });
    // this.onSelectObject = objects;
    // if (groupInserts[0]['groups'].length <= 0) {
    //   this.requiredGroupInsert = false;
    // }
    const arrayObject = [];
    const arrayAfterUnselect = [];
    items.forEach(function (items) {
      arrayObject.push(items['item_id']);
    });
    arrayAfterUnselect.push({ 'permission': arrayObject });
    this.onSelectObject = arrayAfterUnselect;
  }
  onSelectGenderInsert(item: any) {
    const gender = [];
    this.requiredGenderInsert = true;
    gender.push(item['item_id']);
    this.onGenderInsert = gender;
    if (this.onGenderInsert.length > 0) {
      this.requiredGenderInsert = true;
    }
  }
  onDeSelectGenderInsert(item: any) {
    this.requiredGenderInsert = false;
    this.onGenderInsert = [];
  }
  onSelectGenderUpdate(item: any) {
    const gender = [];
    this.requiredGenderUpdate = true;
    gender.push(item['item_id']);
    this.onGenderUpdate = gender;
    if (this.onGenderUpdate.length > 0) {
      this.requiredGenderUpdate = true;
    }
  }
  onDeSelectGenderUpdate(item: any) {
    this.requiredGenderUpdate = false;
    this.onGenderUpdate = [];
  }
  // onSelectSingleObjectInsert(item: any) {
  //   this.selectUserInsert['selectedItems'] = [];
  //   this.onSelectObjectInsert = [];
  //   const arrayGroup = this.onSelectObjectInsert;
  //   const index = this.onSelectObjectInsert.indexOf(item['item_id']);
  //   if (index > -1) {
  //     arrayGroup.splice(index, 1);
  //   } else {
  //     arrayGroup.push(item['item_id']);
  //   }
  //   this.onSelectObjectInsert = arrayGroup;
  //   if (arrayGroup.length > 0) {
  //     this.requiredObjectInsert = true;
  //   }
  //   switch (arrayGroup[0]) {
  //     case 1: {
  //       this.userAccountManagementService.getListTeacherUsers()
  //         .subscribe(
  //           (data) => {
  //             this.userData = data['object'];
  //             const userObj = [];
  //             this.userData.forEach(function (item) {
  //               userObj.push({ 'item_id': item['id'], 'item_text': item['code'] + ' ' + item['fullname'] });
  //             });
  //             this.ddlUserData = userObj;
  //           });
  //       break;
  //     } case 2: {
  //       this.userAccountManagementService.getListStudentUsers()
  //         .subscribe(
  //           (data) => {
  //             this.userData = data['object'];
  //             const userObj = [];
  //             this.userData.forEach(function (item) {
  //               userObj.push({ 'item_id': item['id'], 'item_text': item['code'] + ' ' + item['fullname'] });
  //             });
  //             this.ddlUserData = userObj;
  //           });
  //       break;
  //     } case 3: {
  //       this.userAccountManagementService.getListParentUsers()
  //         .subscribe(
  //           (data) => {
  //             this.userData = data['object'];
  //             const userObj = [];
  //             this.userData.forEach(function (item) {
  //               userObj.push({ 'item_id': item['id'], 'item_text': item['code'] + ' ' + item['fullname'] });
  //             });
  //             this.ddlUserData = userObj;
  //           });
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // }
  // onDeSelectSingleObjectInsert(item: any) {
  //   this.selectUserInsert['selectedItems'] = [];
  //   this.onSelectObjectInsert = [];
  //   const arrayGroup = this.onSelectObjectInsert;
  //   const index = this.onSelectObjectInsert.indexOf(item['item_id']);
  //   if (index > -1) {
  //     arrayGroup.splice(index, 1);
  //   }
  //   this.onSelectObjectInsert = arrayGroup;
  //   if (arrayGroup.length <= 0) {
  //     this.requiredObjectInsert = false;
  //   }
  //   this.ddlUserData = [];
  // }
  onItemDeSelectObject(item: any) {
    // let index = -1;
    // if (this.onSelectObject !== null) {
    //   index = this.onSelectObject[0].indexOf(item['item_id']);
    // }
    // if (index > -1) {
    //   this.onSelectObject = [];

    // } else {
    //   this.onSelectObject.push(item['item_id']);
    // }
    // if (this.onSelectObject.length <= 0) {
    //   this.requiredObjectFilter = false;
    // }
    const arrayObject = this.onSelectObject;
    const arrayAfterUnselect = [];
    if (arrayObject[0] !== undefined) {
      const index = arrayObject[0]['permission'].indexOf(item['item_id']);
      if (index > -1) {
        arrayObject[0]['permission'].splice(index, 1);
      } else {
        arrayObject[0]['permission'].push(item['item_id']);
      }
      arrayAfterUnselect.push({ 'permission': arrayObject[0]['permission'] });

    }
    this.onSelectObject = arrayAfterUnselect;
  }

  onItemDeSelectAll(items: any) {
    const arrayGroup = [];
    const arrayAfterUnselect = [];
    items.forEach(function (items) {
      arrayGroup.push(items['item_id']);
    });
    arrayAfterUnselect.push({ 'groups': arrayGroup });
    this.onGroupSelectObject = arrayAfterUnselect;

  }

  onSelectAll(items: any) {
    const groups = [];
    const groupInserts = [];
    items.forEach(function (items) {
      groups.push(items['item_id']);
    });
    groupInserts.push({ 'groups': groups });
    this.onGroupSelectObject = groupInserts;
  }
  onSubmit() {

  }

  onSelectPermissionInsert(item: any) {
    this.onSelectPermission = [];
    const arrayGroup = this.onSelectPermission;
    const index = this.selectedPermissionInsert.indexOf(item['item_id']);
    if (index > -1) {
      arrayGroup.splice(index, 1);
    } else {
      arrayGroup.push(item['item_id']);
    }
    this.onSelectPermission = arrayGroup;
    if (arrayGroup.length > 0) {
      this.requiredPermissionInsert = true;
    }
  }

  onDeSelectPermissionInsert(item: any) {
    this.onSelectPermission = [];
    const arrayGroup = this.onSelectPermission;
    const index = arrayGroup.indexOf(item['item_id']);
    if (index > -1) {
      arrayGroup.splice(index, 1);
    }
    this.onSelectPermission = arrayGroup;
    if (arrayGroup.length <= 0) {
      this.requiredPermissionInsert = false;
    }
  }

  onGroupSelectInsert(item: any) {
    const arrayGroup = this.multiSelectGroupInsert;
    const group = [];
    const index = this.multiSelectGroupInsert.indexOf(item['item_id']);
    if (index > -1) {
      arrayGroup.splice(index, 1);
    } else {
      arrayGroup.push(item['item_id']);
    }
    group.push({ 'groups': arrayGroup });
    this.multiSelectGroupInsert = group;
    // if (group.length > 0) {
    //   this.requiredGroupInsert = true;
    // }
  }
  onGroupDeSelectInsert(item: any) {
    const arrayGroup = this.multiSelectGroupInsert;
    const arrayAfterUnselect = [];
    const arrayAfterUnselectAll = [];
    if (this.multiSelectGroupInsert.indexOf(item['item_id'] !== undefined)) {
      const index = arrayGroup[0]['groups'].indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup[0]['groups'].splice(index, 1);
      }
      arrayAfterUnselect.push({ 'groups': arrayGroup[0]['groups'] });
      this.multiSelectGroupInsert = arrayAfterUnselect;
    } else {
      const index = arrayAfterUnselectAll.indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup.splice(index, 1);
      }
      arrayAfterUnselectAll.push({ 'groups': arrayGroup });
      this.multiSelectGroupInsert = arrayAfterUnselectAll;
    }
    // if (this.multiSelectGroupInsert[0]['groups'].length <= 0) {
    //   this.requiredGroupInsert = false;
    // }
  }
  onGroupSelectAllInsert(items: any) {
    const groups = [];
    const groupInserts = [];
    items.forEach(function (items) {
      groups.push(items['item_id']);
    });
    groupInserts.push({ 'groups': groups });
    this.multiSelectGroupInsert = groupInserts;
    // if (groupInserts.length > 0) {
    //   this.requiredGroupInsert = true;
    // }
  }
  onGroupDeSelectAllInsert(items: any) {
    const group = [];
    const groupInserts = [];
    items.forEach(function (items) {
      group.push(items['item_id']);
    });
    groupInserts.push({ 'groups': group });
    this.multiSelectGroupInsert = groupInserts;
    // if (groupInserts[0]['groups'].length <= 0) {
    //   this.requiredGroupInsert = false;
    // }
  }
  onGroupSelectUpdate(items: any) {
    const group = [];
    const groups = [];
    if (this.multiSelectGroupUpdate.length === 0) {
      const index = this.multiSelectGroupUpdate.indexOf(items['item_id']);
      if (index > -1) {
        this.multiSelectGroupUpdate.splice(index, 1);
      } else {
        groups.push(items['item_id']);
      }
      this.multiSelectGroupUpdate.push({ 'groups': groups });
    } else {
      this.multiSelectGroupUpdate[0]['groups'].push(items['item_id']);
    }

    this.group_update = this.multiSelectGroupUpdate;

  }
  onGroupDeSelectUpdate(item: any) {
    const arrayGroup = this.multiSelectGroupUpdate;
    const arrayAfterUnselect = [];
    const arrayAfterUnselectAll = [];
    if (this.multiSelectGroupUpdate.indexOf(item['item_id'] !== undefined)) {
      const index = arrayGroup[0]['groups'].indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup[0]['groups'].splice(index, 1);
      }
      arrayAfterUnselect.push({ 'groups': arrayGroup[0]['groups'] });
      this.multiSelectGroupUpdate = arrayAfterUnselect;
    } else {
      const index = arrayAfterUnselectAll.indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup.splice(index, 1);
      }
      arrayAfterUnselectAll.push({ 'groups': arrayGroup });
      this.multiSelectGroupUpdate = arrayAfterUnselectAll;
    }
    this.group_update = this.multiSelectGroupUpdate;
  }
  onGroupSelectAllUpdate(items: any) {
    const groups = [];
    const groupUpdate = [];
    console.log(items);
    items.forEach(function (item) {
      groups.push(item['item_id']);
    })
    groupUpdate.push({ 'groups': groups });
    this.multiSelectGroupUpdate = groupUpdate;
    this.group_update = groupUpdate;
    // if (this.group_update[0]['groups'].length > 0) {
    //   this.requiredGroupUpdate = true;
    // }
  }
  onGroupDeSelectAllUpdate(items: any) {
    const group = [];
    const groupUpdates = [];
    items.forEach(function (items) {
      group.push(items['item_id']);
    });
    groupUpdates.push({ 'groups': group });
    this.group_update = groupUpdates;
    this.multiSelectGroupUpdate = groupUpdates;
    // if (this.group_update[0]['groups'].length <= 0) {
    //   this.requiredGroupUpdate = false;
    // }
  }

  onSelectObjectUpdate(item: any) {
    // const arrayObject = this.permission_update;
    // const object = [];
    // const index = this.permission_update.indexOf(item['item_id']);
    // if (index > -1) {
    //   arrayObject.splice(index, 1);
    // } else {
    //   arrayObject.push(item['item_id']);
    // }
    // object.push({ 'object': arrayObject });
    // this.permission_update = object;
    // if (object.length > 0) {
    //   this.requiredObjectUpdate = true;
    // }
    const permission = [];
    this.requiredObjectUpdate = true;
    permission.push(item['item_id']);
    this.permission_update = permission;
    if (permission.length > 0) {
      this.requiredObjectUpdate = true;
    }
  }
  onDeSelectObjectUpdate() {
    this.requiredObjectUpdate = false;
    this.permission_update = [];
  }
  // onSelectAllObjectUpdate(items: any){
  //   const object = [];
  //   const objectUpdate = [];
  //   items.forEach(function (items) {
  //     object.push(items['item_id']);
  //   });
  //   objectUpdate.push({ 'object': object });
  //   this.multiSelectObjectUpdate = objectUpdate;
  //   if (objectUpdate.length > 0) {
  //     this.requiredObjectUpdate = true;
  //   }
  // }
  // onDeSelectAllObjectUpdate(items: any){
  //   const object = [];
  //   const objectUpdate = [];
  //   items.forEach(function (items) {
  //     object.push(items['item_id']);
  //   });
  //   objectUpdate.push({ 'object': object });
  //   this.multiSelectObjectUpdate = objectUpdate;
  //   if (objectUpdate[0]['object'].length <= 0) {
  //     this.requiredObjectUpdate = false;
  //   }
  // }
  onSelectWardUpdate(item: any) {
    this.ward_update = [];
    const ward = [];
    ward.push(item['item_id']);
    this.ward_update = ward;
  }
  onDeSelectWardUpdate(item: any) {
    this.ward_update = [];

  }
  onSelectDistrictUpdate(item: any) {
    this.selectWardUpdate['selectedItems'] = [];
    this.selectedWard = [];
    this.ward_update = [];
    const district = [];
    district.push(item['item_id']);
    this.district_update = district;
    this.userAccountManagementService.getWard(item['item_id'])
      .subscribe(
        (data) => {
          let wardData = data['wards'];
          const wardObj = [];
          wardData.forEach(function (item) {
            wardObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
          });
          this.ddlWard = wardObj;
        });
  }
  onDeSelectDistrictUpdate(item: any) {
    this.selectWardUpdate['selectedItems'] = [];
    this.district_update = [];
    this.ward_update = [];
    this.selectedWard = [];
    this.ddlWard = [];
  }
  onSelectProvinceUpdate(item: any) {
    this.selectDistrictUpdate['selectedItems'] = [];
    this.selectWardUpdate['selectedItems'] = [];
    this.selectedDistrict = [];
    this.selectedWard = [];
    this.district_update = [];
    this.ddlWard = [];
    const province = [];
    province.push(item['item_id']);
    this.province_update = province;
    this.userAccountManagementService.getDistrict(item['item_id'])
      .subscribe(
        (data) => {
          let districtData = data['districts'];
          const districtObj = [];
          districtData.forEach(function (item) {
            districtObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
          });
          this.ddlDistrict = districtObj;
        });
  }
  onDeSelectProvinceUpdate(item: any) {
    this.selectDistrictUpdate['selectedItems'] = [];
    this.selectWardUpdate['selectedItems'] = [];
    this.province_update = [];
    this.selectedWard = [];
    this.ward_update = [];
    this.selectedDistrict = [];
    this.ddlDistrict = [];
    this.ddlWard = [];
    // this.district_update = [];
    // this.userAccountManagementService.getDistrict(this.ward_update[0])
    //   .subscribe(
    //     (data) => {
    //       let districtData = data['districts'];
    //       const districtObj = [];
    //       districtData.forEach(function (item) {
    //         districtObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
    //       });
    //       this.ddlDistrict = districtObj;
    //     });
  }

  searchByKeyWord(search: any) {
    this.requiredObjectFilter = true;
    // this.headerUserAccount = true;
    let selectObject = this.onSelectObject;
    let groupSelectObject = this.onGroupSelectObject;
    let groups;
    let objects;
    if (selectObject.length > 0) {
      objects = selectObject[0]['permission'];
    } else {
      objects = [];
    }
    if (groupSelectObject.length > 0) {
      groups = groupSelectObject[0]['groups'];
    } else {
      groups = [];
    }
    let status;
    if (this.statusFilter.value) {
      status = 'active';
    } else {
      status = 'inactive';
    }

    if (search.trim() === '') {
      this.notifyService.showError('Vui lòng điền từ khóa tìm kiếm!', 'Thông báo lỗi');
      this.checkUserAccountData = false;
      this.headerUserAccount = true;
      this.userAccountData = [];
      this.p = 1;
      this.totalItems = 1;
    } else {
      this.userAccountManagementService.searchByKeyWord(search, objects, groups, status)
        .subscribe(
          result => {
            this.headerUserAccount = true;
            // if (result.count != 0) {
            if (result['count'] === 0) {
              // this.totalItems = 1;
              this.p = 1;
              this.userAccountData = [];
              this.checkUserAccountData = true;
              this.userAccountData = result['users'];
              this.totalItems = result['count'];
              // this.checkUserAccountData = false;
              // this.notifyService.showSuccess('Đã tìm thấy ' + result.count + ' bản gi dữ liệu', 'Thông báo');
            } else {
              this.totalItems = 1;
              this.p = 1;
              this.userAccountData = [];
              this.checkUserAccountData = false;
              // this.checkUserAccountData = true;
              this.userAccountData = result['users'];
              this.totalItems = result['count'];
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
    // this.headerUserAccount = true;
    let selectObject = this.onSelectObject;
    let groupSelectObject = this.onGroupSelectObject;
    let groups;
    let objects;
    // if (selectObject.length <= 0) {
    //   this.requiredObjectFilter = false;
    //   this.headerUserAccount = false;
    //   this.userAccountData = [];
    //   this.checkUserAccountData = true;
    //   return;
    // } else {
    //   this.requiredObjectFilter = true;

    //   // this.checkUserAccountData = false;
    // }
    if (selectObject.length > 0) {
      objects = selectObject[0]['permission'];
    } else {
      objects = [];
    }
    if (groupSelectObject.length > 0) {
      groups = groupSelectObject[0]['groups'];
    } else {
      groups = [];
    }
    let status;
    if (this.statusFilter.value) {
      status = 'active';
    } else {
      status = 'inactive';
    }
    this.userAccountManagementService.searchByInput(objects, groups, status)
      .subscribe(
        result => {
          if (result['count'] === 0) {
            this.checkUserAccountData = false; //dữ liệu không tồn tại
            this.headerUserAccount = true;
            this.userAccountData = [];
            this.p = 1;
            this.totalItems = 1;
          } else {

            this.p = 1;
            this.checkUserAccountData = true; //dữ liệu tồn tại
            this.headerUserAccount = true;
            this.userAccountData = result['users'];
            this.totalItems = result['count'];
            const arrData = [];
            let valueName;
            let lastSpace;
            let firstSpace;
            let nameBetweent;
            result['users'].forEach(function (item) {
              valueName = item['fullname'];
              firstSpace = valueName.substring(0, valueName.indexOf(' '));
              lastSpace = valueName.substring(valueName.lastIndexOf(' ')).replace(' ', '');
              nameBetweent = valueName.substring(valueName.indexOf(' '), valueName.lastIndexOf(' ')).replace(' ', '');
              let reverseName = lastSpace + " " + nameBetweent + " " + firstSpace
              arrData.push({ id: item['id'], reverseName: reverseName, code: item['code'], fullname: item['fullname'], email: item['email'], dob: item['dob'], phone: item['phone'], group_user_configuration_id: item['group_user_configuration_id'], gender: item['gender'], permission_name: item['permission_name'], status: item['status'] });
            });
            this.userAccountData = arrData;
          }
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
    let phoneNumber;
    this.form.get('code').setValidators([Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('code').updateValueAndValidity();
    this.form.get('email').setValidators([Validators.required, Validators.email, Validators.maxLength(100)]);
    this.form.get('email').updateValueAndValidity();
    this.form.get('fullname').setValidators([Validators.required, Validators.pattern("[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ\n" +
      "fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu\n" +
      "UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ, ' ']*")]);
    this.form.get('fullname').updateValueAndValidity();
    this.form.get('dob').setValidators([Validators.required]);
    this.form.get('dob').updateValueAndValidity();
    this.form.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('password').updateValueAndValidity();
    this.form.get('confirm_password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('confirm_password').updateValueAndValidity();
    this.submitted = true;
    let phoneValue = this.form.controls['phone'].value['internationalNumber'];
    if (this.form.controls['email'].invalid || this.form.controls['dob'].invalid || this.form.controls['code'].invalid
      || this.form.controls['password'].invalid || this.form.controls['confirm_password'].invalid || this.form.controls['phone'].invalid) {
      if (this.onSelectPermission.length <= 0) {
        this.requiredPermissionInsert = false;
      }
      // if (this.multiSelectGroupInsert.length <= 0 || this.multiSelectGroupInsert[0]['groups'].length <= 0) {
      //   this.requiredGroupInsert = false;
      // }
      if (this.onGenderInsert.length <= 0) {
        this.requiredGenderInsert = false;
      }
      if (this.requiredPermissionInsert === false || this.requiredGenderInsert === false) {
        return;
      }
    } else {
      if (this.onSelectPermission.length <= 0) {
        this.requiredPermissionInsert = false;
      }
      // if (this.multiSelectGroupInsert.length <= 0 || this.multiSelectGroupInsert[0]['groups'].length <= 0) {
      //   this.requiredGroupInsert = false;
      // }
      if (this.onGenderInsert.length <= 0) {
        this.requiredGenderInsert = false;
      }
      if (this.requiredPermissionInsert == false || this.requiredGenderInsert == false || this.form.controls['email'].invalid
        || this.form.controls['dob'].invalid || this.form.controls['password'].invalid || this.form.controls['confirm_password'].invalid
        || this.form.controls['phone'].invalid || this.form.controls['fullname'].invalid) {
        return;
      }
      // this.validateDropdownInsert();
    }
    if (this.f.password.value !== this.f.confirm_password.value) {
      this.notifyService.showError('Mật khẩu không trùng khớp. Vui lòng kiểm tra lại!', 'Lỗi!');
      return;
    }
    const group = [];
    if (this.multiSelectGroupInsert.length !== 0 && this.multiSelectGroupInsert[0]['groups'] === undefined) {
      this.group_id = this.multiSelectGroupInsert;
      this.multiSelectGroupInsert[0]['groups'].forEach(function (item) {
        group.push(item);
      });
      this.group_id = group;
    } else {
      this.selectedGroupInsert.forEach(function (item) {
        group.push(item['item_id']);
      });
      this.group_id = group;
    }
    if (this.onSelectPermission) {
      this.permission_id = this.onSelectPermission[0];
    } else {
      this.permission_id = [];
    }

    if (this.onGenderInsert) {
      this.gender_id = this.onGenderInsert[0];
    } else {
      this.gender_id = [];
    }
    if (phoneValue) {
      var tel = phoneValue.indexOf(" "); 
      var extenTel = phoneValue.substr(tel + 1 );
      var head = "("+phoneValue.substr(0,tel)+")";
      var full = head + extenTel ;
      phoneNumber = full;
    } else {
      phoneNumber = '';
    }

    // if (this.province_update && this.province_update.length > 0) {
    //   this.province_id = this.province_update[0];
    // } else {
    //   this.province_id = '';
    // }
    // if (this.district_update && this.district_update.length > 0) {
    //   this.district_id = this.district_update[0];
    // } else {
    //   this.district_id = '';
    // }
    // if (this.ward_update && this.ward_update.length > 0) {
    //   this.ward_id = this.ward_update[0];
    // } else {
    //   this.ward_id = '';
    // }

    var uploadData = new FormData();
    var i = 0;

    if (this.selectedFile) {
      uploadData.append('picture', this.selectedFile);
    }
    uploadData.append('code', this.code.value);
    uploadData.append('user_id', this.code.value);
    uploadData.append('username', this.username.value);
    uploadData.append('permission_id', this.permission_id);
    if (this.group_id.length >= 0) {
      this.group_id.forEach(function (item) {
        uploadData.append("group_user_configuration_id" + "[" + i + "]", item);
        i++;
      });
    }
    uploadData.append('password', this.password.value);
    uploadData.append('email', this.email.value);
    uploadData.append('fullname', this.fullname.value);
    uploadData.append('phone', phoneNumber);
    uploadData.append('dob', this.dob.value);
    uploadData.append('gender', this.gender_id);
    uploadData.append('address', this.address.value);
    // uploadData.append('province', this.province_id);
    // uploadData.append('district', this.district_id);
    // uploadData.append('ward', this.ward_id);
    if (this.province_update && this.province_update.length > 0) {
      uploadData.append('province', this.province_update[0]);
    }
    if (this.district_update && this.district_update.length > 0) {
      uploadData.append('district', this.district_update[0]);
    }
    if (this.ward_update && this.ward_update.length > 0) {
      uploadData.append('ward', this.ward_update[0]);
    }

    // var formData = new FormData();
    // formData.append('import_excel', this.fileInput.nativeElement.files[0]);
    this.userAccountManagementService.insertUserAccount(uploadData).subscribe(
      result => {
        this.selectedProfileInsert = [];
        this.onSelectPermission = [];
        this.group_id = [];
        $('#addUserAccountModal').modal('hide');
        this.notifyService.showSuccess(result.message, 'Thông báo');
        this.searchByInput();
        // this.ngOnDestroy();
      },
      error => {
        // this.onSelectPermission = [];
        // this.multiSelectGroupInsert = [];
        // this.onGenderInsert = [];
        this.selectedProfileInsert = [];
        if (error.message['email']) {
          this.notifyService.showError(error.message['email'], 'Thông báo lỗi');
        } else if (error.message['user']) {
          this.notifyService.showError(error.message['user'], 'Thông báo lỗi');
        } else if (error.message['group_user_configuration_id']) {
          this.notifyService.showError(error.message['group_user_configuration_id'], 'Thông báo lỗi');
        } else if (error.message['teacher']) {
          this.notifyService.showError(error.message['teacher'], 'Thông báo lỗi');
        } else if (error.message['student']) {
          this.notifyService.showError(error.message['student'], 'Thông báo lỗi');
        } else if (error.message['parent']) {
          this.notifyService.showError(error.message['parent'], 'Thông báo lỗi');
        } else if (error.message['password']) {
          this.notifyService.showError(error.message['password'], 'Thông báo lỗi');
        } else if (error.message['picture']) {
          this.notifyService.showError(error.message['picture'], 'Thông báo lỗi');
        } else if (error.message['permission_id']) {
          this.notifyService.showError(error.message['permission_id'], 'Thông báo lỗi');
        } else if (error.message['fullname']) {
          this.notifyService.showError(error.message['fullname'], 'Thông báo lỗi');
        } else if (error.message['user_id']) {
          this.notifyService.showError(error.message['user_id'], 'Thông báo lỗi');
        } else if (error.message['dob']) {
          this.notifyService.showError(error.message['dob'], 'Thông báo lỗi');
        } else if (error.message['phone']) {
          this.notifyService.showError(error.message['phone'], 'Thông báo lỗi');
        } else if (error.message['gender']) {
          this.notifyService.showError(error.message['gender'], 'Thông báo lỗi');
        } else if (error.message['province']) {
          this.notifyService.showError(error.message['province'], 'Thông báo lỗi');
        } else if (error.message['district']) {
          this.notifyService.showError(error.message['district'], 'Thông báo lỗi');
        } else if (error.message['ward']) {
          this.notifyService.showError(error.message['ward'], 'Thông báo lỗi');
        } else {
          Object.keys(error.message).forEach(function (key) {
            this.notifyService.showError(error.message[key], 'Thông báo lỗi');
          });
        }
      });
  }
  toggleVisibility(e) {
    this.marked = e.target.checked;
    if (this.marked === false) {
      this.form.get('password').clearValidators();
      this.form.get('confirm_password').clearValidators();
      this.form.get('password').setValue('');
      this.form.get('confirm_password').setValue('');
    }
  }
  // Cập nhật cấu hình nhóm người sử dụng
  updateUserAccount(id: number) {
    let phoneNumber;
    const checkChangePassword = this.changePassword.nativeElement.checked;
    this.form.get('code').setValidators([Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('code').updateValueAndValidity();
    this.form.get('email').setValidators([Validators.required, Validators.email, Validators.maxLength(100)]);
    this.form.get('email').updateValueAndValidity();
    this.form.get('fullname').setValidators([Validators.required, Validators.pattern("[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆ\n" +
      "fFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTu\n" +
      "UùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ, ' ']*")]);
    this.form.get('fullname').updateValueAndValidity();
    this.form.get('dob').setValidators([Validators.required]);
    this.form.get('dob').updateValueAndValidity();
    this.form.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('password').updateValueAndValidity();
    this.form.get('confirm_password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('confirm_password').updateValueAndValidity();
    this.submitted = true;
    let phoneValue = this.form.controls['phone'].value['internationalNumber'];
    if (checkChangePassword) {
      this.form.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
      this.form.get('password').updateValueAndValidity();
      this.form.get('confirm_password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
      this.form.get('confirm_password').updateValueAndValidity();
      if (this.form.controls['password'].invalid || this.form.controls['confirm_password'].invalid) {
        if (this.permission_update.length <= 0) {
          this.requiredObjectUpdate = false;
        }
        // if (this.multiSelectGroupUpdate[0] === '') {
        //   this.requiredGroupUpdate = false;
        // }
        if (this.onGenderUpdate.length <= 0) {
          this.requiredGenderUpdate = false;
        }
        if (this.requiredObjectUpdate === false || this.requiredGenderUpdate === false
          || this.form.controls['password'].invalid || this.form.controls['confirm_password'].invalid) {
          return;
        }
      } else {
        if (this.permission_update.length <= 0) {
          this.requiredObjectUpdate = false;
        }
        // if (this.multiSelectGroupInsert[0] === '') {
        //   this.requiredGroupUpdate = false;
        // }
        if (this.onGenderUpdate.length <= 0) {
          this.requiredGenderUpdate = false;
        }
        if (this.requiredObjectUpdate === false || this.requiredGenderUpdate === false || this.form.controls['phone'].invalid
          || this.form.controls['email'].invalid || this.form.controls['fullname'].invalid
          || this.form.controls['dob'].invalid) {
          return;
        }
      }
      // this.validateDropdownInsert();
    } else {
      if (this.form.controls['email'].invalid || this.form.controls['fullname'].invalid || this.form.controls['code'].invalid
        || this.form.controls['dob'].invalid || this.form.controls['phone'].invalid) {
        if (this.permission_update.length <= 0) {
          this.requiredObjectUpdate = false;
        }
        // if (this.multiSelectGroupUpdate[0] === '') {
        //   this.requiredGroupUpdate = false;
        // }
        if (this.onGenderUpdate.length <= 0) {
          this.requiredGenderUpdate = false;
        }
        if (this.requiredObjectUpdate === false || this.requiredGenderUpdate === false || this.form.controls['code'].invalid
          || this.form.controls['email'].invalid || this.form.controls['fullname'].invalid || this.form.controls['phone'].invalid) {
          return;
        }
      } else {
        if (this.permission_update.length <= 0) {
          this.requiredObjectUpdate = false;
        }
        // if (this.multiSelectGroupUpdate[0] === '') {
        //   this.requiredGroupUpdate = false;
        // }
        if (this.onGenderUpdate.length <= 0) {
          this.requiredGenderUpdate = false;
        }
        if (this.requiredObjectUpdate === false || this.requiredGenderUpdate === false) {
          return;
        }
      }
    }
    // if (this.multiSelectGroupUpdate.length <= 0) {
    //   // this.requiredGroupUpdate = false;
    //   return;
    // }
    const group = [];
    if (this.group_update[0] !== undefined && this.group_update.length > 0) {
      if (this.group_update[0]['groups'].length >= 0 && this.group_update[0]['groups'].length >= 0) {
        this.group_update[0]['groups'].forEach(function (item) {
          group.push(item);
        });
      } else {
        this.group_update.forEach(function (item) {
          group.push(item);
        });
      }
      this.group_id = group;
    } else {
      this.group_id = [];
    }
    if (this.selectedObjectUpdate) {
      this.permission_id = this.selectedObjectUpdate[0]['item_id'];
    } else {
      this.permission_id = this.userAccountGetById['users'][0]['permission_id'];
    }
    if (this.selectedGenderUpdate) {
      this.gender_id = this.selectedGenderUpdate[0]['item_id'];
    } else {
      this.gender_id = this.userAccountGetById['users'][0]['gender'];
    }
    if (phoneValue) {
     var position = phoneValue.indexOf(")");
     var extend = phoneValue.substr(position);
     var head = 0;
     var full = head + extend ;
    } else {
      phoneNumber = '';
    }

    //   if (this.province_update || this.province_update.length > 0) {
    //     this.province_id = this.province_update[0];
    //   } else {
    //     this.province_id = '';
    //   }

    // if (this.district_update || this.district_update.length > 0) {
    //   this.district_id = this.district_update[0];
    // } else {
    //   this.district_id = '';
    // }
    // if (this.ward_update || this.ward_update.length > 0) {
    //   this.ward_id = this.ward_update[0];
    // } else {
    //   this.ward_id = '';
    // }

    var uploadData = new FormData();
    var i = 0;
    if (this.password.value !== '') {
      if (this.selectedFile) {
        uploadData.append('picture', this.selectedFile);
      }
      uploadData.append('code', this.code.value);
      uploadData.append('username', this.username.value);
      uploadData.append('permission_id', this.permission_id);
      if (this.group_id.length >= 0) {
        this.group_id.forEach(function (item) {
          uploadData.append("group_user_configuration_id" + "[" + i + "]", item);
          i++;
        });
      }
      uploadData.append('password', this.password.value);
      uploadData.append('email', this.email.value);
      uploadData.append('fullname', this.fullname.value);
      if (this.phone.value) {
        uploadData.append('phone', this.phone.value);
      }
      uploadData.append('dob', this.dob.value);
      uploadData.append('gender', this.gender_id);
      uploadData.append('address', this.address.value);
      // uploadData.append('province', this.province_id);
      // uploadData.append('district', this.district_id);
      // uploadData.append('ward', this.ward_id);
      if (this.province_update && this.province_update.length > 0) {
        uploadData.append('province', this.province_update[0]);
      }
      if (this.district_update && this.district_update.length > 0) {
        uploadData.append('district', this.district_update[0]);
      }
      if (this.ward_update && this.ward_update.length > 0) {
        uploadData.append('ward', this.ward_update[0]);
      }
      if (this.status.value === 1 || this.status.value === true) {
        uploadData.append('status', '1');
      } else {
        uploadData.append('status', '0');
      }

    } else {
      if (this.selectedFile) {
        uploadData.append('picture', this.selectedFile);
      }
      uploadData.append('code', this.code.value);
      uploadData.append('username', this.username.value);
      uploadData.append('permission_id', this.permission_id);
      if (this.group_id.length > 0) {
        this.group_id.forEach(function (item) {
          uploadData.append("group_user_configuration_id" + "[" + i + "]", item);
          i++;
        });
      }
      uploadData.append('email', this.email.value);
      uploadData.append('fullname', this.fullname.value);
      if (this.phone.value) {
        uploadData.append('phone', this.phone.value);
      }
      uploadData.append('dob', this.dob.value);
      uploadData.append('gender', this.gender_id);
      uploadData.append('address', this.address.value);
      // uploadData.append('province', this.province_id);
      // uploadData.append('district', this.district_id);
      // uploadData.append('ward', this.ward_id);
      if (this.province_update && this.province_update.length > 0) {
        uploadData.append('province', this.province_update[0]);
      }
      if (this.district_update && this.district_update.length > 0) {
        uploadData.append('district', this.district_update[0]);
      }
      if (this.ward_update && this.ward_update.length > 0) {
        uploadData.append('ward', this.ward_update[0]);
      }
      // uploadData.append('status', this.status.value);
      if (this.status.value === 1 || this.status.value === true) {
        uploadData.append('status', '1');
      } else {
        uploadData.append('status', '0');
      }
    }

    this.userAccountManagementService.updateUserAccount(id, uploadData).subscribe(
      result => {
        this.selectedProfileUpdate = [];
        $('#editUserAccountModal').modal('hide');
        this.notifyService.showSuccess('Dữ liệu đã được cập nhật thành công', 'Thông báo');
        this.searchByInput();
      },
      error => {
        this.selectedProfileUpdate = [];
        if (error.messages !== undefined) {
          this.notifyService.showError(error.messages['email'], 'Thông báo lỗi');
        }
        if (error.message['email']) {
          this.notifyService.showError(error.message['email'], 'Thông báo lỗi');
        } else if (error.message['user']) {
          this.notifyService.showError(error.message['user'], 'Thông báo lỗi');
        } else if (error.message['group_user_configuration_id']) {
          this.notifyService.showError(error.message['group_user_configuration_id'], 'Thông báo lỗi');
        } else if (error.message['teacher']) {
          this.notifyService.showError(error.message['teacher'], 'Thông báo lỗi');
        } else if (error.message['student']) {
          this.notifyService.showError(error.message['student'], 'Thông báo lỗi');
        } else if (error.message['parent']) {
          this.notifyService.showError(error.message['parent'], 'Thông báo lỗi');
        } else if (error.message['password']) {
          this.notifyService.showError(error.message['password'], 'Thông báo lỗi');
        } else if (error.message['picture']) {
          this.notifyService.showError(error.message['picture'], 'Thông báo lỗi');
        } else if (error.message['permission_id']) {
          this.notifyService.showError(error.message['permission_id'], 'Thông báo lỗi');
        } else if (error.message['fullname']) {
          this.notifyService.showError(error.message['fullname'], 'Thông báo lỗi');
        } else if (error.message['user_id']) {
          this.notifyService.showError(error.message['user_id'], 'Thông báo lỗi');
        } else if (error.message['dob']) {
          this.notifyService.showError(error.message['dob'], 'Thông báo lỗi');
        } else if (error.message['phone']) {
          this.notifyService.showError(error.message['phone'], 'Thông báo lỗi');
        } else if (error.message['gender']) {
          this.notifyService.showError(error.message['gender'], 'Thông báo lỗi');
        } else if (error.message['province']) {
          this.notifyService.showError(error.message['province'], 'Thông báo lỗi');
        } else if (error.message['district']) {
          this.notifyService.showError(error.message['district'], 'Thông báo lỗi');
        } else if (error.message['ward']) {
          this.notifyService.showError(error.message['ward'], 'Thông báo lỗi');
        } else {
          if (error.message) {
            this.notifyService.showError(error.message, 'Thông báo lỗi');
          } else if (error.message.length >= 1) {
            Object.keys(error.message).forEach(function (key) {
              this.notifyService.showError(error.message[key], 'Thông báo lỗi');
            });
          }
        }
      });
  }
  // Xóa tài khoản người sử dụng
  deleteUserAccount(id: number) {
    let isDelete = confirm('Bạn chắc chắn muốn xóa dữ liệu này?');
    if (isDelete) {
      this.userAccountManagementService.deleteUserAccount(id)
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
  // Reset form
  resetUserAccountForm() {
    // this.form.get('username').clearValidators();
    this.form.get('email').clearValidators();
    this.form.get('password').clearValidators();
    this.form.get('confirm_password').clearValidators();
    this.form.get('fullname').clearValidators();
    this.form.get('dob').clearValidators();
    this.form.get('username').clearValidators();
    this.form.get('code').clearValidators();

    this.form.get('email').setValue('');
    this.form.get('password').setValue('');
    this.form.get('confirm_password').setValue('');
    this.form.get('fullname').setValue('');
    this.form.get('dob').setValue('');
    this.form.get('code').setValue('');
    this.form.get('phone').setValue('');
    this.selectGroupInsert['selectedItems'] = [];
    this.selectPermissionInsert['selectedItems'] = [];
    this.selectGenderInsert['selectedItems'] = [];
    this.multiSelectGroupInsert['selectedItems'] = [];
    this.onSelectPermission['selectedItems'] = [];

    this.selectProvince['selectedItems'] = [];
    this.selectDistrictUpdate['selectedItems'] = [];
    this.selectWardUpdate['selectedItems'] = [];
    this.imgURL = null;

    this.requiredPermissionInsert = true;
    this.requiredUserInsert = true;
    // this.requiredGroupInsert = true;
    this.requiredGenderInsert = true;
  }
  active(id: number, status: number) {
    let isDelete = confirm('Bạn muốn thay đổi trạng thái dữ liệu này?');
    if (isDelete) {
      if (status === 1) {
        this.userAccountManagementService.inActiveUserAccount(id)
          .subscribe(
            result => {
              this.notifyService.showSuccess('Thay đổi trạng thái thành công!', 'Thông báo');
              this.searchByInput();
            },
            error => {
              this.notifyService.showError(error, 'Thông báo lỗi');
              this.ngOnDestroy();
            });
      } else {
        this.userAccountManagementService.activeUserAccount(id)
          .subscribe(
            result => {
              this.notifyService.showSuccess('Thay đổi trạng thái thành công!', 'Thông báo');
              this.searchByInput();
            },
            error => {
              this.notifyService.showError(error, 'Thông báo lỗi');
              this.ngOnDestroy();
            });
      }
    }
  }
  // GetById cấu hình nhóm người sử dụng
  arrDistrict = [];
  getByIdUserAccount(id: number) {
    this.changePassword.nativeElement.checked = false;
    this.marked = false;
    this.resetUserAccountForm();
    this.group_update = [];
    this.selectedGroupUpdate = [];
    this.selectedGenderUpdate = [];
    this.selectedProvince = [];
    this.selectedDistrict = [];
    this.selectedWard = [];
    const selectedGroupUpdate = [];
    const selectedGenderUpdate = [];
    const selectedPermissionUpdate = [];
    const selectedProvinceUpdate = [];

    const selectedDistrictUpdate = [];
    const selectedWardUpdate = [];
    const groupUpdateData = this.ddlGroupUpdate;
    const groupData = [];
    this.userAccountManagementService.getByIdUserAccount(id)
      .subscribe(
        result => {
          this.userAccountGetById = result;
          let phone = result['users'][0]['phone'];
          let provice = result['users'][0]['province'];
          let district = result['users'][0]['district'];
          let ward = result['users'][0]['ward'];
          const id = result['users'][0]['id'];
          if(phone){
            var position = phone.indexOf(")");
            var extend = phone.substr(position +1);
            var head = 0;
            var full = head + extend;
            this.phone.value = "123";
          }
          this.userAccountManagementService.getPictureUser(id)
            .subscribe(
              (result) => {
                let url = window.URL.createObjectURL(result);
                this.imgURLUpdate = this.safeUrlPipe.transform(url);
              },
              error => {
                this.imgURLUpdate = null;
              });
          if (provice) {
            this.district_update = [];
            this.district_update.push(provice);
            this.userAccountManagementService.getDistrict(provice)
              .subscribe(
                (data) => {
                  let districtData = data['districts'];
                  const districtObj = [];
                  districtData.forEach(function (item) {
                    districtObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlDistrict = districtObj;
                  var mapDistrict = districtData.map(function (x) { return x.id; }).indexOf(district);
                  selectedDistrictUpdate.push({ 'item_id': districtData[mapDistrict]['id'], 'item_text': districtData[mapDistrict]['name'] });
                  this.selectedDistrict = selectedDistrictUpdate;

                });
          }
          if (district) {
            this.ward_update = [];
            this.ward_update.push(district);
            this.userAccountManagementService.getWard(district)
              .subscribe(
                (data) => {
                  let wardData = data['wards'];
                  const wardObj = [];
                  wardData.forEach(function (item) {
                    wardObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlWard = wardObj;
                  var mapWard = wardData.map(function (x) { return x.id; }).indexOf(ward);
                  selectedWardUpdate.push({ 'item_id': wardData[mapWard]['id'], 'item_text': wardData[mapWard]['name'] });
                  this.selectedWard = selectedWardUpdate;
                });
          }
          let permission = result['users'][0]['permission_id'];
          if (permission) {
            let mapPermission = this.ddlObjectUpdate.map(function (x) { return x.item_id; }).indexOf(permission);
            selectedPermissionUpdate.push({ 'item_id': this.ddlObjectUpdate[mapPermission]['item_id'], 'item_text': this.ddlObjectUpdate[mapPermission]['item_text'] });
            this.selectedObjectUpdate = selectedPermissionUpdate;
            this.permission_update.push(permission);
          }

          let group = result['groups'];
          if (group[0] !== '') {
            group.forEach(function (value, i) {
              var mapGroup = groupUpdateData.map(function (x) { return x.item_id; }).indexOf(group[i]);
              selectedGroupUpdate.push({ 'item_id': groupUpdateData[mapGroup]['item_id'], 'item_text': groupUpdateData[mapGroup]['item_text'] });
            });
            this.selectedGroupUpdate = selectedGroupUpdate;
          }
          let gender = result['users'][0]['gender'];
          if (gender >= 0) {
            var mapGender = this.ddlGender.map(function (x) { return x.item_id; }).indexOf(gender);
            selectedGenderUpdate.push({ 'item_id': this.ddlGender[mapGender]['item_id'], 'item_text': this.ddlGender[mapGender]['item_text'] });
            this.selectedGenderUpdate = selectedGenderUpdate;
            this.onGenderUpdate.push(gender);
          }
          if (provice) {
            this.province_update = [];
            this.province_update.push(provice);
            var mapProvince = this.ddlProvince.map(function (x) { return x.item_id; }).indexOf(provice);
            selectedProvinceUpdate.push({ 'item_id': this.ddlProvince[mapProvince]['item_id'], 'item_text': this.ddlProvince[mapProvince]['item_text'] });
            this.selectedProvince = selectedProvinceUpdate;
          }
          // let code = result['users'][0]['code'];
          // if (code) {
          //   this.code.value = code;
          // }

          if (result['groups'][0] === '') {
            this.multiSelectGroupUpdate = [];
          } else {
            groupData.push({ 'groups': result['groups'] });
            this.multiSelectGroupUpdate = groupData;
          }
          this.group_update = groupData;
          this.form.patchValue(result['users'][0]);
        },
        error => {
          Object.keys(error).forEach(function (key) {
            this.notifyService.showError(error[key], 'Thông báo lỗi');
          });
          this.ngOnDestroy();
        });
  }
  
  times = 1;
  sortFullname(event) {
    const array = this.userAccountData;
    if (this.times === 1) {
      array.sort(function (a, b) {
        let str = a.reverseName;

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
        var nameA = str.toUpperCase(); // bỏ qua hoa thường

        let str2 = b.reverseName;


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

        var nameB = str2.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
      this.times++;
    } else {
      array.reverse(function (a, b) {
        let str = a.reverseName;

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
        var nameA = str.toUpperCase(); // bỏ qua hoa thường

        let str2 = b.reverseName;

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

        var nameB = str2.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
      this.times = 1
    }
    this.userAccountData = array;
  }
  timesEmail = 1;
  sortEmail(event) {
    const array = this.userAccountData;
    if (this.timesEmail === 1) {
      array.sort(function (a, b) {
        let str = a.email;

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
        var nameA = str.toUpperCase(); // bỏ qua hoa thường

        let str2 = b.email;


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

        var nameB = str2.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
      this.timesEmail++;
    } else {
      array.reverse(function (a, b) {
        let str = a.email;

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
        var nameA = str.toUpperCase(); // bỏ qua hoa thường

        let str2 = b.email;
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

        var nameB = str2.toUpperCase(); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
      this.timesEmail = 1
    }
    this.userAccountData = array;
  }
  timesId = 1;
  sortId(event) {
    const array = this.userAccountData;
    if (this.timesId === 1) {
      array.sort(function (a, b) {
        let str = a.id
        var nameA = Number(str) // bỏ qua hoa thường
        let str2 = b.id;
        var nameB = Number(str2); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
      this.timesId++;
    } else {
      array.reverse(function (a, b) {
        let str = a.id;
        var nameA = Number(str); // bỏ qua hoa thường
        let str2 = b.id;
        var nameB = Number(str2); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau
        return 0;
      });
      this.timesId = 1
    }
    this.userAccountData = array;
  }
  
  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
  //setting Phone
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
}


