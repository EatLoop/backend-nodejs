
import Menu from '../models/Menu';
import MenuRepository from '../repositories/MenuRepository';

export default class MenuCreationService {
	constructor(private readonly menuRepository: MenuRepository) {}

	async createMenu(restaurant_id: string): Promise<Menu> {
		return this.menuRepository.createMenu(restaurant_id);
	}
}