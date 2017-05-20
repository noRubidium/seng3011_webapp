import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadableComponent from 'components/LoadableComponent';
import IndustryItem from 'components/Industry/listItem';
import { IndustryPercentage } from 'components/Industry/listItem';
import { load_industries } from 'actions/industries';

const data = [
  {
    title: 'Food',
    content: 'Consists of supermarket, meat, fish, poultry, fruit, vegetable, liquor, and other specialised food retailing.',
    change: '+5.89',
    id: 'Food'
  },
  {
    title: 'Department Store',
    content: 'Consists of units engaged in retailing a wide variety of goods, other than food or groceries. Including clothing, furniture, kitchenware, textile goods, electronic appliances, perfumes.',
    change: '+1.72',
    id: 'DepartmentStores'
  },
  {
    title: 'Cafes, Restaurants and Takeaway Food Services',
    content: 'Consists of units mainly engaged in providing food and beverage serving services for consumption on the premises, providing food services ready to be taken away for immediate consumption, and providing catering services at specified locations or events such as airline catering',
    change: '-0.43',
    id: 'CafesRestaurantsAndTakeawayFood'
  },
  {
    title: 'Clothing, Footwear, and Personal Accessory',
    content: 'Consists of units mainly engaged in retailing clothing, clothing accessories, retailing boots, shoes, other footwear, new watches, jewellery, and other personal accessories',
    change: '-2.36',
    id: 'ClothingFootwareAndPersonalAccessory'
  }
]


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
    const loaded = true;
    const industries = data;

    if (loaded) {

      this.loaded_object = industries.map((i) =>
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
