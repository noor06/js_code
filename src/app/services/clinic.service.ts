import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class ClinicService {
  constructor(private http: HttpClient) {}

  login(clinic) {
    return this.http.post<any>(`${API_URL}/hospital/login`, clinic);
  }
}
