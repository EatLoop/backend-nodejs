/** @format */

import RestaurantRepository from '../repositories/RestaurantRepositoy';
export default class RestaurantDeletionService {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async deleteRestaurant(restaurant_id: string): Promise<void> {
		await this.restaurantRepository.deleteRestaurant(restaurant_id);
	}
}
