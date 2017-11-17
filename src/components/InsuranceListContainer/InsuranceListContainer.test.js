/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

/* eslint-disable */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import InsuranceListContainer from './InsuranceListContainer';
import InsuranceCard from '../InsuranceCard';
import Select from '../Select';
import data from '../../data/carrier_cards.json';
/* eslint-enable */

configure({ adapter: new Adapter() });

describe('InsuranceListContainer', () => {
  test('converts ms to mins string', () => {
    expect(InsuranceListContainer.getMins(60000)).toBe('1.00');
  });

  test('getMins returns NaN with non-number arguments', () => {
    expect(InsuranceListContainer.getMins('hi')).toBe('NaN');
  });

  test('adds toggle property to objects in array', () => {
    const newArray = InsuranceListContainer.addToggleProperty([
      { test: 'test' },
      { test: 'test' },
    ]);
    expect(newArray.every(el => el.isOpen === false)).toBe(true);
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

  test('creates no cards with empty array', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceListContainer data={{ carrier_cards: [] }} />
      </App>,
    );
    expect(wrapper.find(InsuranceCard).length).toBe(0);
  });

  test('creates cards when provided', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceListContainer data={data} />
      </App>,
    );
    expect(wrapper.find(InsuranceCard).length).toBe(12);
  });
});
