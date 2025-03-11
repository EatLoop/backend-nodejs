/** @format */

import MenuItemDeletionService from '../service/MenuItemDeletionService';
import MenuItemRemovalRequestDto from '../dto/MenuItemRemovalRequestDto';

export default class MenuItemDeletionController {
	constructor(private readonly service: MenuItemDeletionService) {}

	async deleteMenuItem(menuItem: MenuItemRemovalRequestDto): Promise<void> {
		await this.service.deleteMenuItem(menuItem);
	}
}