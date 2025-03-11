/** @format */

import MenuItemUpdaterService from '../service/MenuItemUpdaterService';
import MenuItem from '../models/MenuItem';

export default class MenuItemUpdaterController {
	constructor(private readonly service: MenuItemUpdaterService) {}

	async updateMenuItem(menuItem: Partial<MenuItem>): Promise<MenuItem> {
		return this.service.updateMenuItem(menuItem);
	}
}