// src/appointment/appointment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({ relations: ['patient', 'doctor'] });
  }

  findOne(id: number): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'doctor'],
    });
  }

  create(appointment: Appointment): Promise<Appointment> {
    return this.appointmentRepository.save(appointment);
  }

  async update(id: number, appointment: Appointment): Promise<Appointment> {
    await this.appointmentRepository.update(id, appointment);
    const updatedAppointment = await this.appointmentRepository.findOneBy({ id });
    if (!updatedAppointment) {
      throw new Error('Appointment not found after update');
    }
    return updatedAppointment;
  }

  async remove(id: number): Promise<void> {
    await this.appointmentRepository.delete(id);
  }
}