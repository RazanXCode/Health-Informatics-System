import { createAction, props } from '@ngrx/store';
import { Doctor } from '../../models/doctor.model';

export const loadDoctors = createAction('[Doctor] Load Doctors');

//Action dispatched when doctors are successfully loade
export const loadDoctorsSuccess = createAction(
  '[Doctor] Load Doctors Success',
  props<{ doctors: Doctor[] }>()
);

//Action dispatched when there is an error loading doctors
export const loadDoctorsFailure = createAction(
  '[Doctor] Load Doctors Failure',
  props<{ error: any }>()
);