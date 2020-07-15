import { HOMEPAGE_DETAILS_FETCHED } from "./actions";

const initialState = {
  stories: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case HOMEPAGE_DETAILS_FETCHED:
      return { ...state, ...payload };

    default:
      return state;
  }
};
