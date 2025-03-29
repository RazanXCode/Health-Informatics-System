export interface AppointmentCreate {
    doctorUserId: string;
    date: Date;
  }
  
  export interface Appointment {
    appointmentId: string;
    doctorUserId: string;
    status: string;
    date: Date;
  }
  
  export interface AppointmentState {
    creating: boolean;
    created: boolean;
    error: any;
  }