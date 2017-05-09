import { companyPriceActionTypes } from './price';
import { companyNewsActionTypes } from './news';
import { companyStatsActionTypes } from './stats';
import { companyDataActionTypes } from './info';

const actionTypes = {
  ...companyPriceActionTypes,
  ...companyNewsActionTypes,
  ...companyStatsActionTypes,
  ...companyDataActionTypes,
};

export default actionTypes;
