import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor.model';
import { AppointmentCreate } from '../../models/appointment.model';
import * as DoctorActions from '../../store/add-appointment/doctor.actions';
import * as AppointmentActions from '../../store/add-appointment/add-appointment.actions';
import { selectDoctors, selectDoctorsLoading } from '../../store/add-appointment/doctor.selectors';
import { selectAppointmentCreating, selectAppointmentCreated, selectAppointmentError } from '../../store/add-appointment/add-appointment.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule ],
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  doctors$: Observable<Doctor[]>;
  loadingDoctors$: Observable<boolean>;
  creating$: Observable<boolean>;
  created$: Observable<boolean>;
  error$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    this.appointmentForm = this.fb.group({
      doctorUserId: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.doctors$ = this.store.select(selectDoctors);
    this.loadingDoctors$ = this.store.select(selectDoctorsLoading);
    this.creating$ = this.store.select(selectAppointmentCreating);
    this.created$ = this.store.select(selectAppointmentCreated);
    this.error$ = this.store.select(selectAppointmentError);
  }

  ngOnInit(): void {
    this.store.dispatch(DoctorActions.loadDoctors());
    
    // Reset appointment state 
    this.store.dispatch(AppointmentActions.resetAppointmentState());
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      const appointment: AppointmentCreate = {
        doctorUserId: this.appointmentForm.value.doctorUserId,
        date: this.appointmentForm.value.date
      };
      this.store.dispatch(AppointmentActions.createAppointment({ appointment }));
    }
  }

  get doctorUserId() {
    return this.appointmentForm.get('doctorUserId');
  }

  get date() {
    return this.appointmentForm.get('date');
  }
}