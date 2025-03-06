/** @format */

import {Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity()
export default class MenuItem {
	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@Column()
	name: string;

	@Column({nullable: true})
	description: string;

	@Column({type:'text',array:true})
	category: string[];

	@Column('decimal', {precision: 10, scale: 2})
	price: number;

	@Column({default: true})
	isAvailable: boolean;

	@Column()
	menuId: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	constructor(name: string, description: string, price: number, category: string[], menuId: string) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.category = category;
		this.isAvailable = true;
		this.menuId = menuId;
	}
}
