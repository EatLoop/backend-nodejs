/** @format */

import Restaurant from '../models/Restaurant';
import MenuRepository from '../repositories/MenuRepository';
import RestaurantRepository from '../repositories/RestaurantRepository';
export type RestaurantCreationRequest = {
	restaurantName: string;
	restaurantDescription: string;
	mainHeadId: string;
};

export default class RestaurantCreationService {
	constructor(private readonly restaurantRepository: RestaurantRepository, private readonly menuRepository: MenuRepository) {}
	async createRestaurant(restaurantRequest: RestaurantCreationRequest): Promise<Restaurant> {
		const {mainHeadId: main_head_id, restaurantDescription: restaurant_description, restaurantName: restaurant_name} = restaurantRequest;
		const restaurant = new Restaurant(restaurant_name, restaurant_description, main_head_id);
		const savedRestaurant = await this.restaurantRepository.createRestaurant(restaurant);
		if (!savedRestaurant?.id) throw new Error('error');
		await this.menuRepository.createMenu(savedRestaurant.id);
		return savedRestaurant;
	}
}
