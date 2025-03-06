/** @format */

import LocationRepository from '../repositories/LocationRepository';

export default class LocationDeleterService {
	constructor(private readonly locationRepository: LocationRepository) {}

	async deleteLocation(location_id: string): Promise<void> {
		const location = await this.locationRepository.findById(location_id);
		if (!location) throw new Error('Location not found');
		await this.locationRepository.deleteLocation(location);
	}
}
