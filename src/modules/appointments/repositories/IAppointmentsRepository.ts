import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindMonthAppointmentsProviderDTO from '@modules/appointments/dtos/IFindMonthAppointmentsProviderDTO';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindDailyAvailabilityProviderDTO from '@modules/appointments/dtos/IFindDailyAvailabilityProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(data: Date, provider_id: string): Promise<Appointment | undefined>;
  findMonthAppointmentsProvider(
    data: IFindMonthAppointmentsProviderDTO,
  ): Promise<Appointment[]>;
  findDailyAvailabilityProvider(
    data: IFindDailyAvailabilityProviderDTO,
  ): Promise<Appointment[]>;
}
