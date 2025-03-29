import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppointmentService } from '../../services/appointment.service';
import * as AppointmentActions from './add-appointment.actions';

@Injectable()
export class AppointmentEffects {
  createAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.createAppointment),
      mergeMap(({ appointment }) =>
        this.appointmentService.createAppointment(appointment).pipe(
          map(appointment => AppointmentActions.createAppointment({ appointment })),
          catchError(error => of(AppointmentActions.createAppointmentFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private appointmentService: AppointmentService
  ) {}
}