import MenuFindByIdService from '../service/MenuFindByIdService';
import Menu from '../models/Menu';

export default class MenuFindByIdController {
	constructor(private readonly service: MenuFindByIdService) {}

	async findById(menuId: string): Promise<Menu | null> {
		return this.service.findById(menuId);
	}
}