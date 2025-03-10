/** @format */

import RestaurantCreationRequestDto from '../dto/RestaurantCreationRequestDto';
import Restaurant from '../models/Restaurant';
import RestaurantRepository from '../repositories/RestaurantRepository';
export default class RestaurantCreationService {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async createRestaurant(restaurantRequest: RestaurantCreationRequestDto): Promise<Restaurant> {
		const {main_head_id, restaurant_description, restaurant_name} = restaurantRequest;
		const restaurant = new Restaurant(restaurant_name, restaurant_description, main_head_id);
		return this.restaurantRepository.createRestaurant(restaurant);
	}
}