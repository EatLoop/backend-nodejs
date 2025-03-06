/** @format */

import MenuItemCreationRequest from '../dto/MenuItemCreationRequest';
import MenuItem from '../models/MenuItem';
import MenuItemRepository from '../repositories/MenuItemRepository';

export default class MenuItemCreationService {
	constructor(private readonly menuItemRepository: MenuItemRepository) {}

	async createMenuItem(menuItemRequest: MenuItemCreationRequest): Promise<MenuItem> {
		const {menuId, name, description, price, category} = menuItemRequest;
		const menuItem = new MenuItem(name, description, price, category, menuId);
		return this.menuItemRepository.createMenuItem(menuItem);
	}
}
