
import ManagerUpdateService from '../service/ManagerUpdateService';
import UpdateManagerRequestDto from '../dto/UpdateManagerRequestDto';
import Location from '../models/Location';

export default class ManagerUpdateController {
	constructor(private readonly service: ManagerUpdateService) {}

	async updateManager(updateManagerRequest: UpdateManagerRequestDto): Promise<Location> {
		return this.service.updateManager(updateManagerRequest);
	}
}