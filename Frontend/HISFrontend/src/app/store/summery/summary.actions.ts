import { createAction, props } from '@ngrx/store';
import { AdminSummaryDto } from '../../models/summary.model';

export const loadSummary = createAction('[Summary] Load Summary');

export const loadSummarySuccess = createAction(
  '[Summary] Load Summary Success',
  props<{ summary: AdminSummaryDto }>()
);

export const loadSummaryFailure = createAction(
  '[Summary] Load Summary Failure',
  props<{ error: any }>()
);