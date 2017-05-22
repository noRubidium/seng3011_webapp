import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import IndustryItem from 'components/Industry/listItem';
import { IndustryPercentage } from 'components/Industry/listItem';
import { load_industries } from 'actions/industries';
import industries from 'components/Industry/data';

@connect((store) => {
  return {
    ...store.industries,
  };
})
export default class Industries extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    /*const { dispatch } = this.props;
    load_industries(dispatch);*/
  }

  render () {
    const loaded = true;
    const sortedIndustries = industries.sort((a,b) => b.change - a.change);

    if (loaded) {

      this.loaded_object = sortedIndustries.map((i) =>
        <Link to={`/industry/${i.id}`}>
        <IndustryItem title={i.title}
                      content={i.content}
                      secondComponent={<IndustryPercentage content={i.change}/>}
        />
        </Link>
      );
    }
    return (
      <div>
        <div className='page-title'>Industries</div>
        {this.loaded_object}
      </div>
    )
  }
}
