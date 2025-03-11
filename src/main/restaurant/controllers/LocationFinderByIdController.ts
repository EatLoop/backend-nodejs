
import LocationFinderByIdService from '../service/LocationFinderByIdService';
import Location from '../models/Location';

export default class LocationFinderByIdcontroller {
	constructor(private readonly service: LocationFinderByIdService) {}

	async findLocationById(id: string): Promise<Location | null> {
		return this.service.findLocationById(id);
	}
}