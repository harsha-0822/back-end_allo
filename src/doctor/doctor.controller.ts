// src/doctor/doctor.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { DoctorService } from './doctor.service'; // Make sure this is imported
import { Doctor } from './doctor.entity';
// ... other codeimport { DoctorService } from './doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doctor> {
    const doctor = await this.doctorService.findOne(+id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  @Post()
  create(@Body() doctor: Doctor): Promise<Doctor> {
    return this.doctorService.create(doctor);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() doctor: Doctor): Promise<Doctor> {
    const updatedDoctor = await this.doctorService.update(+id, doctor);
    if (!updatedDoctor) {
      throw new NotFoundException('Doctor not found');
    }
    return updatedDoctor;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.doctorService.remove(+id);
  }
}