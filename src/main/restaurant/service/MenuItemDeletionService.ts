/** @format */

import MenuItemRemovalRequestDto from '../dto/MenuItemRemovalRequestDto';
import MenuItemRepository from '../repositories/MenuItemRepository';

export default class MenuItemDeletionService {
	constructor(private readonly menuItemRepository: MenuItemRepository) {}

	async deleteMenuItem(menuItem: MenuItemRemovalRequestDto, userId: string): Promise<void> {
		const {menuItemId} = menuItem;
		await this.menuItemRepository.deleteMenuItem(menuItemId);
	}
}