/** @format */

import MenuItemCreationRequest from '../dto/MenuItemCreationRequest';
import MenuItemRemovalRequestDto from '../dto/MenuItemRemovalRequestDto';
import MenuItem from '../models/MenuItem';
import MenuItemRepository from '../repositories/MenuItemRepository';

export default class MenuItemService {
	private readonly menuItemRepository: MenuItemRepository;
	constructor(menuItemRepository: MenuItemRepository) {
		this.menuItemRepository = menuItemRepository;
	}
	async createMenuItem(menuItem: MenuItemCreationRequest): Promise<MenuItem> {
		const {menuId, name, description, price, category} = menuItem;
		return this.menuItemRepository.createMenuItem(menuId, name, description, price, category);
	}
	async deleteMenuItem(menuItem: MenuItemRemovalRequestDto): Promise<void> {
		const {menuItemId} = menuItem;
		await this.menuItemRepository.deleteMenuItem(menuItemId);
	}
	async updateMenuItem(menuItem: Partial<MenuItem>): Promise<MenuItem> {
		return this.menuItemRepository.updateMenuItem(menuItem);
	}
}
