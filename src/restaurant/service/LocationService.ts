/** @format */

import LocationCreationRequestDto from '../dto/LocationCreationRequestDto';
import UpdateManagerRequestDto from '../dto/UpdateManagerRequestDto';
import Location from '../models/Location';
import LocationRepository from '../repositories/LocationRepository';

export default class LocationService {

	constructor(private readonly locationRepository: LocationRepository) {}
      
	async createLocation(locationRequest: LocationCreationRequestDto): Promise<Location> {
		const {managerId, restaurantId, address, city, state} = locationRequest;
		const location = new Location(address, city, state, managerId, restaurantId);
		return this.locationRepository.createLocation(location);
	}
	async findLocationById(id: string): Promise<Location | null> {
		return this.locationRepository.findById(id);
	}
	async updateManager(updateManagerRequest: UpdateManagerRequestDto): Promise<Location> {
		const {managerId, location_id} = updateManagerRequest;
		const location = await this.locationRepository.findById(location_id);
		if (!location) throw new Error('Location not found');
		location.managerId = managerId;
		return this.locationRepository.updateManager(location);
	}
	async deleteLocation(location_id: string): Promise<void> {
		const location = await this.locationRepository.findById(location_id);
		if (!location) throw new Error('Location not found');
		await this.locationRepository.deleteLocation(location);
	}
}
