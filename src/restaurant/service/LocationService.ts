

import Location from "../models/Location";
import LocationCreationRequestDto from "../dto/LocationCreationRequestDto";
import LocationRepository from "../repositories/LocationRepository";
import UpdateManagerRequestDto from "../dto/UpdateManagerRequestDto";

export default class LocationService {
      private readonly locationRepository: LocationRepository;

      constructor(locationRepository: LocationRepository) {
            this.locationRepository = locationRepository;
      }
      async createLocation(locationRequest: LocationCreationRequestDto): Promise<Location> {
            const {manager_id,restaurant_id,address,city,state}=locationRequest
            return this.locationRepository.createLocation(manager_id, restaurant_id, address, city, state);
      }
      async findLocationById(id: string): Promise<Location | null> {
            return this.locationRepository.findById(id);
      }
      async updateManager(updateManagerRequest:UpdateManagerRequestDto): Promise<Location> {
            const {manager_id,location_id}=updateManagerRequest
            return this.locationRepository.updateManager(manager_id,location_id)
      }
      async deleteLocation(location_id:string): Promise<void> {
            const location=await this.locationRepository.findById(location_id)
            if(!location)
                  throw new Error("Location not found")
            await this.locationRepository.deleteLocation(location)
      }
}