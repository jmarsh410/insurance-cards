/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

import React from 'react';
import { configure, mount } from 'enzyme';
// import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import InsuranceListContainer from './InsuranceListContainer';
import InsuranceCard from '../InsuranceCard';
import Select from '../Select';
import data from '../../data/carrier_cards.json';

configure({ adapter: new Adapter() });

describe('InsuranceListContainer', () => {
  test('converts ms to mins string', () => {
    expect(InsuranceListContainer.getMins(60000)).toBe('1.00');
  });

  test('creates a select', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceListContainer data={data} />
      </App>,
    );
    expect(wrapper.find(Select).length).toBe(1);
  });

  test('select has 5 options', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceListContainer data={data} />
      </App>,
    );
    expect(wrapper.find(Select).find('option').length).toBe(5);
  });

  // test('changing the select value causes a state change', () => {
  //   sinon.spy(InsuranceListContainer.prototype, 'handleSortChange');
  //   const wrapper = mount(
  //     <App context={{ insertCss: () => {}, fetch: () => {} }}>
  //       <InsuranceListContainer data={data} />
  //     </App>,
  //   );
  //   wrapper.find(Select).find('select').value = 'price';
  //   expect(InsuranceListContainer.prototype.handleSortChange.calledOnce).toBe(
  //     true,
  //   );
  // });

  test('creates cards', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceListContainer data={data} />
      </App>,
    );
    expect(wrapper.find(InsuranceCard).length).toBe(12);
  });
});
