import { createReducer, on } from '@ngrx/store';
import { AppointmentState } from '../../models/appointment.model';
import * as AppointmentActions from './add-appointment.actions';

export const initialState: AppointmentState = {
  creating: false,
  created: false,
  error: null
};

export const appointmentReducer = createReducer(
  initialState,
  on(AppointmentActions.createAppointment, state => ({
    ...state,
    creating: true,
    created: false,
    error: null
  })),
  on(AppointmentActions.createAppointmentSuccess, state => ({
    ...state,
    creating: false,
    created: true
  })),
  on(AppointmentActions.createAppointmentFailure, (state, { error }) => ({
    ...state,
    creating: false,
    error
  })),
  on(AppointmentActions.resetAppointmentState, () => initialState)
);