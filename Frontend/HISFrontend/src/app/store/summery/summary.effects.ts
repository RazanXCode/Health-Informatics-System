import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SummaryService } from './../../services/summary.service';
import { loadSummary, loadSummarySuccess, loadSummaryFailure } from './summary.actions';

@Injectable()
export class SummaryEffects {
  loadSummary$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadSummary),
      mergeMap(() => 
        this.summaryService.getSummary().pipe(
          map(summary => loadSummarySuccess({ summary })),
          catchError(error => of(loadSummaryFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private summaryService: SummaryService
  ) {}
}