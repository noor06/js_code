import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class HospitalService {
  constructor(private http: HttpClient) {}

  add_hospital(hospital) {
    return this.http.post<any>(`${API_URL}/hospital`, hospital);
  }

  get_hospitals_pagination(page) {
    return this.http.get<any>(`${API_URL}/hospital?page=${page}`);
  }

  get_hospitals() {
    return this.http.get<any>(`${API_URL}/hospital`);
  }

  get_count(id) {
    return this.http.get<any>(`${API_URL}/hospital/count?hospitalId=${id}`);
  }

  upload_image(formData) {
    return this.http.put<any>(`${API_URL}/hospital/upload/image`, formData);
  }

  editHospital(formData) {
    return this.http.put<any>(`${API_URL}/hospital`, formData);
  }

  search_nearby(lat, lng) {
    return this.http.get<any>(
      `${API_URL}/hospital/list/location?lat=${lat}&lng=${lng}`
    );
  }

  get_hospital(id) {
    return this.http.get<any>(`${API_URL}/hospital/${id}`);
  }

  filter_hospital(filter) {
    return this.http.post<any>(`${API_URL}/hospital/filter`, filter);
  }

  get_filters() {
    return this.http.get<any>(`${API_URL}/hospital/filters/list`);
  }

  delete_hospital(id) {
    return this.http.delete<any>(`${API_URL}/hospital/${id}`);
  }
}
