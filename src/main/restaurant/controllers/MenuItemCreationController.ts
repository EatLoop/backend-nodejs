/** @format */

import MenuItemCreationService from '../service/MenuItemCreationService';
import MenuItemCreationRequest from '../dto/MenuItemCreationRequestDto';
import MenuItem from '../models/MenuItem';

export default class MenuItemCreationController {
	constructor(private readonly service: MenuItemCreationService) {}

	async createMenuItem(menuItemRequest: MenuItemCreationRequest): Promise<MenuItem> {
		return this.service.createMenuItem(menuItemRequest);
	}
}