
import LocationCreationRequestDto from 'restaurant/dto/LocationCreationRequestDto';
import Location from 'restaurant/models/Location';
import RestaurantRepository from 'restaurant/repositories/RestaurantRepository';
import LocationRepository from '../repositories/LocationRepository';

export default class LocationCreationService {
    constructor(private readonly locationRepository: LocationRepository,
                private readonly restaurantRepository:RestaurantRepository
    ) {}

    async createLocation(requesterId:string,body:LocationCreationRequestDto): Promise<void> {
        const {address,city,state,openingHours,managerId,restaurantId}=body
        const restaurant =await this.restaurantRepository.findById(restaurantId);
        if(!restaurant || restaurant.main_head_id!=requesterId)
            throw new Error("Restaurant doesn't exist or user doesn't have enough permission")
        

        const location=new Location(address,city,state,managerId,restaurantId,requesterId,openingHours);
        await this.locationRepository.createLocation(location)
    }
}