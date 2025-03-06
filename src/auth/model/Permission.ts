/** @format */

// src/entities/Permission.ts
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from './Role';

@Entity()
export class Permission {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({unique: true})
	name: string;

	@ManyToMany(() => Role, role => role.permissions)
	roles: Role[];

	constructor(name: string, roles: Role[]) {
		this.name = name;
		this.roles = roles;
	}
}
