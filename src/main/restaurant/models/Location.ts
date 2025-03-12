
import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity()
export default class Location {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	address: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@Column()
	managerId?: string;
	
	@Column()
	ownerId?: string;

	@Column('jsonb', {nullable: true})
	openingHours?: Record<string, string>;

	@Column()
	restaurantId: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	constructor(address: string, city: string, state: string, managerId: string, restaurantId: string,ownerId: string,openingHours:Record<string,string>) {
		this.address = address;
		this.city = city;
		this.state = state;
		this.managerId = managerId;
		this.restaurantId = restaurantId;
		this.ownerId=ownerId;
		this.openingHours=openingHours
	}
}