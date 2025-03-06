/** @format */

export default class RestaurantCreationRequestDto {
	restaurant_name: string;
	restaurant_description: string;
	main_head_id: string;

	constructor(restaurant_name: string, restaurant_description: string, main_head_id: string){
            this.main_head_id=main_head_id
            this.restaurant_description=restaurant_description
            this.restaurant_name=restaurant_name
      }
}