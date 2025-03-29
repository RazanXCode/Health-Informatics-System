import { createAction, props } from '@ngrx/store';
import { Doctor } from '../../models/doctor.model';

export const loadDoctors = createAction('[Doctor] Load Doctors');
export const loadDoctorsSuccess = createAction(
  '[Doctor] Load Doctors Success',
  props<{ doctors: Doctor[] }>()
);
export const loadDoctorsFailure = createAction(
  '[Doctor] Load Doctors Failure',
  props<{ error: any }>()
);