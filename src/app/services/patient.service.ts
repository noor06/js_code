import { API_URL } from "./../shared_config";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PatientService {
  private search_subject = new Subject<any>();
  private filter_subject = new Subject<any>();
  private image_upload_subject = new Subject<any>();
  private search_nearby_subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  filter_Observable(filter, flag) {
    return this.filter_subject.next({ filter, flag });
  }

  filter_subscription() {
    return this.filter_subject.asObservable();
  }

  update_profile_picture(formData) {
    return this.http.put<any>(
      `${API_URL}/patient/upload/profile/image`,
      formData
    );
  }

  getPatientList() {
    return this.http.get<any>(`${API_URL}/patient`);
  }

  delete_patient(id) {
    return this.http.delete<any>(`${API_URL}/patient?id=${id}`);
  }

  getPatientById(id) {
    return this.http.get<any>(`${API_URL}/patient/details?id=${id}`);
  }

  resetPassword(formData) {
    return this.http.put<any>(`${API_URL}/patient/password/reset`, formData);
  }

  // navbar search observable
  search_Observable(search_text) {
    return this.search_subject.next({ search_text });
  }

  search_subscription() {
    return this.search_subject.asObservable();
  }
  // navbar search observable ends

  // search nearby observable
  search_nearby_Observable(flag, lat, lng) {
    return this.search_nearby_subject.next({ flag, lat, lng });
  }

  search_nearby_subscription() {
    return this.search_nearby_subject.asObservable();
  }
  // search nearby observable ends

  // image upload observable
  image_upload_Observable(flag) {
    return this.image_upload_subject.next(flag);
  }

  image_upload_subscription() {
    return this.image_upload_subject.asObservable();
  }
  // image upload observable ends

  register(patient) {
    return this.http.post<any>(`${API_URL}/patient/register`, patient);
  }

  get_patient(email) {
    return this.http.get<any>(`${API_URL}/patient/${email}`);
  }
}
