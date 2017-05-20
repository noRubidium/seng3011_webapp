import { actionTypes: followActionTypes } from './follow';
import { actionTypes: loginActionTypes } from './login';
import { actionTypes: newsFeedActionTypes } from './news_feed';

const actionTypes = {
  ...newsFeedActionTypes,
  ...followActionTypes,
  ...loginActionTypes,
};

export default actionTypes;
