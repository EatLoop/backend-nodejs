/** @format */

import LocationCreationRequestDto from '../dto/LocationCreationRequestDto';
import Location from '../models/Location';
import LocationRepository from '../repositories/LocationRepository';

export default class LocationCreationService {
	constructor(private readonly locationRepository: LocationRepository) {}

	async createLocation(locationRequest: LocationCreationRequestDto): Promise<Location> {
		const {managerId, restaurantId, address, city, state} = locationRequest;
		const location = new Location(address, city, state, managerId, restaurantId);
		return this.locationRepository.createLocation(location);
	}
}
