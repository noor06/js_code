import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PainService } from "src/app/services/pain.service";
import { API_URL } from "../../shared_config";
import Swal from "sweetalert2";

import "datatables.net";
import "datatables.net-bs4";
import * as $ from "jquery";
@Component({
  selector: 'app-pain-type',
  templateUrl: './pain-type.component.html',
  styleUrls: ['./pain-type.component.css']
})
export class PainTypeComponent implements OnInit {
  loading = false;
  dataTable_hospitals: any;
  pains;
  imgUrl;
  album = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private painService : PainService,
  ) { 
    
  }

  ngOnInit() {
    if (this.dataTable_hospitals) {
      this.dataTable_hospitals.destroy();
    }
    this.getPain();
  }

  add_pain_navigation() {
    this.router.navigateByUrl(`admin/pain/add`);
  }

  getPain() {
    this.loading = true;
    this.pains = [];
   
    this.painService.get_painType().subscribe(response => {
      if (response.status) {
        this.loading = false;
        
        this.pains = response.painType;
        this.pains &&
        this.pains.forEach((item, i) => {
          
          this.pains[i].img =
            this.pains[i].img &&
            `${API_URL}/${this.pains[i].img}`;

          const src = `${this.pains[i].img}`;
          const caption = `${this.pains[i].img}`;
          const thumb = "";
          const album = {
            src: src,
            caption: caption,
            thumb: thumb
          };

          this.album.push(album);
        });
        
        setTimeout(() => {
          // for slots table tab
          const pains: any = $("#pains");
          this.dataTable_hospitals = pains.DataTable({
            language: {
              lengthMenu: "Display _MENU_ records per page",
              search: "Search",
              info: "Showing page _PAGE_ of _PAGES_",
              infoFiltered: "(filtered from _MAX_ total records)"
            },
            searching: true,
            responsive: true,
            paging: true,
            info: true,
            columnDefs: [
              {
                orderable: false,
                targets: "no-sort"
              }
            ]
          });
        }, 0);
      }
    });
  }

  delete(id) {
    Swal.fire({
      title: "Delete Pain Type",
      text: "Are you sure ?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes sure"
    }).then(result => {
      this.loading = true;
      if (result.value) {
        this.painService.delete_type(id).subscribe(response => {
          this.loading = false;
          if (response.status === true) {
            if (this.dataTable_hospitals) {
              this.dataTable_hospitals.destroy();
            }
            this.getPain();
            this.toastr.success("Deleted successfully");
          }
        });
      } else {
        if (this.dataTable_hospitals) {
          this.dataTable_hospitals.destroy();
        }
        this.getPain();
      }
    });
  }
}
