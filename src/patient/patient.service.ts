// src/patient/patient.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  findOne(id: number): Promise<Patient | null> {
    return this.patientRepository.findOneBy({ id });
  }

  create(patient: Patient): Promise<Patient> {
    return this.patientRepository.save(patient);
  }
  
  // This is the new update method
  async update(id: number, patient: Patient): Promise<Patient> {
    await this.patientRepository.update(id, patient);
    const updatedPatient = await this.patientRepository.findOneBy({ id });
    if (!updatedPatient) {
      throw new Error('Patient not found after update');
    }
    return updatedPatient;
  }

  async remove(id: number): Promise<void> {
    await this.patientRepository.delete(id);
  }
}
