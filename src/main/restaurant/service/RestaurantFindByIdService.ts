/** @format */

import Restaurant from '../models/Restaurant';
import RestaurantRepository from '../repositories/RestaurantRepository';

export default class RestaurantFindByIdService {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}
	async findById(id: string): Promise<Restaurant | null> {
		return this.restaurantRepository.findById(id);
	}
}