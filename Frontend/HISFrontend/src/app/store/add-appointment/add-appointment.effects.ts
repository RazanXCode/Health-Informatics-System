import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AppointmentService } from '../../services/appointment.service';
import * as AppointmentActions from './add-appointment.actions';

@Injectable()
export class AppointmentEffects {

  // Effect to handle the creation of an appointment
  createAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.createAppointment),
      mergeMap(({ appointment }) =>
        this.appointmentService.createAppointment(appointment).pipe(
          map(appointment => AppointmentActions.createAppointmentSuccess({ appointment })),
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