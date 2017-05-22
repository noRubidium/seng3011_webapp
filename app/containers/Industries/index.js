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
      change: '+0.18',
      id: 'Food'
    },
    {
      title: 'Household Goods',
      content: 'Consists of units engaged in the purchase through (non)traditional means of products used in households, such as appliances, books, clothing, furnishings, and furniture.',
      change: '-2.06',
      id: 'HouseholdGood'
    },
    {
      title: 'Department Store',
      content: 'Consists of units engaged in retailing a wide variety of goods, other than food or groceries. Including clothing, furniture, kitchenware, textile goods, electronic appliances and perfumes.',
      change: '-5.49',
      id: 'DepartmentStores'
    },
    {
      title: 'Cafes, Restaurants and Takeaway Food Services',
      content: 'Consists of units mainly engaged in providing food and beverage serving services for consumption on the premises, providing food services ready to be taken away for immediate consumption, and providing catering services at specified locations or events such as airline catering.',
      change: '+2.31',
      id: 'CafesRestaurantsAndTakeawayFood'
    },
    {
      title: 'Clothing, Footwear, and Personal Accessory',
      content: 'Consists of units mainly engaged in retailing clothing, clothing accessories, retailing boots, shoes, other footwear, new watches, jewellery, and other personal accessories.',
      change: '-2.49',
      id: 'ClothingFootwareAndPersonalAccessory'
    },
    {
      title: 'Other',
      content: 'Consists of units engaged in items that cannot be classified by categories above.',
      change: '-0.80',
      id: 'Other'
    },
    {
      title: 'Food and Live Animals',
      content: 'Consists of units mainly engaged in fresh and processed foods, and live animal products including meats and other agricultural/animal materials.',
      change: '+13.46',
      id: 'FoodAndLiveAnimals'
    },
    {
      title: 'Beverages and Tobacco',
      content: 'Consists of units for tobacco products, cigarettes and beverages including hot drinks, soft drinks and alcoholic drinks.',
      change: '+7.26',
      id: 'BeveragesAndTobacco'
    },
    {
      title: 'Mineral, Fuel, Lubricant and Related Material',
      content: 'Consists of units for all mineral, fuel, lubricant exports and any related material under mining.',
      change: '+53.22',
      id: 'MineralFuelLubricantAndRelatedMaterial'
    },
    {
      title: 'Chemicals and Related Products',
      content: 'Consists of units for chemical products including medicaments, petrochemicals, beauty and make-up preps for skin and other chemical products.',
      change: '-8.01',
      id: 'ChemicalsAndRelatedProducts'
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
