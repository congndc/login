import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../_services/notification.service";
import { AuthenticationService } from "../../../_services";
import * as XLSX from "xlsx";
import { ExcelServicesService } from "../../../_services/excel.service";
import { HttpClient } from "@angular/common/http";
import { Contact } from "../../../_models/contact.model";
import * as faker from 'faker';
@Component({
  selector: "app-User-group-configuration",
  templateUrl: "./User-group-configuration.component.html",
  styleUrls: ["./User-group-configuration.component.scss"],
})
export class UserGroupConfigurationComponent implements OnInit {
  title = "excel-upload-download";
  excel = [];
  importContacts: Contact[] = [];
  exportContacts: Contact[] = [];
  submitted = false;
  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    protected authenticationService: AuthenticationService,
    private notifyService: NotificationService,
    private excelService: ExcelServicesService,
    private http: HttpClient
  ) {}
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.excel, "sample");
  }
  
  // onFileChange(evt: any) {
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {

  //     const bstr: string = e.target.result;
  //     const data = <any[]>this.excelService.importFromFile(bstr);

  //     const header: string[] = Object.getOwnPropertyNames(new Contact());
  //     const importedData = data.slice(1, -1);

  //     this.importContacts = importedData.map(arr => {
  //       const obj = {};
  //       for (let i = 0; i < header.length; i++) {
  //         const k = header[i];
  //         obj[k] = arr[i];
  //       }
  //       return <Contact>obj;
  //     })

  //   };
  //   reader.readAsBinaryString(target.files[0]);

  // }

  // exportData(tableId: string) {
  //   this.excelService.exportToFile("contacts", tableId);
  // }

  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      comments:
        "Lorem ipsum dolor sit amet, ex dolorem officiis convenire usu.",
      passed: "Yes",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      comments: `Vix iudico graecis in? Malis eirmod consectetuer duo ut?
                Mel an aeterno vivendum accusata, qui ne amet stet definitiones.`,
      passed: "Yes",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      comments:
        "Mollis latine intellegebat ei usu, veri exerci intellegebat vel cu. Eu nec ferri copiosae.",
      passed: "No",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      username: "Karianne",
      email: "Julianne.OConner@kory.org",
      comments:
        "Eu sea graece corrumpit, et tation nominavi philosophia eam, veri posidonium ex mea?",
      passed: "Yes",
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      username: "Kamren",
      email: "Lucio_Hettinger@annie.ca",
      comments: `Quo viris appellantur an, pro id eirmod oblique iuvaret,
                timeam omittam comprehensam ad eam? Eos id dico gubergren,
                cum dicant qualisque ea, id vim ferri moderatius?`,
      passed: "No",
    },
    {
      id: 6,
      name: "Mrs. Dennis Schulist",
      username: "Leopoldo_Corkery",
      email: "Karley_Dach@jasper.info",
      comments: "Audire appareat sententiae qui no. Sed no rebum vitae quidam.",
      passed: "No",
    },
    {
      id: 7,
      name: "Kurtis Weissnat",
      username: "Elwyn.Skiles",
      email: "Telly.Hoeger@billy.biz",
      comments: `Mel dicat sanctus accusata ut! Eu sit choro vituperata,
                qui cu quod gubergren elaboraret, mollis vulputate ex cum!`,
      passed: "Yes",
    },
    {
      id: 8,
      name: "Nicholas Runolfsdottir V",
      username: "Maxime_Nienow",
      email: "Sherwood@rosamond.me",
      comments: "Cu usu nostrum quaerendum, no eripuit sanctus democritum cum.",
      passed: "No",
    },
    {
      id: 9,
      name: "Glenna Reichert",
      username: "Delphine",
      email: "Chaim_McDermott@dana.io",
      comments:
        "In iisque oporteat vix, amet volutpat constituto sit ut. Habeo suavitate vis ei.",
      passed: "No",
    },
    {
      id: 10,
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      comments: `Lorem ipsum dolor sit amet, causae fuisset ea has, adhuc tantas interesset per id.
                 Ne vocibus persequeris has, meis lucilius ex mea, illum labores contentiones pro in?`,
      passed: "Yes",
    },
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz",
      comments: "Lorem ipsum dolor sit amet, mea dolorum detraxit ea?",
      passed: "No",
    },
  ];

  settings = {
    columns: {
      id: {
        title: "ID",
      },
      name: {
        title: "Mã nhóm",
        editor: {
          type: "completer",
          config: {
            completer: {
              data: this.data,
              searchFields: "name",
              titleField: "name",
              descriptionField: "email",
            },
          },
        },
      },
      groupName: {
        title: "Tên nhóm",
        editor: {
          type: "completer",
          config: {
            completer: {
              data: this.data,
              searchFields: "name",
              titleField: "name",
              descriptionField: "email",
            },
          },
        },
      },
      grade: {
        title: "Khối",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [{ value: {} }],
          },
        },
      },
      class: {
        title: "Lớp",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [{}],
          },
        },
      },
      status: {
        title: "Trạng thái",
        editor: {
          type: "checkbox",
          config: {
            true: "Yes",
            false: "No",
          },
        },
      },
      note: {
        title: "Ghi chú",
        type: "string",
      },
      // comments: {
      //   title: 'Comments',
      //   editor: {
      //     type: 'textarea',
      //   },
      // },
    },
  };
  dmKhoi: any[] = [];
  dmLop: any[] = [];
  ngOnInit() {
    this.submitted = true;
    this.authenticationService.gradeList().subscribe((datas) => {
      let khoi = datas["grades"];
      this.dmKhoi = khoi;
    });
    this.authenticationService.classList().subscribe((datas) => {
      let lop = datas["classes"];
      this.dmLop = lop;
    });

    for (let i = 0; i <= 25; i++) {
      this.excel.push({
        firstName: `first${i}`,
        lastName: `last${i}`,
        email: `abc${i}@gmail.com`,
        address: `000${i} street city, ST`,
        zipcode: `0000${i}`,
      });
    } 
    // call api thay code cung

    // for (let index = 0; index < 10; index++) {
    //   const contact = new Contact();
    //   contact.name = faker.name.findName();
    //   contact.phone = faker.phone.phoneNumber();
    //   contact.email = faker.internet.email();
    //   contact.address = faker.address.streetAddress();
    //   this.exportContacts.push(contact);
    // }
  }
}
