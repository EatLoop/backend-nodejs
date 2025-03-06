/** @format */

import {DataSource, Repository} from 'typeorm';
import Restaurant from '../models/Restaurant';
export default class RestaurantRepository {
	private readonly restaurantRepository: Repository<Restaurant>;
	private constructor(repository: Repository<Restaurant>) {
		this.restaurantRepository = repository;
	}

	static async initialize(dataSource: DataSource): Promise<RestaurantRepository> {
		const repository = dataSource.getRepository(Restaurant);
		return new RestaurantRepository(repository);
	}

	async findById(id: string): Promise<Restaurant | null> {
		return this.restaurantRepository.findOne({where: {id}});
	}

	async createRestaurant(restaurant: Partial<Restaurant>): Promise<Restaurant> {
		return this.restaurantRepository.save(restaurant);
	}
	async deleteRestaurant(restaurant_id: string): Promise<void> {
		await this.restaurantRepository.delete(restaurant_id);
	}
}
