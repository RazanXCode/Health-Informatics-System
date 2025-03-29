import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentCreate } from '../models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = `http//api/appointment`; //todo

  constructor(private http: HttpClient) {}

  createAppointment(appointment: AppointmentCreate): Observable<any> {
    return this.http.post<any>(this.apiUrl, appointment);
  }
}