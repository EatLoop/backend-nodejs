/** @format */

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
@Entity('users')
export default class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({type: 'varchar', length: 255, unique: true})
	email: string;

	@Column({type: 'varchar', length: 255})
	name: string;

	@Column({type: 'varchar', length: 255})
	password: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	constructor(id: string, email: string, name: string, password: string, createdAt: Date, updatedAt: Date) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
}
