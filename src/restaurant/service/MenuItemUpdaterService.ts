/** @format */

import MenuItem from '../models/MenuItem';
import MenuItemRepository from '../repositories/MenuItemRepository';

export default class MenuItemUpdaterService {
	constructor(private readonly menuItemRepository: MenuItemRepository) {}

	async updateMenuItem(menuItem: Partial<MenuItem>): Promise<MenuItem> {
		return this.menuItemRepository.updateMenuItem(menuItem);
	}
}
