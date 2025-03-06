/** @format */

import RestaurantCreationRequestDto from '../dto/RestaurantCreationRequestDto';
import Restaurant from '../models/Restaurant';
import RestaurantRepository from '../repositories/RestaurantRepositoy';
export default class Restaurantervice {
	private readonly restaurantRepository: RestaurantRepository;
	constructor(repository: RestaurantRepository) {
		this.restaurantRepository = repository;
	}
	async findById(id: string): Promise<Restaurant | null> {
		return this.restaurantRepository.findById(id);
	}

	async createRestaurant(restaurantRequest: RestaurantCreationRequestDto): Promise<Restaurant> {
		const {main_head_id,restaurant_description,restaurant_name}=restaurantRequest
		const restaurant = new Restaurant(restaurant_name, restaurant_description, main_head_id);
		return this.restaurantRepository.createRestaurant(restaurant);
	}
	async deleteRestaurant(restaurant_id: string): Promise<void> {
		await this.restaurantRepository.deleteRestaurant(restaurant_id);
	}
}
