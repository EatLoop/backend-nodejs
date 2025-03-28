
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';
import MenuItem from '../models/MenuItem';
export default class MenuItemRepository {
	private constructor(private readonly menuItemRepository: Repository<MenuItem>) {}

	static async initialize(dataSource: DataSource): Promise<MenuItemRepository> {
		const menuItemRepository = dataSource.getRepository(MenuItem);
		return new MenuItemRepository(menuItemRepository);
	}
	async createMenuItem(menuItem:MenuItem): Promise<MenuItem> {
		return this.menuItemRepository.save(menuItem);
	}
	async deleteMenuItem(menuItemId: string): Promise<void> {
		await this.menuItemRepository.delete(menuItemId);
	}
	async updateMenuItem(menuItem: Partial<MenuItem>): Promise<MenuItem> {
		if (!menuItem.id) 
			throw new Error('Menu item ID is required for update');
		const {description, price, menuId,name} = menuItem;
		if (!(description ?? price ?? menuId ?? name)) 
			throw new Error('At least one field (description, price, menuId,name) is required for update');

		return this.menuItemRepository.save(menuItem);
	}
}