
import MenuCreationService from '../service/MenuCreationService';
import Menu from '../models/Menu';

export default class MenuCreationController {
	constructor(private readonly service: MenuCreationService) {}

	async createMenu(restaurant_id: string): Promise<Menu> {
		return this.service.createMenu(restaurant_id);
	}
}