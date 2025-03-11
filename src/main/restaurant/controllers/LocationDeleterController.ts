
import LocationDeleterService from '../service/LocationDeleterService';

export default class LocationDeleterController {
	constructor(private readonly service: LocationDeleterService) {}

	async deleteLocation(location_id: string): Promise<void> {
		await this.service.deleteLocation(location_id);
	}
}