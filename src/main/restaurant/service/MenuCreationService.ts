
import Menu from '../models/Menu';
import MenuRepository from '../repositories/MenuRepository';
import RestaurantRepository from '../repositories/RestaurantRepository';

export default class MenuCreationService {
	constructor(private readonly menuRepository: MenuRepository,private readonly restaurantRepository:RestaurantRepository) {}

	async createMenu(restaurant_id: string, requesterId: string): Promise<Menu> {
		const ownerIdOfRestaurant=await this.restaurantRepository.findOwnerIdById(restaurant_id)
		if(!ownerIdOfRestaurant || ownerIdOfRestaurant!==requesterId)
			throw new Error('you are not the owner of the restaurant')
		return this.menuRepository.createMenu(restaurant_id);
	}
}