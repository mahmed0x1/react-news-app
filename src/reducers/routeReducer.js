import { CHANGE_ROUTE } from "../actions/types";

const initialState = {
  route: "news"
};

export default function routeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return {
        ...state,
        route: action.payload
      };
    default:
      return state;
  }
}
