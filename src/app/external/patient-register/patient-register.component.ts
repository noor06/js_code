import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { PatientService } from "src/app/services/patient.service";
import {
  ConfigurationOptions,
  ContentOptionsEnum,
  CustomCountryModel
} from "intl-input-phone";
import { EMAIL_REGEX } from "../../shared_config";

@Component({
  selector: "app-patient-register",
  templateUrl: "./patient-register.component.html",
  styleUrls: ["./patient-register.component.css"]
})
export class PatientRegisterComponent implements OnInit {
  public register_form: FormGroup;
  confirmPassFlag = false;
  confirmPassCheck = false;
  loading = false;

  customCountryList: CustomCountryModel[] = [];

  SelectedCountryISOCode = "US";
  IsRequired: boolean = true;
  configOption: ConfigurationOptions;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private patientService: PatientService
  ) {
    this.register_form = this.fb.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ])
      ],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone: ["", Validators.required],
      sex: ["", Validators.required],
      blood_group: ["", Validators.required],
      address: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      dob: ["", Validators.required]
    });

    this.configOption = new ConfigurationOptions();
    this.configOption.OptionTextTypes = [];
    this.configOption.IsShowAllOtherCountry = false;
    // this.customCountryList.push({ISOCode : "IN"});
    this.customCountryList.push({ ISOCode: "US" });
    this.configOption.IsShowSearchOption = false;
    this.configOption.OptionTextTypes.push(ContentOptionsEnum.Flag);
    this.configOption.OptionTextTypes.push(ContentOptionsEnum.CountryName);
    this.configOption.OptionTextTypes.push(ContentOptionsEnum.CountryPhoneCode);
  }

  ngOnInit() {}

  onNumberChage(e) {
    this.register_form.controls["phone"].patchValue(e.Number);
  }

  requiredFlagChange(e) {
    if (!e) {
      //   this.toastr.error("Please enter valid phone number");
    }
  }

  cancel() {
    this.router.navigateByUrl("/login");
  }

  checkPass(e) {
    const password = this.register_form.controls["password"].value;
    const confirm_password = this.register_form.controls["confirmPassword"]
      .value;

    if (password !== "" && confirm_password !== "") {
      this.confirmPassCheck = true;
      if (password === confirm_password) {
        this.confirmPassFlag = true;
      } else {
        this.confirmPassFlag = false;
      }
    } else {
      this.clearCheck();
    }
  }

  clearCheck() {
    this.confirmPassFlag = false;
    this.confirmPassCheck = false;
  }

  register() {
    if (this.register_form.valid) {
      if (this.confirmPassFlag) {
        this.loading = true;
        const patient = {
          email: this.register_form.controls["email"].value,
          first_name: this.register_form.controls["first_name"].value,
          last_name: this.register_form.controls["last_name"].value,
          phone: this.register_form.controls["phone"].value,
          sex: this.register_form.controls["sex"].value,
          dob: this.register_form.controls["dob"].value,
          blood_group: this.register_form.controls["blood_group"].value,
          address: this.register_form.controls["address"].value,
          password: this.register_form.controls["password"].value,
          isActive: true
        };
        this.patientService.register(patient).subscribe(response => {
          this.loading = false;
          if (response.status === "200") {
            this.toastr.success(response.message);
            this.register_form.reset();
            this.router.navigateByUrl("/");
          }
        });
      }
    } else {
      Object.keys(this.register_form.controls).forEach(key => {
        this.register_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }
}
