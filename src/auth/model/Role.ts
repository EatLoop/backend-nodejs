/** @format */

// src/entities/Role.ts
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Permission} from './Permission';

@Entity()
export class Role {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({type: 'varchar', unique: true})
	name: string;

	@ManyToMany(() => Permission, permission => permission.roles)
	permissions: Permissions[];

	constructor(name: string, permissions: Permissions[]) {
		this.name = name;
		this.permissions = permissions;
	}
}
