import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HospitalService } from "src/app/services/hospital.service";
import { google } from "@google/maps";
import { MapsAPILoader } from "@agm/core";
import {
  EMAIL_REGEX,
  white_space_regex,
  must_alphanumeric_regex,
  digit_regex
} from "../../shared_config";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as $ from "jquery";

declare var google: any;

@Component({
  selector: "app-add-hospital",
  templateUrl: "./add-hospital.component.html",
  styleUrls: ["./add-hospital.component.css"]
})
export class AddHospitalComponent implements OnInit {
  public hospital_form: FormGroup;

  lat;
  lng;
  zoom: number;
  selected_image;

  // select list dropdown module
  selectedItems = [];
  dropdownSettings = {};
  dropdownList = [
    { id: 1, value: "Bones" },
    { id: 2, value: "Surgery" },
    { id: 3, value: "Lungs" },
    { id: 4, value: "Alzeihmer" }
  ];

  loading = false;

  //   isEdit;
  //   edited_hospital_id;

  @ViewChild("search", null) public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private hospitalService: HospitalService
  ) {
    window.scroll(0, 0);

    this.dropdownSettings = {
      singleSelection: false,
      textField: "value",
      itemsShowLimit: 6,
      enableCheckAll: false,
      allowSearchFilter: true
    };

    this.hospital_form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      pincode: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(digit_regex),
          Validators.minLength(5)
        ])
      ],
      landmark: [""],
    //   fax: ["", Validators.compose([Validators.minLength(14)])],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_REGEX)
        ])
      ],
      phone: [
        "",
        Validators.compose([Validators.required, Validators.minLength(14)])
      ],
      emergency_number: [
        "",
        Validators.compose([Validators.required, Validators.minLength(14)])
      ],
      specialities: ["", Validators.required],
      image: [""],
      appointment_number: [
        "",
        Validators.compose([Validators.required, Validators.minLength(14)])
      ],
      timing_from: ["06:00", Validators.required],
      timing_to: ["18:00", Validators.required],
      overview: [""]
    });
  }

  ngOnInit() {
    this.loadGoogleMaps();
  }

  changePhone(e) {
    console.log("target value: ", e.target.value);
    console.log(
      "form control value: ",
      this.hospital_form.controls["phone"].value
    );
  }

  loadGoogleMaps() {
    //set google maps defaults
    this.zoom = 4;
    this.lat = 39.8282;
    this.lng = -98.5795;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const address = place.address_components;
          console.log(place);
          this.hospital_form.controls["address"].patchValue(
            place.formatted_address
          );

          address.forEach(item => {
            if (item.types[0] === "country") {
              this.hospital_form.controls["country"].patchValue(item.long_name);
            }
            if (item.types[0] === "administrative_area_level_1") {
              this.hospital_form.controls["state"].patchValue(item.long_name);
            }
            if (item.types[0] === "administrative_area_level_2") {
              this.hospital_form.controls["city"].patchValue(item.long_name);
            }
          });

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            alert("please select valid location");
            return false;
          } else {
            //set lat, lng and zoom
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 12;

            console.log("location: ", this.lat, this.lng);
          }
        });
      });
    });
  }

  validateTimeShift(start, end) {
    const flag = moment(`${start}:00`, "HH:mm:ss").isSameOrBefore(
      moment(`${end}:00`, "HH:mm:ss")
    );

    if (!flag) {
      this.toastr.error("Please select valid timings");
    }
    return flag;
  }

  addDepartmentDialogue() {
    Swal.fire({
      title: "Add Department",
      text: "Add department to this hospital ?",
      type: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add now",
      cancelButtonText: "Later"
    }).then(result => {
      if (result.value) {
        this.router.navigateByUrl(`admin/department`);
      } else {
        this.router.navigateByUrl(`admin/hospital`);
      }
    });
  }

  back() {
    this.router.navigateByUrl("admin/hospital");
  }

  upload(e) {
    if (e.target.files[0].size <= 3000000 && e.target.files[0].size >= 100000) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = _event => {
        this.selected_image = reader.result;
      };
      this.hospital_form.controls["image"].patchValue(e.target.files[0]);
      return true;
    } else {
      alert("Please choose image size of more than 100KB and less than 3MB");
      return false;
    }
  }

  add_hospital() {
    if (
      this.hospital_form.valid &&
      this.validateTimeShift(
        this.hospital_form.controls["timing_from"].value,
        this.hospital_form.controls["timing_to"].value
      )
    ) {
      this.loading = true;

      const temp_specialities = this.hospital_form.controls["specialities"]
        .value;
      var specialities = [];
      temp_specialities.forEach((item, i) => {
        specialities.push(item.value);
      });

      var formData = new FormData();

      const temp_pass = new Date()
        .getTime()
        .toString()
        .substring(4, 10);

      formData.append("name", this.hospital_form.controls["name"].value);
      formData.append("city", this.hospital_form.controls["city"].value);
      formData.append("state", this.hospital_form.controls["state"].value);
      formData.append("email", this.hospital_form.controls["email"].value);
      formData.append("pincode", this.hospital_form.controls["pincode"].value);
      formData.append("country", this.hospital_form.controls["country"].value);
      formData.append("password", temp_pass);
      formData.append("password_to_be_sent", temp_pass);
      formData.append(
        "landmark",
        this.hospital_form.controls["landmark"].value
      );

      formData.append(
        "phone",
        `+1 ${this.hospital_form.controls["phone"].value}`
      );
      formData.append(
        "emergency_number",
        `+1 ${this.hospital_form.controls["emergency_number"].value}`
      );
      formData.append(
        "appointment_number",
        `+1 ${this.hospital_form.controls["appointment_number"].value}`
      );
    //   formData.append("fax", `+1 ${this.hospital_form.controls["fax"].value}`);
      formData.append("image", this.hospital_form.controls["image"].value);
      formData.append(
        "timing_from",
        this.hospital_form.controls["timing_from"].value
      );
      formData.append("address", this.hospital_form.controls["address"].value);
      formData.append(
        "timing_to",
        this.hospital_form.controls["timing_to"].value
      );
      formData.append("specialities", JSON.stringify(specialities));
      formData.append(
        "overview",
        this.hospital_form.controls["overview"].value
      );
      formData.append("lat", this.lat);
      formData.append("lng", this.lng);

      this.hospitalService.add_hospital(formData).subscribe(res => {
        this.loading = false;
        if (res.status === "200") {
          this.toastr.success(res.message);
          this.addDepartmentDialogue();
          this.hospital_form.reset();
        } else if (res.status === "406") {
          this.toastr.error(res.message);
        }
      });
    } else {
      Object.keys(this.hospital_form.controls).forEach(key => {
        this.hospital_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }

  open() {}
}
