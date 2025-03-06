/** @format */

export default class RestaurantCreationRequestDto {
	constructor(
            public readonly restaurant_name: string, 
            public readonly restaurant_description: string, 
            public readonly main_head_id: string){
            
      }
}