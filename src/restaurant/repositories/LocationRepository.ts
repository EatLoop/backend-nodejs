
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
      async createLocation(location:Location): Promise<Location> {
            return this.locationRepository.save(location);
      }
      async findById(id: string): Promise<Location | null> {
            return this.locationRepository.findOne({where: {id}});
      }
      async updateManager(location:Location): Promise<Location> {
            return this.locationRepository.save(location)
      }
      async deleteLocation(location:Location): Promise<void> {
            if(!location?.id)
                  throw new Error("Location not found")
            await this.locationRepository.delete(location.id)
      }
}