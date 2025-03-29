import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentState } from '../../models/appointment.model';

export const selectAppointmentState = createFeatureSelector<AppointmentState>('appointment');

export const selectAppointmentCreating = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.creating
);

export const selectAppointmentCreated = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.created
);

export const selectAppointmentError = createSelector(
  selectAppointmentState,
  (state: AppointmentState) => state.error
);