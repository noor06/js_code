import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getDepartments(hospital_id) {
    return this.http.get<any>(`${API_URL}/department/${hospital_id}`);
  }

  addDepartment(obj) {
    return this.http.post<any>(`${API_URL}/department`, obj);
  }

  delete_department(id) {
    return this.http.delete<any>(`${API_URL}/department/${id}`);
  }
}
