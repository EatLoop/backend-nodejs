
class MenuItemRemovalRequestDto {
      constructor(
            public readonly menuItemId: string,
      ) {
            this.menuItemId = menuItemId;
      }
}

export default MenuItemRemovalRequestDto;