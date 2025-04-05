import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorList } from '../../models/doctor.model';

export const selectDoctorState = createFeatureSelector<DoctorList>('doctors');

//  Selector to get the list of doctors from the state.

export const selectDoctors = createSelector(
  selectDoctorState,
  (state: DoctorList) => state.doctors
);

// Selector to get the loading state from the doctor list state.
export const selectDoctorsLoading = createSelector(
  selectDoctorState,
  (state: DoctorList) => state.loading
);

// Selector to get the error state from the doctor list state.
export const selectDoctorsError = createSelector(
  selectDoctorState,
  (state: DoctorList) => state.error
);