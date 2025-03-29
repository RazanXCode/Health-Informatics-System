import { createReducer, on } from '@ngrx/store';
import { DoctorList } from '../../models/doctor.model';
import * as DoctorActions from './doctor.actions';

export const initialState: DoctorList = {
  doctors: [],
  loading: false,
  error: null
};

export const doctorReducer = createReducer(
  initialState,
  on(DoctorActions.loadDoctors, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(DoctorActions.loadDoctorsSuccess, (state, { doctors }) => ({
    ...state,
    doctors,
    loading: false
  })),
  on(DoctorActions.loadDoctorsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);