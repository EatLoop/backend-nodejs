/** @format */

import UpdateManagerRequestDto from '../dto/UpdateManagerRequestDto';
import Location from '../models/Location';
import LocationRepository from '../repositories/LocationRepository';

export default class ManagerUpdateService {
	constructor(private readonly locationRepository: LocationRepository) {}

	async updateManager(updateManagerRequest: UpdateManagerRequestDto, requesterId: string): Promise<Location> {
		const {managerId, locationId: location_id} = updateManagerRequest;
		const location = await this.locationRepository.findById(location_id);
		if (!location) throw new Error('Location not found');
		if (location.managerEmail == requesterId || location.ownerId == requesterId) throw new Error('not enogh authourity');
		location.managerEmail = managerId;
		return this.locationRepository.updateManager(location);
	}
}
