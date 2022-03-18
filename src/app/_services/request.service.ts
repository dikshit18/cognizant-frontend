import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "@/_models";

@Injectable({ providedIn: "root" })
export class RequestService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/holiday-requests`);
  }
  createRequest(payload) {
    return this.http.post<User[]>(`${config.apiUrl}/holiday-requests`, payload);
  }
  approveRequest(id, bool) {
    console.log(id, bool);
    return this.http.put<User[]>(`${config.apiUrl}/holiday-requests/${id}`, {
      isApprovedByManager: bool,
    });
  }
}
