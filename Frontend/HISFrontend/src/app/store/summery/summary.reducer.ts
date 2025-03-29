import { createReducer, on } from '@ngrx/store';
import { loadSummary, loadSummarySuccess, loadSummaryFailure } from './summary.actions';
import { initialState } from './summary.state';

export const summaryReducer = createReducer(
  initialState,
  on(loadSummary, (state) => ({ ...state, loading: true, error: null })),

  on(loadSummarySuccess, (state, { summary }) => ({
    ...state,
    summary,
    loading: false
  })),
  
  on(loadSummaryFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);