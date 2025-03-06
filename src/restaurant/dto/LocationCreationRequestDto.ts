/** @format */

export default class LocationCreationRequestDto {
	constructor(public readonly address: string,
		 public readonly city: string,
		 public readonly state: string, 
		 public readonly managerId: string, 
		 public readonly restaurantId: string) {}
}
