/** @format */

import RestaurantFindByIdService from '../service/RestaurantFindByIdService';
import Restaurant from '../models/Restaurant';

export default class RestaurantFindByIdController {
	constructor(private readonly service: RestaurantFindByIdService) {}
	async findById(id: string): Promise<Restaurant | null> {
		return this.service.findById(id);
	}
}