// src/staff/staff.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  async findOneByUsername(username: string): Promise<Staff | undefined | null> {
    return this.staffRepository.findOne({ where: { username } });
  }
}