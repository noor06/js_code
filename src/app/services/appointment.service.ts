import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class AppointmentService {
  constructor(private http: HttpClient) {}

  add_appointment(appointment) {
    return this.http.post<any>(`${API_URL}/appointment`, appointment);
  }

  get_patient_appointments(id) {
    return this.http.get<any>(`${API_URL}/appointment/patient?patientId=${id}`);
  }

  get_doctor_appointments(id) {
    return this.http.get<any>(`${API_URL}/appointment/doctor/${id}`);
  }

  get_stats() {
    return this.http.get<any>(`${API_URL}/appointment/monthly/stat`);
  }

  get_appointments() {
    return this.http.get<any>(`${API_URL}/appointment`);
  }
}
