// src/appointment/appointment.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Appointment> {
    const appointment = await this.appointmentService.findOne(+id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  @Post()
  create(@Body() appointment: Appointment): Promise<Appointment> {
    return this.appointmentService.create(appointment);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() appointment: Appointment): Promise<Appointment> {
    const updatedAppointment = await this.appointmentService.update(+id, appointment);
    if (!updatedAppointment) {
        throw new NotFoundException('Appointment not found');
    }
    return updatedAppointment;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.appointmentService.remove(+id);
  }
}