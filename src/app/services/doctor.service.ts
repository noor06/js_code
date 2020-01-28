import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  add_doctor(doctor) {
    return this.http.post<any>(`${API_URL}/doctor`, doctor);
  }

  get_doctors_by_hospital(hospital_id) {
    return this.http.get<any>(`${API_URL}/doctor/hospital/${hospital_id}`);
  }

  get_all_doctors() {
    return this.http.get<any>(`${API_URL}/doctor/all`);
  }

  delete_doctor(id) {
    return this.http.delete<any>(`${API_URL}/doctor/${id}`);
  }

  get_doctor_by_id(id) {
    return this.http.get<any>(`${API_URL}/doctor/${id}`);
  }

  search_doctor(search_text) {
    return this.http.get<any>(`${API_URL}/doctor/search/${search_text}`);
  }

  login(formData) {
    return this.http.post<any>(`${API_URL}/mobile/api/doctor/login`, formData);
  }
}
