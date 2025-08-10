// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { StaffService } from '../staff/staff.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private staffService: StaffService,
    private jwtService: JwtService,
  ) {}

  async validateStaff(username: string, pass: string): Promise<any> {
    console.log('Received username:', username);
    console.log('Received password:', pass);
    const staff = await this.staffService.findOneByUsername(username);
    console.log('Found staff in database:', staff);

    if (staff && staff.password_hash === pass) {
      const { password_hash, ...result } = staff;
      return result;
    }
    return null;
  }

  async login(staff: any) {
    const payload = { username: staff.username, sub: staff.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}