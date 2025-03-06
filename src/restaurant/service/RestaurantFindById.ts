/** @format */

import Restaurant from '../models/Restaurant';
import RestaurantRepository from '../repositories/RestaurantRepositoy';

export default class RestaurantFindById {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}
	async findById(id: string): Promise<Restaurant | null> {
		return this.restaurantRepository.findById(id);
	}
}
