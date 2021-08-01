export function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SIDE_MENU":
      return {
        ...state,
        appShadow: !state.sideMenu.active,
        sideMenu: {
          ...state.sideMenu,
          active: !state.sideMenu.active
        }
      };
    case "CLICK_OUTSIDE_MENU":
      return {
        ...state,
        appShadow: false,
        sideMenu: {
          ...state.sideMenu,
          active: false
        }
      };
    case "SET_SIDE_MENU_INACTIVE":
      return {
        ...state,
        appShadow: false,
        sideMenu: {
          ...state.sideMenu,
          active: false
        }
      };

    default:
      throw new Error();
  }
}
