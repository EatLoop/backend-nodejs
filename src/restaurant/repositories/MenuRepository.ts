
import { DataSource, Repository } from "typeorm";
import Menu from "../models/Menu";

export default class MenuRepository {
      private readonly menuRepository: Repository<Menu>;
      private constructor(menuRepository: Repository<Menu>) {
            this.menuRepository = menuRepository;
      }
      static async initialize(dataSource: DataSource): Promise<MenuRepository> {
            const menuRepository = dataSource.getRepository(Menu);
            return new MenuRepository(menuRepository);
      }

      async createMenu(restaurantId:string): Promise<Menu> {
            return this.menuRepository.save(new Menu(restaurantId));
      }

      async findById(menuId:string): Promise<Menu | null> {
            return this.menuRepository.findOne({where: {id: menuId}});
      }
}
