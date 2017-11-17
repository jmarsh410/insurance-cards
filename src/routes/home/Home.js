import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import InsuranceListContainer from '../../components/InsuranceListContainer';
import data from '../../data/carrier_cards.json';

const Home = () => (
  <div className={s.root}>
    <div className={s.container}>
      <InsuranceListContainer data={data} />
    </div>
  </div>
);

export default withStyles(s)(Home);
