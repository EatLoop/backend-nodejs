

export default class MenuItemCreationRequest {
      constructor(
            public readonly name: string,
            public readonly price: number,
            public readonly menuId: string,
            public readonly description: string,
            public readonly category: string[],
      ) {}
}