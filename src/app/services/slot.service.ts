import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";

@Injectable({
  providedIn: "root"
})
export class SlotService {
  constructor(private http: HttpClient) {}

  add_slot(slot) {
    return this.http.post<any>(`${API_URL}/slot`, slot);
  }

  getSlotDetails(id) {
    return this.http.get<any>(`${API_URL}/slot/details/${id}`);
  }

  get_slot_list_by_doctorID(id, date) {
    return this.http.get<any>(`${API_URL}/slot?doctor_id=${id}&date=${date}`);
  }

  update_slot_by_ID(slot) {
    return this.http.put<any>(`${API_URL}/slot`, slot);
  }

  delete(slots) {
    return this.http.post<any>(`${API_URL}/slot/delete`, slots);
  }

  delete_slot_by_ID(id) {
    return this.http.delete<any>(`${API_URL}/slot/${id}`);
  }

  create_slots(obj) {
    return this.http.post<any>(`${API_URL}/slot/create`, obj);
  }
}
