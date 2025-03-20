/** @format */

type LocationCreationRequestDto = {
	address: string;
	city: string;
	state: string;
	managerEmail: string;
	restaurantId: string;
	openingHours: Record<string, string>;
};

export default LocationCreationRequestDto;
