
import { DataSource, Repository } from "typeorm";
import Location from "../models/Location";
export default class LocationRepository {
      private readonly locationRepository: Repository<Location>;

      private constructor(locationRepository: Repository<Location>) {
            this.locationRepository = locationRepository;
      }
      static async initialize(dataSource: DataSource): Promise<LocationRepository> {
            const locationRepository = dataSource.getRepository(Location);
            return new LocationRepository(locationRepository);
      }
      async createLocation(managerId:string,restaurantId:string,address:string,city:string,state:string): Promise<Location> {
            return this.locationRepository.save(new Location(address, city, state, managerId, restaurantId));
      }
      async findById(id: string): Promise<Location | null> {
            return this.locationRepository.findOne({where: {id}});
      }
      async updateManager(new_manager_id:string,location_id:string): Promise<Location> {
            const location=await this.findById(location_id)
            if(!location)
                  throw new Error("Location not found")
            location.managerId=new_manager_id
            return this.locationRepository.save(location)
      }
      async deleteLocation(location:Location): Promise<void> {
            if(!location?.id)
                  throw new Error("Location not found")
            await this.locationRepository.delete(location.id)
      }
}