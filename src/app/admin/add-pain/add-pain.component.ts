
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PainService } from "src/app/services/pain.service";
import {
  EMAIL_REGEX,
  white_space_regex,
  must_alphanumeric_regex,
  digit_regex
} from "../../shared_config";
import Swal from "sweetalert2";
import * as moment from "moment";
import * as $ from "jquery";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild
} from "@angular/core";
@Component({
  selector: "app-add-pain",
  templateUrl: "./add-pain.component.html",
  styleUrls: ["./add-pain.component.css"]
})
export class AddPainComponent implements OnInit {
  public pain_form: FormGroup;
  loading = false;
  selected_image;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private painService: PainService,
    private ngZone: NgZone,
    
  ) {
    this.pain_form = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(white_space_regex)
        ])
      ],
      image: ["",[Validators.required        
        ]],
     

    });
  }

  ngOnInit() {}

  upload(e) {
    // if (e.target.files[0].size <= 3000000 && e.target.files[0].size >= 100000) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = _event => {
        this.selected_image = reader.result;
      };
      this.pain_form.controls["image"].patchValue(e.target.files[0]);
      return true;
    // } else {
    //   alert("Please choose image size of more than 100KB and less than 3MB");
    //   return false;
    // }
  }

  addPainDialogue() {
    Swal.fire({
      title: "Add Pain Type",
      text: "Add Pain type to this hospital ?",
      type: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add now",
      cancelButtonText: "Later"
    }).then(result => {
      if (result.value) {
        this.router.navigateByUrl(`admin/pain/add`);
      } else {
        this.router.navigateByUrl(`admin/pain-type`);
      }
    });
  }
  back() {
    this.router.navigateByUrl("admin/pain-type");
  }
  add_pain() {
    if (this.pain_form.valid) {
      this.loading = true;

      var formData = new FormData();

      formData.append("pain_type", this.pain_form.controls["name"].value);
      formData.append("img", this.pain_form.controls["image"].value);

      this.painService.add_painType(formData).subscribe(res => {
        this.loading = false;
        if (res.status === "200") {
          this.toastr.success(res.message);
          // this.addPainDialogue();
          this.router.navigateByUrl(`admin/pain-type`);
          this.pain_form.reset();
        } else if (res.status === "406") {
          this.toastr.error(res.message);
        }
      });
    } else {
      Object.keys(this.pain_form.controls).forEach(key => {
        this.pain_form.controls[key].markAsTouched({ onlySelf: true });
      });
    }
  }
}
