import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { jsPDF } from 'jspdf';
import { loadSummary } from '../../store/summery/summary.actions';
import { Observable } from 'rxjs';
import { AdminSummaryDto } from '../../models/summary.model';
import { SummaryState } from '../../store/summery/summary.state';
import { CommonModule } from '@angular/common';

interface AppState {
  summary: SummaryState;
}

@Component({
  selector: 'app-doctor-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-summary.component.html',
  styleUrl: './doctor-summary.component.scss'
})
export class DoctorSummaryComponent implements OnInit {
  summary$: Observable<AdminSummaryDto | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.summary$ = this.store.select(state => state.summary.summary);
    this.loading$ = this.store.select(state => state.summary.loading);
    this.error$ = this.store.select(state => state.summary.error);
  }

  ngOnInit(): void {
    this.store.dispatch(loadSummary());
  }

  exportToPdf(): void {
    this.summary$.subscribe(summary => {
      if (summary) {
        const doc = new jsPDF();

        // Add title
        doc.text('Doctor Summery', 14, 15);
        
        //    as table to better structure the info
        const doctorsData = summary.doctors.map(doctor => [
          `${doctor.firstName} ${doctor.lastName}`,
          doctor.specialty,
          doctor.email,
          doctor.phone
        ]);

        // Add table to strecture the info
        (doc as any).autoTable({
          head: [['Name', 'Specialty', 'Email', 'Phone']],
          body: doctorsData,
          startY: 20
        });

        // Save asss PDF
        doc.save('doctors-summary.pdf');
      }
    });
  }
}



