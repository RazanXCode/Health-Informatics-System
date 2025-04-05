import { createReducer, on } from '@ngrx/store';
import { DoctorList } from '../../models/doctor.model';
import * as DoctorActions from './doctor.actions';

// Initial state for the doctor list
export const initialState: DoctorList = {
  doctors: [],
  loading: false,
  error: null
};

//reducer function to handle doctor-related state changes.
export const doctorReducer = createReducer(
  initialState,
  // Handle the loading of doctors
  on(DoctorActions.loadDoctors, state => ({
    ...state,
    loading: true,
    error: null
  })),
  // Handle the success of loading doctors
  on(DoctorActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors,
    loading: false
  })),

  // Handle the failure of loading doctors
  on(DoctorActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);