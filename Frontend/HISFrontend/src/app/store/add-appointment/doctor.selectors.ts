import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorList } from '../../models/doctor.model';

export const selectDoctorState = createFeatureSelector<DoctorList>('doctors');

export const selectDoctors = createSelector(
  selectDoctorState,
  (state: DoctorList) => state.doctors
);

export const selectDoctorsLoading = createSelector(
  selectDoctorState,
  (state: DoctorList) => state.loading
);

export const selectDoctorsError = createSelector(
  selectDoctorState,
  (state: DoctorList) => state.error
);