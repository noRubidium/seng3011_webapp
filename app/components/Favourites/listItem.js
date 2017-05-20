import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from 'components/ListItem'

export default class CompanyListItem extends ListItem {
  getFirstColumn(title, content) {
    return(
      <div>
        <h4 className='related-company list-item-title'>{title}</h4>
      </div>
    );
  }
}
