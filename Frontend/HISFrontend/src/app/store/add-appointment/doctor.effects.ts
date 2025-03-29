import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DoctorService } from '../../services/doctor.service';
import * as DoctorActions from './doctor.actions';

@Injectable()
export class DoctorEffects {
  loadDoctors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DoctorActions.loadDoctors),
      mergeMap(() =>
        this.doctorService.getDoctors().pipe(
          map(doctors => DoctorActions.loadDoctorsSuccess({ doctors })),
          catchError(error => of(DoctorActions.loadDoctorsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private doctorService: DoctorService
  ) {}
}

export function createAppointment(createAppointment: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action<string>, any> {
  throw new Error('Function not implemented.');
}
