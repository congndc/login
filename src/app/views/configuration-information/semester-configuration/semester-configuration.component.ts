import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from '../../../_services/notification.service';

@Component({
  selector: 'app-semester-configuration',
  templateUrl: './semester-configuration.component.html',
  styleUrls: ['./semester-configuration.component.scss']
})
export class SemesterConfigurationComponent implements OnInit {
  form: FormGroup;
  p: number = 1;
  countPage: number = 10;
  totalItems = 0;
  submitted = false;
  checkSemesterConfigurationData = true;
  checkStatus : any;
  //drop năm học
  dropdownListYear = [];
  selectedYear = [];
  dropdownSettings = {};
  requiredYearSearchField = true;
  //drop năm học
  perPageSelected(id: number) {
    this.countPage = id;
    this.p = 1;
  }
  get status(): any {
    return this.form.get('status');
  }
  get statusFilter(): any {
    return this.form.get('statusFilter');
  }
  get f() { return this.form.controls; }
 
  // Validate form
  
  onSubmit(){

  }
  semesterConfigurationGetById: any;
 //data cứng
  semesterConfigurationData=[
    {
      schoolYear: 2014,
      semesterCode: 1,
      semesterName: "Học kỳ 1",
      startTime: 2014,
      endTime: 2014,
    },
    {
      schoolYear: 2014,
      semesterCode: 2,
      semesterName: "Học kỳ 2",
      startTime: 2014,
      endTime: 2014,
    },
    {
      schoolYear:2015,
      semesterCode: 3,
      semesterName: "Học kỳ 1",
      startTime: 2015,
      endTime: 2015,
    },
    {
      schoolYear: 2015,
      semesterCode: 4,
      semesterName: "Học kỳ 2",
      startTime: 2015,
      endTime: 2015,
    },
    {
      schoolYear: 2016,
      semesterCode: 5,
      semesterName: "Học kỳ 1",
      startTime: 2016,
      endTime: 2016,
    },
    {
      schoolYear: 2016,
      semesterCode: 6,
      semesterName: "Học kỳ 2",
      startTime: 2016,
      endTime: 2016,
    },
    {
      schoolYear: 2017,
      semesterCode: 7,
      semesterName: "Học kỳ 1",
      startTime: 2017,
      endTime: 2017,
    },
    {
      schoolYear: 2017,
      semesterCode: 8,
      semesterName: "Học kỳ 2",
      startTime: 2017,
      endTime: 2017,
    },
    {
      schoolYear: 2018,
      semesterCode: 9,
      semesterName: "Học kỳ 1",
      startTime: 2018,
      endTime: 2018,
    },
    {
      schoolYear: 2018,
      semesterCode: 10,
      semesterName: "Học kỳ 2",
      startTime: 2018,
      endTime: 2018,
    },
    {
      schoolYear: 2019,
      semesterCode: 11,
      semesterName: "Học kỳ 1",
      startTime: 2019,
      endTime: 2019,
    },
    {
      schoolYear: 2019,
      semesterCode: 12,
      semesterName: "Học kỳ 2",
      startTime: 2019,
      endTime: 2019,
    },
    {
      schoolYear: 2020,
      semesterCode: 13,
      semesterName: "Học kỳ 1",
      startTime: 2020,
      endTime: 2020,
    },
    {
      schoolYear: 2020,
      semesterCode: 14,
      semesterName: "Học kỳ 2",
      startTime: 2020,
      endTime: 2020,
    },
  ];
  constructor(
    private fb: FormBuilder,
    private notifyService: NotificationService,
  ) { }
    
  ngOnInit(): void {
    this.form = this.fb.group({
      semesterCode: new FormControl('',[Validators.required]),
      semesterName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
      schoolYear: new FormControl(''),
      startTime: new FormControl(''),       
      endTime: new FormControl(''),       
      status: new FormControl(''),
      statusActive: new FormControl(true),
      checkBox : new FormControl(this.checkStatus),
    });
    //setting dropdown năm học
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
    //setting dropdown năm học
  }
  //chọn 1
  onItemSelect(){
    
  }
  //chọn 1
  //chọn tất cả
  onSelectAll(){

  }
  //chọn tất cả
  //bỏ chọn 1
  onItemDeSelect(){

  }
  //bỏ chọn 1
  //bỏ chọn tất cả
  onItemDeSelectAll(){

  }
  //bỏ chọn tất cả
  // sort
  //sort năm học
  timesYear =1;
  sortSchoolYear(){
    const array = this.semesterConfigurationData;
    if (this.timesYear === 1) {
      array.sort(function (a, b) {
        let str = a.schoolYear
        var nameA = Number(str) // bỏ qua hoa thường
        let str2 = b.schoolYear;
        var nameB = Number(str2); // bỏ qua hoa thường
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // name trùng nhau trả về 0
        return 0;
      });
      this.timesYear++;
    } else {
      array.reverse();
      this.timesYear = 1
    }

   this.semesterConfigurationData = array;
  }
  //sort mã học kỳ
  timesId =1;
  sortSemesterCode(){
    const array = this.semesterConfigurationData;
    if (this.timesId === 1) {
      array.sort(function (a, b) {
        let str = a.semesterCode
        var nameA = Number(str) // bỏ qua hoa thường
        let str2 = b.semesterCode;
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
      //
      array.reverse();
      this.timesId = 1
    }

   this.semesterConfigurationData = array;
  }
  //sort tên học kỳ
  timesName=1;
  sortSemesterName(){
    const array = this.semesterConfigurationData;
    if (this.timesName === 1) {
      array.sort(function (a, b) {
        let str = a.semesterName;

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

        let str2 = b.semesterName;


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
      this.timesName++;
    } else {
      array.reverse();
      this.timesName = 1
    }
    this.semesterConfigurationData = array;
  }
  // sort
  //reset form click Thêm mới
  resetSemesterConfigurationForm(){

  }
  //tìm kiếm
  searchByKeyWord(search: any){

    let status;
    if (this.statusFilter.value) {
      status = 'active';
    } else {
      status = 'inactive';
    }
    if (search.trim() === '') {
      this.notifyService.showError('Vui lòng điền từ khóa tìm kiếm!', 'Thông báo lỗi');
      this.checkSemesterConfigurationData = false;
      this.semesterConfigurationData = [];
      this.p = 1;
      this.totalItems = 1;
    }
  }
  
  //button sửa
  getByIdSemesterConfiguration(){

  }
  //button xóa
  deleteSemesterConfiguration(){

  }
  //Thêm mới modal
  addSemesterConfiguration(){

  }
  //Cập nhật
  updateSemesterConfiguration(){
    
  }
}
