import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class PainService {
  constructor(private http: HttpClient) {}

  add_painType(painData) {
    return this.http.post<any>(`${API_URL}/pain/addpain`, painData);
  }

  // get_painType(page) {
  //   return this.http.get<any>(`${API_URL}/hospital?page=${page}`);
  // }

  get_painType() {
    return this.http.get<any>(`${API_URL}/pain/`);
  }

  // get_count(id) {
  //   return this.http.get<any>(`${API_URL}/hospital/count?hospitalId=${id}`);
  // }

  // upload_image(formData) {
  //   return this.http.put<any>(`${API_URL}/hospital/upload/image`, formData);
  // }

  editPain(editData) {
    return this.http.put<any>(`${API_URL}/pain/update`, editData);
  }
  editPhotoPain(formData) {
    console.log("formData", formData);
    return this.http.put<any>(`${API_URL}/pain/upload`, formData);
  }
  // search_nearby(lat, lng) {
  //   return this.http.get<any>(
  //     `${API_URL}/hospital/list/location?lat=${lat}&lng=${lng}`
  //   );
  // }

  get_painById(id) {
    return this.http.get<any>(`${API_URL}/pain/${id}`);
  }

  // filter_hospital(filter) {
  //   return this.http.post<any>(`${API_URL}/hospital/filter`, filter);
  // }

  // get_filters() {
  //   return this.http.get<any>(`${API_URL}/hospital/filters/list`);
  // }

  delete_type(id) {
    return this.http.delete<any>(`${API_URL}/pain/${id}`);
  }
}
