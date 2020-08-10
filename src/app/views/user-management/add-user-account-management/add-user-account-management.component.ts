import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { UserAccountManagement } from '../../../_models/userAccountManagement';
import { AddressSevice } from '../../../_services/address.service';
import { NotificationService } from '../../../_services/notification.service';
import { SafeUrlPipe } from '../../../_services/safe-url.pipe.service';
import { UserAccountManagementService } from '../service/user-account-managemet.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';

declare var $: any;

@Component({
  selector: 'app-add-user-account-management',
  templateUrl: './add-user-account-management.component.html',
  styleUrls: ['./add-user-account-management.component.css'],
})
export class AddUserAccountManagementComponent implements OnInit {
  imgURL: any;
  ngAfterViewInit() {

  }
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  @ViewChild('selectUserGroup') selectUserGroup: ElementRef;
  @ViewChild('selectPermission') selectPermission: ElementRef;
  @ViewChild('selectGender') selectGender: ElementRef;

  @ViewChild('selectProvince') selectProvince: ElementRef;
  @ViewChild('selectDistrict') selectDistrict: ElementRef;
  @ViewChild('selectWard') selectWard: ElementRef;

  @ViewChild('changePassword') changePassword: ElementRef;
  @ViewChild('selectLinkProfile') selectLinkProfile: ElementRef;
  userAccountManagement: Observable<UserAccountManagement>;
  form: FormGroup;
  selectedFile: File
  submitted = false;

  selectedPermission = [];
  ddlPermissionSettings = {};
  ddlPermissionData = [];
  onSelectPermissionData = [];
  requiredPermission = true;
  permission_id: any;

  selectedUserGroup = [];
  ddlUserGroupData = [];
  ddlGroupUserSettings = {};
  multiSelectGroup = [];
  group_id = [];
  userGroupData: any;

  selectedGender = [];
  ddlGenderSettings = {};
  ddlGenderData: any = [];
  requiredGender = true;
  onGender = [];
  gender_id: any;

  selectedProvince = [];
  ddlProvinceSettings = {};
  ddlProvinceData = [];
  province_update = [];

  selectedDistrict = [];
  ddlDistrictSettings = {};
  ddlDistrictData = [];
  district_update = [];

  selectedWard = [];
  ddlWardSettings = {};
  ddlWardData = [];
  ward = [];

  ddlLinkProfileSettings = {};
  ddlLinkProfileData = [];
  selectedLinkProfile = [];

  constructor(
    private fb: FormBuilder,
    private userAccountManagementService: UserAccountManagementService,
    private notifyService: NotificationService,
    private safeUrlPipe: SafeUrlPipe,
    private router: Router,
    private addressSevice: AddressSevice
  ) { }
  onSelectPermission(item: any) {
    this.onSelectPermissionData = [];
    const arrayGroup = this.onSelectPermissionData;
    const index = this.selectedPermission.indexOf(item['item_id']);
    if (index > -1) {
      arrayGroup.splice(index, 1);
    } else {
      arrayGroup.push(item['item_id']);
    }
    this.onSelectPermissionData = arrayGroup;
    if (arrayGroup.length > 0) {
      this.requiredPermission = true;
    }
  }
  onDeSelectPermission(item: any) {
    this.onSelectPermissionData = [];
    const arrayGroup = this.onSelectPermissionData;
    const index = arrayGroup.indexOf(item['item_id']);
    if (index > -1) {
      arrayGroup.splice(index, 1);
    }
    this.onSelectPermissionData = arrayGroup;
    if (arrayGroup.length <= 0) {
      this.requiredPermission = false;
    }
  }

  onUserGroupSelect(item: any) {
    const arrayGroup = this.multiSelectGroup;
    const group = [];
    const index = this.multiSelectGroup.indexOf(item['item_id']);
    if (index > -1) {
      arrayGroup.splice(index, 1);
    } else {
      arrayGroup.push(item['item_id']);
    }
    group.push({ 'groups': arrayGroup });
    this.multiSelectGroup = group;
  }
  onUserGroupDeSelect(item: any) {
    const arrayGroup = this.multiSelectGroup;
    const arrayAfterUnselect = [];
    const arrayAfterUnselectAll = [];
    if (this.multiSelectGroup.indexOf(item['item_id'] !== undefined)) {
      const index = arrayGroup[0]['groups'].indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup[0]['groups'].splice(index, 1);
      }
      arrayAfterUnselect.push({ 'groups': arrayGroup[0]['groups'] });
      this.multiSelectGroup = arrayAfterUnselect;
    } else {
      const index = arrayAfterUnselectAll.indexOf(item['item_id']);
      if (index > -1) {
        arrayGroup.splice(index, 1);
      }
      arrayAfterUnselectAll.push({ 'groups': arrayGroup });
      this.multiSelectGroup = arrayAfterUnselectAll;
    }
  }
  onUserGroupSelectAll(items: any) {
    const groups = [];
    const userGroups = [];
    items.forEach(function (items) {
      groups.push(items['item_id']);
    });
    userGroups.push({ 'groups': groups });
    this.multiSelectGroup = userGroups;
  }
  onUserGroupDeSelectAll(items: any) {
    const group = [];
    const userGroups = [];
    items.forEach(function (items) {
      group.push(items['item_id']);
    });
    userGroups.push({ 'groups': group });
    this.multiSelectGroup = userGroups;
  }

  onSelectGender(item: any) {
    const gender = [];
    this.requiredGender = true;
    gender.push(item['item_id']);
    this.onGender = gender;
    if (this.onGender.length > 0) {
      this.requiredGender = true;
    }
  }
  onDeSelectGender(item: any) {
    this.requiredGender = false;
    this.onGender = [];
  }

  onSelectWard(item: any) {
    this.ward = [];
    const ward = [];
    ward.push(item['item_id']);
    this.ward = ward;
  }
  onDeSelectWard(item: any) {
    this.ward = [];

  }

  onSelectDistrict(item: any) {
    this.selectWard['selectedItems'] = [];
    this.selectedWard = [];
    this.ward = [];
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
          this.ddlWardData = wardObj;
        });
  }
  onDeSelectDistrict(item: any) {
    this.selectWard['selectedItems'] = [];
    this.selectedWard = [];
    this.ddlWardData = [];
  }

  onSelectProvince(item: any) {
    this.selectDistrict['selectedItems'] = [];
    this.selectWard['selectedItems'] = [];
    this.selectedDistrict = [];
    this.selectedWard = [];
    this.district_update = [];
    this.selectedWard = [];
    this.ddlWardData = [];
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
          this.ddlDistrictData = districtObj;
        });
  }
  onDeSelectProvince(item: any) {
    this.selectDistrict['selectedItems'] = [];
    this.selectWard['selectedItems'] = [];
    this.province_update = [];
    this.selectedWard = [];
    this.ward = [];
    this.selectedDistrict = [];
    this.ddlDistrictData = [];
    this.ddlWardData = [];
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
  get multiAdd(): any {
    return this.form.get('multiAdd');
  }
  get f() { return this.form.controls; }

  ngOnInit() {
    // Data dropdownlist: Giới tính
    this.ddlGenderData = [
      { item_id: 0, item_text: 'Nữ' },
      { item_id: 1, item_text: 'Nam' },
      { item_id: 2, item_text: 'Khác' },
    ];
    this.ddlLinkProfileSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Tìm kiếm',
      noDataAvailablePlaceholderText: 'Không có dữ liệu',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false
    };
    // Setting dropdownlist: Quyền truy cập hệ thống
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
    // Setting dropdownlist: Nhóm người sử dụng
    this.ddlGroupUserSettings = {
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
    // Setting dropdownlist: Giới tính
    this.ddlGenderSettings = {
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
    // Setting dropdownlist: Tỉnh/ Thành phố
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
    // Setting dropdownlist: Quận/ Huyện
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
    // Setting dropdownlist: Xã/ Phường
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

    // Validator add user account form
    this.form = this.fb.group({
      code: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      username: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      confirm_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      group_user: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      address: new FormControl(''),
      multiAdd: new FormControl(true)
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
          this.ddlPermissionData = permissionObj;
        });
    this.userAccountManagementService.listNhom()
      .pipe(first())
      .subscribe(
        (data) => {
          this.userGroupData = data['group_user_configuration'];
          const groupObj = [];
          const groupIdObj = [];
          this.userGroupData.forEach(function (item) {
            groupObj.push({ 'item_id': item['code'], 'item_text': item['code'] + '-' + item['name'] });
          });
          this.userGroupData.forEach(function (item) {
            groupIdObj.push({ 'item_id': item['id'], 'item_text': item['code'] + '-' + item['name'] });
          });
          this.ddlUserGroupData = groupIdObj;
        });
    this.addressSevice.getProvince()
      .subscribe(
        (data) => {
          let provinceData = data['provinces'];
          const provinceObj = [];
          provinceData.forEach(function (item) {
            provinceObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
          });
          this.ddlProvinceData = provinceObj;
        });
        this.userAccountManagementService.getListUsers()
      .subscribe(
        (data) => {
          let profileData = data['object'];
          const profileObj = [];
          profileData.forEach(function (item) {
            profileObj.push({ 'item_id': item['code'], 'item_text': item['code'] + ' - ' + item['fullname'] });
          });
          this.ddlLinkProfileData = profileObj;
        });
  }
  onSelectLinkProfile(item: any){
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
                  this.ddlDistrictData = districtObj;
                  var mapDistrict = districtData.map(function (x) { return x.id; }).indexOf(district);
                  selectedDistrictUpdate.push({ 'item_id': districtData[mapDistrict]['id'], 'item_text': districtData[mapDistrict]['name'] });
                  this.selectedDistrict = selectedDistrictUpdate;

                });
          }
          if (district) {
            this.ward = [];
            this.ward.push(district);
            this.userAccountManagementService.getWard(district)
              .subscribe(
                (data) => {
                  let wardData = data['wards'];
                  const wardObj = [];
                  wardData.forEach(function (item) {
                    wardObj.push({ 'item_id': item['id'], 'item_text': item['name'] });
                  });
                  this.ddlWardData = wardObj;
                  var mapWard = wardData.map(function (x) { return x.id; }).indexOf(ward);
                  selectedWardUpdate.push({ 'item_id': wardData[mapWard]['id'], 'item_text': wardData[mapWard]['name'] });
                  this.selectedWard = selectedWardUpdate;
                });
          }
          let gender = data['object'][0]['gender'];
          if (gender >= 0) {
            var mapGender = this.ddlGenderData.map(function (x) { return x.item_id; }).indexOf(gender);
            selectedGenderInsert.push({ 'item_id': this.ddlGenderData[mapGender]['item_id'], 'item_text': this.ddlGenderData[mapGender]['item_text'] });
            this.selectedGender = selectedGenderInsert;
            this.onGender.push(gender);
            this.requiredGender = true;
          }
          if (provice) {
            this.province_update = [];
            this.province_update.push(provice);
            var mapProvince = this.ddlProvinceData.map(function (x) { return x.item_id; }).indexOf(provice);
            selectedProvinceUpdate.push({ 'item_id': this.ddlProvinceData[mapProvince]['item_id'], 'item_text': this.ddlProvinceData[mapProvince]['item_text'] });
            this.selectedProvince = selectedProvinceUpdate;
          }
          this.form.patchValue(data['object'][0]);
        });
  }
  onDeSelectLinkProfile(itme: any){
    this.resetUserAccountForm();
    this.code.value = [];
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    this.selectedFile = files[0];
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.notifyService.showError('Chỉ hỗ trợ định dạng file ảnh', 'Thông báo lỗi');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
  onSubmit() {
    let phoneNumber;
    this.form.get('code').setValidators([Validators.minLength(2), Validators.maxLength(50)]);
    this.form.get('code').updateValueAndValidity();
    this.form.get('email').setValidators([Validators.required, Validators.email, Validators.maxLength(100)]);
    this.form.get('email').updateValueAndValidity();
    this.form.get('fullname').setValidators([Validators.required]);
    this.form.get('fullname').updateValueAndValidity();
    this.form.get('dob').setValidators([Validators.required]);
    this.form.get('dob').updateValueAndValidity();
    this.form.get('password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('password').updateValueAndValidity();
    this.form.get('confirm_password').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(100)]);
    this.form.get('confirm_password').updateValueAndValidity();
    this.submitted = true;
    let phoneValue = this.form.controls['phone'].value['internationalNumber'];
    if (this.form.controls['email'].invalid || this.form.controls['dob'].invalid
      || this.form.controls['password'].invalid || this.form.controls['confirm_password'].invalid || this.form.controls['phone'].invalid) {
      if (this.onSelectPermissionData.length <= 0) {
        this.requiredPermission = false;
      }
      if (this.onGender.length <= 0) {
        this.requiredGender = false;
      }
      if (this.requiredPermission === false || this.requiredGender === false) {
        return;
      }
    } else {
      if (this.onSelectPermissionData.length <= 0) {
        this.requiredPermission = false;
      }
      if (this.onGender.length <= 0) {
        this.requiredGender = false;
      }
      if (this.requiredPermission === false || this.requiredGender === false || this.form.controls['email'].invalid
        || this.form.controls['dob'].invalid || this.form.controls['password'].invalid || this.form.controls['confirm_password'].invalid
        || this.form.controls['phone'].invalid) {
        return;
      }
    }
    const group = [];
    if (this.multiSelectGroup.length !== 0 && this.multiSelectGroup[0]['groups'] === undefined) {
      this.group_id = this.multiSelectGroup;
      this.multiSelectGroup[0]['groups'].forEach(function (item) {
        group.push(item);
      });
      this.group_id = group;
    } else {
      this.selectedUserGroup.forEach(function (item) {
        group.push(item['item_id']);
      });
      this.group_id = group;
    }
    if (this.onSelectPermissionData) {
      this.permission_id = this.onSelectPermissionData[0];
    } else {
      this.permission_id = [];
    }

    if (this.onGender) {
      this.gender_id = this.onGender[0];
    } else {
      this.gender_id = [];
    }
    if (phoneValue) {
      var tel = phoneValue.indexOf(" "); 
      var extenTel = phoneValue.substr(tel + 1 );
      var head = "("+phoneValue.substr(0,tel)+")";
      var full = head + extenTel ;
      phoneNumber = full;
    } 
    else {
      phoneNumber = '';
    }
    // return;
    var uploadData = new FormData();
    var i = 0;

    if (this.selectedFile) {
      uploadData.append('picture', this.selectedFile);
    }
    uploadData.append('code', this.code.value);
    // uploadData.append('username', this.username.value);
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
      uploadData.append('phone', phoneNumber);
    }
    uploadData.append('dob', this.dob.value);
    uploadData.append('gender', this.gender_id);
    uploadData.append('address', this.address.value);
    if (this.province_update && this.province_update.length > 0) {
      uploadData.append('province', this.province_update[0]);
    }
    // uploadData.append('province', this.province_id);
    if (this.district_update && this.district_update.length > 0) {
      // this.district_id = this.district_update[0];
      uploadData.append('district', this.district_update[0]);
    }
    // uploadData.append('district', this.district_id);
    if (this.ward && this.ward.length > 0) {
      // this.ward_id = this.ward[0];
      uploadData.append('ward', this.ward[0]);
    }
    // uploadData.append('ward', this.ward_id);

    // var formData = new FormData();
    // formData.append('import_excel', this.fileInput.nativeElement.files[0]);
    this.userAccountManagementService.insertUserAccount(uploadData).subscribe(
      result => {
        // this.onSelectObjectInsert = [];
        this.onSelectPermissionData = [];
        this.group_id = [];
        $('#addUserAccountModal').modal('hide');
        this.notifyService.showSuccess(result.message, 'Thông báo');
        if (this.multiAdd.value === true) {
          this.resetUserAccountForm();
        } else {
          this.router.navigate(['/user-management/user-account-management']);
        }
        // this.ngOnDestroy();
      },
      error => {
        // this.onSelectPermission = [];
        // this.multiSelectGroupInsert = [];
        // this.onGender = [];
        if (error.message['email']) {
          this.notifyService.showError(error.message['email'], 'Thông báo lỗi');
        } else if (error.message['password']) {
          this.notifyService.showError(error.message['password'], 'Thông báo lỗi');
        } else if (error.message['teacher']) {
          this.notifyService.showError(error.message['teacher'], 'Thông báo lỗi');
        } else if (error.message['student']) {
          this.notifyService.showError(error.message['student'], 'Thông báo lỗi');
        } else if (error.message['parent']) {
          this.notifyService.showError(error.message['parent'], 'Thông báo lỗi');
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
        }else {
          Object.keys(error.message).forEach(function (key) {
            this.notifyService.showError(error.message[key], 'Thông báo lỗi');
          });
        }
      });
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
    this.selectUserGroup['selectedItems'] = [];
    this.selectedUserGroup = [];
    this.selectPermission['selectedItems'] = [];
    this.selectGender['selectedItems'] = [];
    this.selectedGender = [];
    this.multiSelectGroup['selectedItems'] = [];
    this.onSelectPermissionData['selectedItems'] = [];
    this.selectedPermission = [];
    this.imgURL = null;
    this.selectProvince['selectedItems'] = [];
    this.selectedProvince = [];
    this.selectDistrict['selectedItems'] = [];
    this.selectedDistrict = [];
    this.selectWard['selectedItems'] = [];
    this.selectedWard = [];
    this.selectLinkProfile['selectedItems'] = [];
    this.selectedLinkProfile = [];

    this.requiredPermission = true;
    this.requiredGender = true;
  }
  // Refresh
  ngOnDestroy() {
    this.ngOnInit();
  }
  goBack() {
    this.router.navigate(['/user-management/user-account-management']);
  }
  //setting Phone
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
	CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
}
