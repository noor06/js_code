import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user) {
    return this.http.post<any>(`${API_URL}/patient/login`, user);
  }

  register(user) {
    return this.http.post<any>(`${API_URL}/patient/register`, user);
  }
}
