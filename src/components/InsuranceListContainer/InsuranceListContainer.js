import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InsuranceListContainer.scss';
import Select from '../Select';
import InsuranceCard from '../InsuranceCard';

/**
 * associate select terms to their fields in the json data
 */
const SEARCH_TERMS = {
  match: 'card_order_best_match',
  price: 'card_order_price',
  rating: 'stars',
  atoz: 'card_order_a_to_z',
  ztoa: 'card_order_z_to_a',
};

/**
 * Component that handles state for the sort select
 * and the list of insurance cards
 *
 * @param     {Object}  props   component prosp
 * @returns   {JSX}     JSX component
 */
class InsuranceListContainer extends Component {
  // turn milliseconds into minutes. fixed to 2 decimal places
  static getMins(ms) {
    return (ms / 1000 / 60).toFixed(2); // ms -> sec -> min
  }
  // map over card objects and pass data to insurance card components
  static getCards(array) {
    return array.map(card => (
      <li key={card.name}>
        <InsuranceCard data={card} />
      </li>
    ));
  }
  constructor(props) {
    super(props);
    this.state = {
      sort: 'match',
    };
    // create bound version of handleSortChange
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  // change the sort state when the sort select's value changes
  handleSortChange(e) {
    // set the state
    this.setState({ sort: e.target.value });
  }
  // arrange cards based off of the current term stored in state
  sortCards() {
    return this.props.data.carrier_cards
      .sort((a, b) => {
        const term = SEARCH_TERMS[this.state.sort];
        const termA = a[term] && typeof a[term] === 'number' ? a[term] : 0;
        const termB = b[term] && typeof b[term] === 'number' ? b[term] : 0;
        if (termA > termB) {
          return 1;
        } else if (termA > termB) {
          return -1;
        }
        return 0;
      })
      .reverse();
  }
  render() {
    const cards = InsuranceListContainer.getCards(this.sortCards());
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.header}>
            <div className={s.stats}>
              You just compared
              <span className={s.highlight}>
                {' '}
                {this.props.data.carriers_searched} rates
              </span>{' '}
              in
              <span className={s.highlight}>
                {' '}
                {InsuranceListContainer.getMins(this.props.data.search_time)}
              </span>{' '}
              minutes!
            </div>
            <Select
              label="Sort By:"
              id="sort-insurance"
              options={{
                match: 'Best Match',
                price: 'By Price',
                rating: 'Rating',
                atoz: 'A - Z',
                ztoa: 'Z - A',
              }}
              handleChange={this.handleSortChange}
            />
          </div>
          <ul className={s.list}>{cards}</ul>
        </div>
      </div>
    );
  }
}

InsuranceListContainer.propTypes = {
  data: PropTypes.shape({
    coverage_option: PropTypes.string,
    carrier_cards: PropTypes.array,
    minimum_rate: PropTypes.number,
    carriers_searched: PropTypes.number,
    search_time: PropTypes.number,
  }),
};

InsuranceListContainer.defaultProps = {
  data: {},
};

export default withStyles(s)(InsuranceListContainer);
