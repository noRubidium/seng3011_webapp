import { actionTypes: followActionTypes } from './follow';
import { actionTypes: newsFeedActionTypes } from './news_feed';

const actionTypes = {
  ...newsFeedActionTypes,
  ...followActionTypes,
};

export default actionTypes;
