import { EMAIL_REGEX, white_space_regex } from "./../../shared_config";
import { DepartmentService } from "src/app/services/department.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DoctorService } from "src/app/services/doctor.service";
import { HospitalService } from "src/app/services/hospital.service";
import { CustomCountryModel, ConfigurationOptions } from "intl-input-phone";
import { Ng7DynamicBreadcrumbService } from "ng7-dynamic-breadcrumb";
import * as moment from "moment";

@Component({
  selector: "app-add-doctor-form",
  templateUrl: "./add-doctor-form.component.html",
  styleUrls: ["./add-doctor-form.component.css"]
})
export class AddDoctorFormComponent implements OnInit {
  hospitalId: any;
  public doctor_form: FormGroup;
  loading = false;
  role;
  hospital;
  departments;
  specialities;
  selected_image;

  maxDate: Date;

  bread_route;

  // for multiselect dropdown
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  IsRequired = false;

  customCountryList: CustomCountryModel[] = [];
  configOption: ConfigurationOptions;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private doctorService: DoctorService,
    private departmentService: DepartmentService,
    private hospitalService: HospitalService,
    private bservice: Ng7DynamicBreadcrumbService
  ) {
    window.scroll(0, 0);

    //config 1
    this.configOption = new ConfigurationOptions();
    this.configOption.SelectorClass = "add_doctor_intl";
    this.configOption.IsShowAllOtherCountry = false;
    this.configOption.IsShowSearchOption = false;
    this.customCountryList.push({ ISOCode: "US" });

    this.doctor_form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ])
      ],
      phone: ["", Validators.required],
      gender: ["", Validators.required],
      blood_group: ["", Validators.required],
      dob: ["", Validators.required],
      specialities: ["", Validators.required],
      designation: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      description: [""],
      address: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      experience: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]*$/)
        ])
      ],
      department: ["", Validators.required],
      start_time: ["06:00", Validators.required],
      end_time: ["18:00", Validators.required],
      days: ["", Validators.required],
      past_positions: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      qualification: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      profile_pic: [""]
    });
  }

  validateTimeShift(start, end) {
    const flag = moment(`${start}:00`, "HH:mm:ss").isSameOrBefore(
      moment(`${end}:00`, "HH:mm:ss")
    );

    const start_flag = moment(`${start}:00`, "HH:mm:ss").isBefore(
      moment(`${this.hospital.timing_from}:00`, "HH:mm:ss")
    );

    const end_flag = moment(`${end}:00`, "HH:mm:ss").isAfter(
      moment(`${this.hospital.timing_to}:00`, "HH:mm:ss")
    );

    if (!start_flag && !end_flag && flag) {
      return true;
    } else {
      this.toastr.error("Please select valid timings");
      return false;
    }
  }

  getDepartments(hospitalId) {
    this.departmentService.getDepartments(hospitalId).subscribe(res => {
      if (res.status) {
        this.departments = res.departments;
      }
    });
  }

  getSpecialities(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {
      if (res.status) {
        this.specialities = JSON.parse(res.hospital.specialities);
      }
    });
  }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    if (window.location.pathname.includes("/admin/")) {
      this.bread_route = "/admin/doctor";
    } else if (window.location.pathname.includes("/faculty/")) {
      this.bread_route = "/faculty/doctor";
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("/admin/")) {
          this.bread_route = "/admin/doctor";
        }
      }
    });

    this.dropdownList = [
      { id: "Sun", text: "Sunday" },
      { id: "Mon", text: "Monday" },
      { id: "Tue", text: "Tuesday" },
      { id: "Wed", text: "Wednesday" },
      { id: "Thu", text: "Thursday" },
      { id: "Fri", text: "Friday" },
      { id: "Sat", text: "Saturday" }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: "id",
      textField: "text",
      enableCheckAll: false,
      itemsShowLimit: 7,
      allowSearchFilter: true
    };

    this.route.params.subscribe(res => {
      this.hospitalId = res.hospital_id;
      this.getHospital(this.hospitalId);
      this.getDepartments(this.hospitalId);
    });

    const decodedToken = JSON.parse(
      window.atob(localStorage.getItem("accessToken").split(".")[1])
    );
    this.role = decodedToken.role;
    this.doctor_form.controls["specialities"].patchValue("");
  }

  redirect() {
    if (this.role === "Clinic") {
      this.router.navigateByUrl("clinic/doctor");
    } else if (this.role === "Admin") {
      this.router.navigateByUrl("admin/doctor");
    }
  }

  onItemSelect(item: any) {
    // console.log(this.doctor_form.controls["days"].valsue);
  }
  onSelectAll(items: any) {
    // console.log(this.doctor_form.controls["days"].value);
  }
  onItemDeSelect(item: any) {
    // console.log(this.doctor_form.controls["days"].value);
  }

  getHospital(id) {
    this.hospitalService.get_hospital(id).subscribe(res => {
      this.hospital = res.hospital;
      console.log(this.hospital);
    });
  }

  back() {
    if (this.role === "Clinic") {
      this.router.navigateByUrl(`clinic/doctor`);
    } else if (this.role === "Admin") {
      this.router.navigateByUrl(`admin/doctor`);
    }
  }

  onNumberChange(e) {
    this.doctor_form.controls["phone"].patchValue(e.Number);
  }

  changed(e) {
    console.log("asjkhckdsu");
  }

  upload(e) {
    this.doctor_form.controls["profile_pic"].patchValue(e.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = _event => {
      this.selected_image = reader.result;
    };
  }

  addDoctor() {
    if (
      this.doctor_form.valid &&
      this.validateTimeShift(
        this.doctor_form.controls["start_time"].value,
        this.doctor_form.controls["end_time"].value
      )
    ) {
      if (
        !this.doctor_form.controls["profile_pic"].value ||
        this.doctor_form.controls["profile_pic"].value === ""
      ) {
        alert("Please select profile picture.");
        return;
      }

      this.loading = true;

      const temp_days = this.doctor_form.controls["days"].value;
      var days = [];
      temp_days.forEach((item, i) => {
        days.push(item.id);
      });

      const temp_pass = `${new Date()
        .getTime()
        .toString()
        .substring(4, 10)}#*#2019`;

      const formData = new FormData();
      formData.append("name", this.doctor_form.controls["name"].value);
      formData.append("email", this.doctor_form.controls["email"].value);
      formData.append("phone", this.doctor_form.controls["phone"].value);
      formData.append(
        "specialities",
        this.doctor_form.controls["specialities"].value
      );
      formData.append("dob", this.doctor_form.controls["dob"].value);
      formData.append("password", temp_pass);
      formData.append("password_to_be_sent", temp_pass);
      formData.append("address", this.doctor_form.controls["address"].value);
      formData.append("gender", this.doctor_form.controls["gender"].value);
      formData.append(
        "description",
        this.doctor_form.controls["description"].value
      );
      formData.append(
        "blood_group",
        this.doctor_form.controls["blood_group"].value
      );
      formData.append(
        "qualification",
        this.doctor_form.controls["qualification"].value
      );
      formData.append(
        "designation",
        this.doctor_form.controls["designation"].value
      );
      formData.append(
        "experience",
        this.doctor_form.controls["experience"].value
      );
      formData.append(
        "department",
        this.doctor_form.controls["department"].value
      );
      formData.append(
        "past_positions",
        this.doctor_form.controls["past_positions"].value
      );
      formData.append("hospitalId", this.hospitalId);
      formData.append(
        "start_time",
        this.doctor_form.controls["start_time"].value
      );
      formData.append(
        "profile_pic",
        this.doctor_form.controls["profile_pic"].value
      );
      formData.append("end_time", this.doctor_form.controls["end_time"].value);
      formData.append("working_days", JSON.stringify(days));

      this.doctorService.add_doctor(formData).subscribe(res => {
        this.loading = false;
        if (res.status === "200") {
          this.loading = false;
          this.toastr.success(res.message);
          if (this.role === "Clinic") {
            this.router.navigateByUrl(`clinic/doctor`);
          } else if (this.role === "Admin") {
            this.router.navigateByUrl(`admin/doctor`);
          }
        } else if (res.status === "406") {
          this.toastr.error(res.message);
          this.loading = false;
        } else {
          this.loading = false;
        }
      });
    } else {
      Object.keys(this.doctor_form.controls).forEach(key => {
        this.doctor_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  open() {}
}
