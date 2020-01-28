import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../shared_config";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private updates_subject = new Subject<any>();

  constructor(private http: HttpClient) {}

  add_update(update) {
    return this.http.post<any>(`${API_URL}/update`, update);
  }

  delete_update(id) {
    return this.http.delete<any>(`${API_URL}/updates/${id}`);
  }

  get_updates() {
    return this.http.get<any>(`${API_URL}/update`);
  }

  mark_as_read(data) {
    return this.http.post<any>(`${API_URL}/updates/markAsRead/`, data);
  }

  push_notification(data) {
    return this.http.post<any>(`${API_URL}/push`, data);
  }

  getRead(userId) {
    return this.http.get<any>(`${API_URL}/updates/read/${userId}`);
  }

  updates_count_Observable(data) {
    return this.updates_subject.next(data);
  }

  updates_count_subscription() {
    return this.updates_subject.asObservable();
  }
}