// refer to the counter action
import { async_action } from 'utils/asyncAction';

const INDUSTRIES_LOADING     = 'INDUSTRIES_LOADING';
const INDUSTRIES_LOADED      = 'INDUSTRIES_LOADED';
const INDUSTRIES_FAILED      = 'INDUSTRIES_FAILED';

export const actionTypes = {
  INDUSTRIES_LOADING,
  INDUSTRIES_LOADED,
  INDUSTRIES_FAILED
};

export function load_industries (dispatch) {
  async_action(
    {
      type: INDUSTRIES_LOADING,
    },
    INDUSTRIES_LOADED,
    dispatch,
    `url`,
    INDUSTRIES_FAILED
  );
}
