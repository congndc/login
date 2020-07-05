import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../../../_services";
import { NotificationService } from "../../../_services/notification.service";

@Component({
  selector: "app-User-group-configuration",
  templateUrl: "./User-group-configuration.component.html",
  styleUrls: ["./User-group-configuration.component.scss"],
})
export class UserGroupConfigurationComponent implements OnInit {
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
      username: {
        title: "Khối",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "Antonette", title: "Antonette" },
              { value: "Bret", title: "Bret" },
              {
                value: "<b>Samantha</b>",
                title: "Samantha",
              },
            ],
          },
        },
      },
      class: {
        title: "Lớp",
        type: "html",
        editor: {
          type: "list",
          config: {
            list: [
              { value: "Antonette", title: "Antonette" },
              { value: "Bret", title: "Bret" },
              {
                value: "<b>Samantha</b>",
                title: "Samantha",
              },
            ],
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
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifyService: NotificationService
  ) {}
  dmKhoi: any[] = [];
  dmLop: any[] = [];
  ngOnInit() {
    this.authenticationService.gradeList().subscribe((data) => {
      let khoi = data["grades"][0];
      this.dmKhoi = khoi;
    });
    this.authenticationService.classList().subscribe((data) => {
      let lop = data["classes"][0];
      this.dmLop = lop;
    });
  }
}
