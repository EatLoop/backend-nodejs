
import Menu from '../models/Menu';
import MenuRepository from '../repositories/MenuRepository';

export default class MenuFindByIdService {
	constructor(private readonly menuRepository: MenuRepository) {}

	async findById(menuId: string): Promise<Menu | null> {
		return this.menuRepository.findById(menuId);
	}
}