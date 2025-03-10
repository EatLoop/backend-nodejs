
import Location from '../models/Location';
import LocationRepository from '../repositories/LocationRepository';

export default class LocationFinderByIdService {
	constructor(private readonly locationRepository: LocationRepository) {}

	async findLocationById(id: string): Promise<Location | null> {
		return this.locationRepository.findById(id);
	}
}