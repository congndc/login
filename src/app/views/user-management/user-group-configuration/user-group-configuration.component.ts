import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-User-group-configuration",
  templateUrl: "./User-group-configuration.component.html",
  styleUrls: ["./User-group-configuration.component.scss"],
})
export class UserGroupConfigurationComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: "Mã nhóm",
      },
      name: {
        title: "Tên nhóm",
      },
      username: {
        title: "Toàn trường",
      },
      grade: {
        title: "Khối",
      },
      class: {
        title: "Lớp",
      },
      status: {
        title: "Trạng thái",
      },
      note: {
        title: "Ghi chú",
      },
    },
  };
  data = {
    
  };
  oppoGrades: any = ["Khối 1", "Khối 2", "Khối 3", "Khối 4", "Khối 5"];
  oppoClass: any = ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"];
  oppoStatus:any = ["Sử dụng", "Không sử dụng"];
  constructor(public fb: FormBuilder) {}
  oppoGradesForm = this.fb.group({
    name: [""],
  });
  oppoClassForm = this.fb.group({
    name: [""],
  });
  oppoStatusForm = this.fb.group({
    name: [""],
  });
  ngOnInit() {}
}
