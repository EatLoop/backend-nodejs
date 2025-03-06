
export default class LocationCreationRequestDto {
      constructor(
            public readonly address: string,
            public readonly city: string,
            public readonly state: string,
            public readonly manager_id: string,
            public readonly restaurant_id: string,
      ) {
            this.address=address
            this.city=city
            this.state=state
            this.manager_id=manager_id
            this.restaurant_id=restaurant_id
      }
}