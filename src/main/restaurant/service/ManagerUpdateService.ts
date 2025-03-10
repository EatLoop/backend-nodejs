
import UpdateManagerRequestDto from '../dto/UpdateManagerRequestDto';
import Location from '../models/Location';
import LocationRepository from '../repositories/LocationRepository';

export default class ManagerUpdateService {
	constructor(private readonly locationRepository: LocationRepository) {}

	async updateManager(updateManagerRequest: UpdateManagerRequestDto): Promise<Location> {
		const {managerId, location_id} = updateManagerRequest;
		const location = await this.locationRepository.findById(location_id);
		if (!location) throw new Error('Location not found');
		location.managerId = managerId;
		return this.locationRepository.updateManager(location);
	}
}