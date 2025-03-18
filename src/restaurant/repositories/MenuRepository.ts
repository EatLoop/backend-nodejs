/** @format */

import {DataSource, Repository} from 'typeorm';
import Menu from '../models/Menu';

export default class MenuRepository {
	private constructor(private readonly menuRepository: Repository<Menu>) {}

	static async initialize(dataSource: DataSource): Promise<MenuRepository> {
		const menuRepository = dataSource.getRepository(Menu);
		return new MenuRepository(menuRepository);
	}

	async createMenu(restaurantId: string): Promise<Menu> {
		return this.menuRepository.save(new Menu(restaurantId));
	}

	async findByRestaurantId(menuId: string): Promise<string | undefined> {
		return (await this.menuRepository.findOne({where: {id: menuId}, select: ['id']}))?.id;
	}
}
