
import LocationRepository from '../repositories/LocationRepository';

export default class LocationDeleterService {
	constructor(private readonly locationRepository: LocationRepository) {}

	async deleteLocation(location_id: string,requesterId:string): Promise<void> {
		const location = await this.locationRepository.findById(location_id);
		if (!location) throw new Error('Location not found');
		if(location.managerId!=requesterId && location.ownerId!=requesterId) throw new Error('Requester does not hae enough permission')
		await this.locationRepository.deleteLocation(location);
	}
}