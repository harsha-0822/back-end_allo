// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Staff } from './staff/staff.entity';
import { Patient } from './patient/patient.entity';
import { Doctor } from './doctor/doctor.entity';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { Appointment } from './appointment/appointment.entity';
import { AppointmentModule } from './appointment/appointment.module';
import { AuthModule } from './auth/auth.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // or your MySQL host
      port: 3306, // or your MySQL port
      username: 'root', // your MySQL username
      password: 'Hvsm@0822', // your MySQL password
      database: 'clinic_db', // the database you created
      entities: [Staff, Patient, Doctor, Appointment], // Add your entities here
      synchronize: true, // Auto-create tables based on your entities (for development only)
    }),
    PatientModule,
    DoctorModule,
    AppointmentModule,
    AuthModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}