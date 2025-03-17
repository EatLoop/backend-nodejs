type LocationCreationRequestDto ={
    address: string;
    city: string;
    state: string;
    managerId: string;
    restaurantId: string;
    openingHours:Record<string,string>
}

export default LocationCreationRequestDto;