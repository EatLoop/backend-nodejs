
import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('restaurant')
export default class Restaurant {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column({type: 'varchar', length: 255, unique: true})
	name: string;

	@Column({type: 'varchar', length: 255})
	description: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@Column()
	main_head_id: string;

	@Column({type: 'boolean'})
	status: boolean;

	constructor(name: string, description: string, main_head_id: string) {
		this.name = name;
		this.description = description;
		this.status = false;
		this.main_head_id = main_head_id;
	}
}