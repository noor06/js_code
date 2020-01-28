import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  private sidemenu_subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  sidemenu_Observable() {
    return this.sidemenu_subject.next({ flag: true });
  }

  sidemenu_Obs() {
    return this.sidemenu_subject.asObservable();
  }

  admin_login(admin) {
    return this.http.post<any>(`${API_URL}/admin/login`, admin);
  }

  update_password(data) {
    return this.http.put<any>(`${API_URL}/admin/password/update`, data);
  }

  get_admin() {
    return this.http.get<any>(`${API_URL}/admin`);
  }

  get_count() {
    return this.http.get<any>(`${API_URL}/admin/count`);
  }

  get_requests() {
    return this.http.get<any>(`${API_URL}/admin/requests`);
  }

  update_request(data) {
    return this.http.put<any>(`${API_URL}/admin/request/update`, data);
  }

  get_request_detail(id) {
    return this.http.get<any>(`${API_URL}/admin/request/detail?id=${id}`);
  }
}
