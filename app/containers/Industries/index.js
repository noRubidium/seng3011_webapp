import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import { load_industries } from 'actions/industries';

@connect((store) => {
  return {
    ...store.industries,
  };
})
export default class Industries extends LoadableComponent {
  constructor (props) {
    super(props);
    this.loaded_object = null;
    const { dispatch } = this.props;
    load_industries(dispatch);
  }

  render () {
    const { loaded } = this.props;
    console.log(this);
    if (loaded) {

      this.loaded_object = industries.industries.map((i) =>(<div>
        Some industry detail which get distributed...
        </div>));
    }
    return super.render();
  }
}
