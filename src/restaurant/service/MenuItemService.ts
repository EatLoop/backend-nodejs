/** @format */

import MenuItemCreationRequest from '../dto/MenuItemCreationRequest';
import MenuItemRemovalRequestDto from '../dto/MenuItemRemovalRequestDto';
import MenuItem from '../models/MenuItem';
import MenuItemRepository from '../repositories/MenuItemRepository';

export default class MenuItemService {
	constructor(private readonly menuItemRepository: MenuItemRepository) {}

	async createMenuItem(menuItemRequest: MenuItemCreationRequest): Promise<MenuItem> {
		const {menuId, name, description, price, category} = menuItemRequest;
		const menuItem = new MenuItem(name, description, price, category,menuId);
		return this.menuItemRepository.createMenuItem(menuItem);
	}
	async deleteMenuItem(menuItem: MenuItemRemovalRequestDto): Promise<void> {
		const {menuItemId} = menuItem;
		await this.menuItemRepository.deleteMenuItem(menuItemId);
	}
	async updateMenuItem(menuItem: Partial<MenuItem>): Promise<MenuItem> {
		return this.menuItemRepository.updateMenuItem(menuItem);
	}
}
