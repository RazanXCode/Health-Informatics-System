import { Appointment } from "../../models/appointment.model";
import { Doctor } from "../../models/doctor.model";

export interface AddAppointmentsState {
  doctors: Doctor[]; // list of doctors
  selectedDoctor: Doctor | null; // selected doctor
  selectedDate: string | null; // selected date
  appointment: Appointment | null; // created appointment
  loading: boolean;
  error: string | null;
}