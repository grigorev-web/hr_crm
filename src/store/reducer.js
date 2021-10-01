



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
      case "ONLOAD_TABLE":
        return {
          ...state,
          appShadow: false,
          persons: action.persons,
          sideMenu: {
            ...state.sideMenu,
            active: false
          }
        };
        case "FETCH_MORE_PERSONS":
        //console.log(state.persons);
          return {
            ...state,
            persons: state.persons.concat(action.persons)
          };
          case "SET_SIDE_INFO_ACTIVE":
            return {
              ...state,
              sideInfo:{
                ...state.sideInfo,
                active: true,
                id:action.id,
                side: action.side
              }
            };
            case "SET_SIDE_INFO_INACTIVE":
              return {
                ...state,
                sideInfo:{
                  ...state.sideInfo,
                  active: false,
                  side:'',
                }
              };
            case "SET_SIDE_INFO_LOADING":
                return {
                  ...state,
                  sideInfo:{
                    ...state.sideInfo,
                    loading: action.loading,
                  }
                };
              case "SET_SIDE_INFO_TIMER":
                  return {
                    ...state,
                    sideInfo:{
                      ...state.sideInfo,
                      timer: action.timer,
                    }
                };
                case "SIDE_INFO_SET_HISTORY":
                    return {
                      ...state,
                      sideInfo:{
                        ...state.sideInfo,
                        history: action.history,
                      }
                  };
                case "SET_SELECTED_PERSON":

                    return {
                      ...state,
                      persons: state.persons.map( (person) =>{
                        if(person.id === action.id) {

                          person.selected = !action.selected;
                        }
                        return person;
                      }),
                    };

                case "CLEAR_SELECTED_PERSONS":

                      return {
                        ...state,
                        persons: state.persons.map( (person) =>{
                            person.selected = false;
                            return person;
                        }),
                      };
                case "LOGOUT":
                        return {
                          ...state,
                          login: false
                        };
                case "LOGIN":

                        return {
                            ...state,
                            login: action.login,
                            role: action.role
                            };
                case "SHOW_MODAL_TIME":
                        return {
                            ...state,
                            modalTime: true,
                            modalTimeID: action.id,
                            modalTimePhone: action.phone,
                            modalStatus: action.status,
                            modalOldStatus: action.oldStatus
                        };
                case "HIDE_MODAL_TIME":
                        return {
                            ...state,
                            modalTime: false
                        };
                case "SET_CANDIDATES":
                        return{
                          ...state,
                          candidates: action.candidates
                        }

                case "SHOW_CHANGE_HR":
                          return{
                            ...state,
                            modalChangeHR: {
                              ...state.modalChangeHR,
                              show:true,
                            }
                          }
                case "CLOSE_CHANGE_HR":
                        return{
                          ...state,
                          modalChangeHR: {
                            ...state.modalChangeHR,
                            show:false,
                          }
                        }


    default:
      throw new Error();
  }
}
