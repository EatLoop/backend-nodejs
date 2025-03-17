/** @format */

import RestaurantRepository from '../repositories/RestaurantRepository';
export default class RestaurantDeletionService {
	constructor(private readonly restaurantRepository: RestaurantRepository) {}

	async deleteRestaurant(restaurant_id:string,userId:string): Promise<boolean> {
		const restaurant =await this.restaurantRepository.findById(restaurant_id);
        if(restaurant?.main_head_id==userId){
		    await this.restaurantRepository.deleteRestaurant(restaurant_id);
            return true
        }
        return false

	}
}