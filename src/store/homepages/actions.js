import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_HOMEPAGES_SUCCESS = "FETCH_HOMEPAGES_SUCCESS";

export const fetchHomepagesSuccess = homepages => ({
  type: FETCH_HOMEPAGES_SUCCESS,
  payload: homepages,
});

export const fetchHomepages = () => {
  return async (dispatch, getState) => {
    const homepagesCount = getState().homepages.length;
    const response = await axios.get(
      `${apiUrl}/homepages?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${homepagesCount}`
    );

    // console.log(response.data);
    dispatch(fetchHomepagesSuccess(response.data.homepages.rows));
  };
};

// 1. its two function because of the thunk
// 2. we have an API call in this function
// 3. Instead of asserting on a return, we have to do so on a function call (dispatch).
