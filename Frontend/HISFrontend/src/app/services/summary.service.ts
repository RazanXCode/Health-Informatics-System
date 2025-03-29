import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminSummaryDto } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = 'http://api/admin/summary'; // todo

  constructor(private http: HttpClient) {}

  getSummary(): Observable<AdminSummaryDto> {
    return this.http.get<AdminSummaryDto>(this.apiUrl);
  }
}