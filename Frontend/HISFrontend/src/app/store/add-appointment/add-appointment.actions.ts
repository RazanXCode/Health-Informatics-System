import { createAction, props } from '@ngrx/store';
import { AppointmentCreate } from '../../models/appointment.model';

export const createAppointment = createAction(
  '[Appointment] Create Appointment',
  props<{ appointment: AppointmentCreate }>()
);
export const createAppointmentSuccess = createAction(
  '[Appointment] Create Appointment Success',
  props<{ appointment: any }>() // Adjust type based on your API response
);
export const createAppointmentFailure = createAction(
  '[Appointment] Create Appointment Failure',
  props<{ error: any }>()
);
export const resetAppointmentState = createAction('[Appointment] Reset State');