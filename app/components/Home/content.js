import React from 'react';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import SearchBar from 'components/SearchBar';
import HomeContentTile from './contentTile';
import { load_companies } from 'actions/home';


// @connect((store) => {
//   return store.home.companies;
// })
export default class HomeContent extends React.Component {

  constructor (props) {
    super(props);
    // const { dispatch } = this.props;
    // load_companies(dispatch);
  }

  render () {
    // const { companies } = this.props;
    // const companyList = companies.map((c) => <HomeContentTile company={c}/>)
    // this.loaded_object = (<div>
    //   <SearchBar />
    //   {/*}<div className='company-tiles'>
    //     {companyList}
    //   </div>*/}
    // </div>);
    return <SearchBar />; //super.render();
  }
}
