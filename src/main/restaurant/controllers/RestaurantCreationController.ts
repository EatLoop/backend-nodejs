/** @format */

import RestaurantCreationService from '../service/RestaurantCreationService';
import RestaurantCreationRequestDto from '../dto/RestaurantCreationRequestDto';
import Restaurant from '../models/Restaurant';
export default class RestaurantCreationController {
	constructor(private readonly service: RestaurantCreationService) {}

	async createRestaurant(restaurantRequest: RestaurantCreationRequestDto): Promise<Restaurant> {
		return this.service.createRestaurant(restaurantRequest);
	}
}