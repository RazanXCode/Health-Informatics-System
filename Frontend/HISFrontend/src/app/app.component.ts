import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddAppointmentComponent } from "./components/add-appointment/add-appointment.component";
import { DoctorSummaryComponent } from "./components/doctor-summary/doctor-summary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DoctorSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HISFrontend';
}
