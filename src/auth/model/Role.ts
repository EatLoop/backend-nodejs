/** @format */

// src/entities/Role.ts
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import Permission from './Permission';
import User from './User';

@Entity()
export default class Role {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({type: 'varchar', unique: true})
	name: string;

	@ManyToMany(() => Permission, permission => permission.roles)
	permissions: Permission[];

	@ManyToMany(() => User)
	users?: User[];

	constructor(name: string, permissions: Permission[]) {
		this.name = name;
		this.permissions = permissions;
	}
}
