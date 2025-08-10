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
      host: process.env.DB_HOST, // Use Heroku Config Vars
      port: parseInt(process.env.DB_PORT || '3306'), // Use Heroku Config Vars
      username: process.env.DB_USERNAME, // Use Heroku Config Vars
      password: process.env.DB_PASSWORD, // Use Heroku Config Vars
      database: process.env.DB_NAME, // Use Heroku Config Vars
      entities: [Staff, Patient, Doctor, Appointment],
      synchronize: true,
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
