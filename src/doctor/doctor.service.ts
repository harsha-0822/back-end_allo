// src/doctor/doctor.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  findOne(id: number): Promise<Doctor | null> {
    return this.doctorRepository.findOneBy({ id });
  }

  create(doctor: Doctor): Promise<Doctor> {
    return this.doctorRepository.save(doctor);
  }

  // The correct update method
  async update(id: number, doctor: Doctor): Promise<Doctor> {
    await this.doctorRepository.update(id, doctor);
    const updatedDoctor = await this.doctorRepository.findOneBy({ id });
    if (!updatedDoctor) {
      // Handle the case where the doctor is not found
      throw new Error('Doctor not found after update'); 
    }
    return updatedDoctor;
  }

  async remove(id: number): Promise<void> {
    await this.doctorRepository.delete(id);
  }
}