import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppoitmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const dateFormatted = startOfHour(date);
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const findAppoitmentInSameDate = await appointmentsRepository.findByDate(
      dateFormatted,
    );

    if (findAppoitmentInSameDate) {
      throw new AppError('This appointment was already booked', 401);
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: dateFormatted,
    });

    const createdAppointment = appointmentsRepository.save(appointment);

    return createdAppointment;
  }
}

export default CreateAppointmentService;
