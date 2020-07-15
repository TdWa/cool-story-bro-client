import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_HOMEPAGES_SUCCESS = "FETCH_HOMEPAGES_SUCCESS";

export const fetchHomepagesSuccess = (homepages) => ({
  type: FETCH_HOMEPAGES_SUCCESS,
  payload: homepages,
});

export const fetchHomepages = () => {
  return async (dispatch, getState) => {
    // checks the amount of homepages in the state
    const homepagesCount = getState().homepages.length;

    // we make a paginated request to out backend
    const response = await axios.get(
      `${apiUrl}/homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}`
    );

    // we want dispatch the homepages we get in the response to the redux store
    dispatch(fetchHomepagesSuccess(response.data.homepages.rows));
  };
};
