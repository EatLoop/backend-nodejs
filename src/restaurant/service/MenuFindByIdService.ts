/** @format */

import MenuRepository from '../repositories/MenuRepository';

export default class MenuFindByIdService {
	constructor(private readonly menuRepository: MenuRepository) {}

	async findByRestaurantId(menuId: string): Promise<string | undefined> {
		return this.menuRepository.findByRestaurantId(menuId);
	}
}
