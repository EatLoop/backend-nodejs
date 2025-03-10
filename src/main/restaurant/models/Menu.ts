import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export default class Menu {
	@PrimaryGeneratedColumn()
	id?: string;

	@Column()
	restaurantId: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
	constructor(restaurantId: string) {
		this.restaurantId = restaurantId;
	}
}