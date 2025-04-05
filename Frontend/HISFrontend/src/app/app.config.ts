import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { appointmentReducer } from './store/add-appointment/add-appointment.reducer';
import { doctorReducer } from './store/add-appointment/doctor.reducer';
import { summaryReducer } from './store/summery/summary.reducer';
import { provideEffects } from '@ngrx/effects';
import { AppointmentEffects } from './store/add-appointment/add-appointment.effects';
import { DoctorEffects } from './store/add-appointment/doctor.effects';
import { SummaryEffects } from './store/summery/summary.effects';
import { provideHttpClient } from '@angular/common/http';
import { statisticsReducer } from './store/statistics/statistics.reducer';
import { StatisticsEffects } from './store/statistics/statistics.effects';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()), 
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),

    provideStore(
      {
       // Register NgRx store
        appointment: appointmentReducer,
        doctors: doctorReducer,
        summary: summaryReducer,
        statistics: statisticsReducer
        
      }
    ),

     // Register effects
     provideEffects([
      AppointmentEffects,
      DoctorEffects,
      SummaryEffects,
      StatisticsEffects
     ])

    




  ]
};
