/** @format */

import LocationCreationRequestDto from '../dto/LocationCreationRequestDto';
import Location from '../models/Location';
import LocationRepository from '../repositories/LocationRepository';
import RestaurantRepository from '../repositories/RestaurantRepository';

export default class LocationCreationService {
	constructor(private readonly locationRepository: LocationRepository, private readonly restaurantRepository: RestaurantRepository) {}

	async createLocation(requesterId: string, body: LocationCreationRequestDto){
		const {address, city, state, openingHours, managerEmail, restaurantId} = body;
		const restaurant = await this.restaurantRepository.findById(restaurantId);
		if (!restaurant || restaurant.main_head_id != requesterId) throw new Error("Restaurant doesn't exist or user doesn't have enough permission");

		const location = new Location(address, city, state, managerEmail, restaurantId, requesterId, openingHours);
		return this.locationRepository.createLocation(location);
	}
}
