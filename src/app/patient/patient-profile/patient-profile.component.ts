import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PatientService } from "src/app/services/patient.service";
import { ConfigurationOptions, CustomCountryModel } from "intl-input-phone";
import { API_URL } from "../../shared_config";

@Component({
  selector: "app-patient-profile",
  templateUrl: "./patient-profile.component.html",
  styleUrls: ["./patient-profile.component.css"]
})
export class PatientProfileComponent implements OnInit {
  public patient_profile_form: FormGroup;
  patient;
  isEdit = false;

  customCountryList: CustomCountryModel[] = [];
  configOption: ConfigurationOptions;

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.patient_profile_form = this.fb.group({
      email: ["", Validators.required],
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      address: ["", Validators.required],
      phone: ["", Validators.required]
    });

    //config
    this.configOption = new ConfigurationOptions();
    this.configOption.SelectorClass = "patient_profile_intl";
    this.configOption.IsShowAllOtherCountry = false;
    this.configOption.IsShowSearchOption = false;
    this.customCountryList.push({ ISOCode: "US" });
  }

  ngOnInit() {
    this.getLoggedPatient(localStorage.getItem("loggedPatient"));
  }

  getLoggedPatient(email) {
    this.patientService.get_patient(email).subscribe(res => {
      if (res.status) {
        this.patient = res.patient;
        if (this.patient.profile_pic) {
          this.patient.profile_pic = `${API_URL}/${this.patient.profile_pic}`;
        }
        this.patient.full_name = `${this.patient.first_name} ${
          this.patient.last_name
        }`;
      }
    });
  }

  image_upload(e) {
    const file = e.target.files[0];
    var formData = new FormData();
    formData.append("profile", file);
    formData.append("email", localStorage.getItem("loggedPatient"));
    this.patientService.update_profile_picture(formData).subscribe(res => {
      if (res.status === "200") {
        this.getLoggedPatient(localStorage.getItem("loggedPatient"));
        this.patientService.image_upload_Observable({ flag: true });
      }
    });
  }

  edit_profile_clicked() {
    this.isEdit = true;
    const {
      email,
      first_name,
      last_name,
      phone,
      address
    } = this.patient;
    this.patient_profile_form.controls["email"].patchValue(email);
    this.patient_profile_form.controls["first_name"].patchValue(first_name);
    this.patient_profile_form.controls["last_name"].patchValue(last_name);
    this.patient_profile_form.controls["phone"].patchValue(phone);
    this.patient_profile_form.controls["address"].patchValue(address);
  }

  onNumberChange(e) {
    this.patient_profile_form.controls["phone"].patchValue(e.Number);
  }

  cancel_update() {
    this.isEdit = false;
  }

  updateProfile() {}

  upload_image(event) {
    var formdata = new FormData();
    const file = event.target.files[0];
    formdata.append("profile", file);
    formdata.append("email", this.patient.email);
    this.patientService.update_profile_picture(formdata).subscribe(res => {
      console.log(res);
      this.getLoggedPatient(localStorage.getItem("loggedPatient"));
    });
  }
}
