import { DataSource, Repository } from 'typeorm';
import Restaurant from '../models/Restaurant';
export default class RestaurantRepository {
    async existsById(restaurantId: string) {
        return this.restaurantRepository.existsBy({id:restaurantId})
    }
	private constructor(private readonly restaurantRepository: Repository<Restaurant>) {}

	static async initialize(dataSource: DataSource): Promise<RestaurantRepository> {
		const repository = dataSource.getRepository(Restaurant);
		return new RestaurantRepository(repository);
	}

	async findById(id: string): Promise<Restaurant | null> {
		return this.restaurantRepository.findOne({where: {id}});
	}

	async createRestaurant(restaurant: Partial<Restaurant>): Promise<Restaurant> {
		return this.restaurantRepository.save(restaurant);
	}
	async deleteRestaurant(restaurant_id: string): Promise<void> {
		await this.restaurantRepository.delete(restaurant_id);
	}
}