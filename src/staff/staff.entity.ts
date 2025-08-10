// src/staff/staff.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password_hash: string; // Store hashed passwords, never plain text

  @Column()
  role: string; // e.g., 'front-desk', 'admin'
}