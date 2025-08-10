// src/patient/patient.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient> {
    const patient = await this.patientService.findOne(+id);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  @Post()
  create(@Body() patient: Patient): Promise<Patient> {
    patient.status = 'Waiting';
    return this.patientService.create(patient);
  }
  
  // This is the new PUT endpoint
  @Put(':id')
  async update(@Param('id') id: string, @Body() patient: Patient): Promise<Patient> {
    const updatedPatient = await this.patientService.update(+id, patient);
    if (!updatedPatient) {
        throw new NotFoundException('Patient not found');
    }
    return updatedPatient;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.patientService.remove(+id);
  }
}
