/** @format */

import {Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import Role from './Role';
@Entity('users')
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({type: 'varchar', length: 255, unique: true})
	email: string;

	@Column({type: 'varchar', length: 255})
	name: string;

	@Column({type: 'varchar', length: 255})
	password: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@ManyToMany(() => Role)
	roles?: Role[];

	constructor(email: string, name: string, password: string) {
		this.email = email;
		this.name = name;
		this.password = password;
	}
}
