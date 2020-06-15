import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it(' should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });
});

it('should provider not be able to create two appointments using the same time spot', async () => {
  const fakeAppointmentsRepository = new FakeAppointmentsRepository();
  const createAppointment = new CreateAppointmentService(
    fakeAppointmentsRepository,
  );

  const appointmentDate = new Date(2020, 6, 3, 5);

  await createAppointment.execute({
    date: appointmentDate,
    provider_id: '123123123',
  });

  await expect(
    createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
    }),
  ).rejects.toBeInstanceOf(AppError);
});
