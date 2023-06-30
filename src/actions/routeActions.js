import { CHANGE_ROUTE } from "./types";

export const changeRoute = route => dispatch => {
  dispatch({
    type: CHANGE_ROUTE,
    payload: route
  });
};
