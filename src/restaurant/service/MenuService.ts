/** @format */

import Menu from '../models/Menu';
import MenuRepository from '../repositories/MenuRepository';

export default class MenuService {
	private readonly menuRepository: MenuRepository;
	constructor(menuRepository: MenuRepository) {
		this.menuRepository = menuRepository;
	}

	async createMenu(restaurant_id: string): Promise<Menu> {
		return this.menuRepository.createMenu(restaurant_id);
	}

	async findById(menuId: string): Promise<Menu | null> {
		return this.menuRepository.findById(menuId);
	}
}
