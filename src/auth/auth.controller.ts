// src/auth/auth.controller.ts
import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    const staff = await this.authService.validateStaff(loginDto.username, loginDto.password);
    if (staff) {
      return this.authService.login(staff);
    }
    return { message: 'Invalid credentials' };
  }
}