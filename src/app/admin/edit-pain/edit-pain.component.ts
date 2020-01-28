import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild
} from "@angular/core";
import { HospitalService } from "src/app/services/hospital.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PainService } from "src/app/services/pain.service";
import * as moment from "moment";
import { API_URL } from "../../shared_config";
import {
  EMAIL_REGEX,
  white_space_regex,
  must_alphanumeric_regex,
  digit_regex
} from "../../shared_config";
import { ToastrService } from "ngx-toastr";

declare var google: any;
@Component({
  selector: "app-edit-pain",
  templateUrl: "./edit-pain.component.html",
  styleUrls: ["./edit-pain.component.css"]
})
export class EditPainComponent implements OnInit {
  painId;
  pain;
  selected_image;
  album = [];
  loadingg = false;
  basicEdit = false;
  editPhoto = false;
  @ViewChild("search", null) public searchElementRef: ElementRef;

  public basic_info_form: FormGroup;
  public contact_info_form: FormGroup;
  public timing_info_form: FormGroup;

  constructor(
    private painService: PainService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {
    this.basic_info_form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      image: [""]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.painId = res.pain_id;
      this.getPain(this.painId);
    });
  }

  open() {}
  editClicked(type) {
    if (type === "basic") {
      this.basicEdit = true;

      this.basic_info_form.controls["name"].patchValue(this.pain.name);
    }
  }

  editPhotoClicked(type) {
    if (type === "basicphoto") {
      this.editPhoto = true;
    }
  }

  cancelEdit(type) {
    if (type === "basic") {
      this.basicEdit = false;
      this.basic_info_form.controls["name"].patchValue(this.pain.name);
    }
  }
  cancelPhotoEdit(type) {
    if (type === "basicphoto") {
      this.editPhoto = false;
      this.selected_image = `${API_URL}/${this.pain.img}`;
      // this.basic_info_form.controls["name"].patchValue(this.pain.name);
    }
  }
  getPain(id) {
    this.painService.get_painById(id).subscribe(res => {
      if (res.status === true) {
        this.pain = res.pains;
        this.basic_info_form.controls["name"].patchValue(res.pains.pain_type);
        this.selected_image = `${API_URL}/${res.pains.img}`;
      }
    });
  }
  upload(e) {
    // if (e.target.files[0].size <= 3000000 && e.target.files[0].size >= 100000) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = _event => {
      this.selected_image = reader.result;
    };
    this.basic_info_form.controls["image"].patchValue(e.target.files[0]);
    return true;
    debugger;
    // } else {
    //   alert("Please choose image size of more than 100KB and less than 3MB");
    //   return false;
    // }
  }

  back() {
    this.router.navigateByUrl("admin/pain-type");
  }

  saveBasicInfo() {
    if (this.basic_info_form.valid) {
      this.loadingg = true;

      const formData = {
        pain_type: this.basic_info_form.controls["name"].value,
        id: this.pain.id
      };

      this.painService.editPain(formData).subscribe(res => {
        this.loadingg = false;
        if (res.status === true) {
          this.toastr.success(res.message);
          this.basicEdit = false;
          this.getPain(this.painId);
          this.basic_info_form.controls["name"].patchValue(this.pain.name);
          // this.addPainDialogue();
          // this.router.navigateByUrl(`admin/pain-type`);
          // this.pain_form.reset();
        } else if (res.status === "406") {
          this.toastr.error(res.message);
        }
      });
    } else {
      Object.keys(this.basic_info_form.controls).forEach(key => {
        this.basic_info_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }
  savePhotoBasicInfo() {
    this.loadingg = true;

    var formData = new FormData();
    formData.append("id", this.pain.id);
    formData.append("img", this.basic_info_form.controls["image"].value);

    this.painService.editPhotoPain(formData).subscribe(res => {
      this.loadingg = false;
      if (res.status === true) {
        this.toastr.success(res.message);
        this.getPain(this.painId);
        this.editPhoto = false;
        this.selected_image = `${API_URL}/${this.pain.img}`;
        // this.addPainDialogue();
        // this.router.navigateByUrl(`admin/pain-type`);
        // this.pain_form.reset();
      } else if (res.status === "406") {
        this.toastr.error(res.message);
      }
    });
  }
}
