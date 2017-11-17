/* eslint-env jest */
/* eslint-disable padded-blocks, no-unused-expressions */

/* eslint-disable */
import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';
import InsuranceCard from '../InsuranceCard';
/* eslint-enable */

configure({ adapter: new Adapter() });

const testCardAll = {
  type: 0,
  rate: 69.16666666666667,
  name: 'Elephant',
  tagline: 'Austin, TX could save up to 25% with Elephant®',
  features_html: [
    '<ul><li>Accidents happen, save with NO-reset guaranteed Diminishing Deductibles</li><li>Bundle Auto and Home or Renter for extra savings</li><li>Superior claims service 24/7 nationwide with local repair network</li><li>Manage your policy easily online</li></ul>',
  ],
  detail_body:
    "Texas Farm Bureau offers auto insurance that best suits their customers' needs, with competitive rates and the right coverage for how and where you drive.",
  features: [
    {
      group_id: 3,
      name: 'Local Agents',
      icon: 'IconFeaturesLocalAgent',
    },
    {
      group_id: 5,
      name: 'Mobile Claim Reporting',
      icon: 'IconFeaturesMobile',
    },
    {
      group_id: 10,
      name: 'Immediate Coverage',
      icon: 'IconFeaturesImmediateCoverage',
    },
    {
      group_id: 12,
      name: 'EFT Payments',
      icon: 'IconFeaturesAutomaticPayment',
    },
    {
      group_id: 13,
      name: 'Online ID Cards',
      icon: 'IconFeaturesOnlineIdCards',
    },
  ],
  card_order_best_match: 2,
  card_order_price: 0,
  card_order_a_to_z: 0,
  action: {
    link: 'example.com',
    link_text: 'Get Quote',
    type: 'TRACKING_LINK',
  },
  stars: 5,
  logo: '',
  no_rate_text: 'Unimplemented',
  card_order_z_to_a: 0,
};
const testCardNone = {
  type: 2,
  name: 'Elephant',
  tagline: 'Austin, TX could save up to 25% with Elephant®',
  card_order_best_match: 2,
  card_order_price: 0,
  card_order_a_to_z: 0,
  action: {
    link: 'example.com',
    link_text: 'Get Quote',
    type: 'TRACKING_LINK',
  },
  logo: '',
  no_rate_text: 'Unimplemented',
  card_order_z_to_a: 0,
};

// Some simple tests to make sure things are rendering at
// the appropriate time sine this component has lots
// of optional content
describe('InsuranceCard', () => {
  test('renders the image', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('img').length).toBe(1);
  });
  test('renders the name', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('.card-name').length).toBe(1);
  });
  test('renders stars if provided', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('.card-stars').children().length).toBe(5);
  });
  test('does not create stars if the stars property is left out', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardNone} />
      </App>,
    );
    expect(wrapper.find('.card-stars').children().length).toBe(0);
  });
  test('renders features if provided', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('.card-features').children().length).toBe(5);
  });
  test('does not create features if the features property is left out', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardNone} />
      </App>,
    );
    expect(wrapper.find('.card-features').children().length).toBe(0);
  });
  test('needs rate to show payment info', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('.card-payment').length).toBe(1);
  });
  test('do not show payment info if no rate propery', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardNone} />
      </App>,
    );
    expect(wrapper.find('.card-payment').length).toBe(0);
  });
  test('needs type that is not 2 to display a button', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('a').length).toBe(1);
  });
  test('do not show button if type is 2', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardNone} />
      </App>,
    );
    expect(wrapper.find('a').length).toBe(0);
  });
  test('displays a features list', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('.card-featuresList').length).toBe(1);
  });
  test('does not display feature list if none exist', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardNone} />
      </App>,
    );
    expect(wrapper.find('.card-featuresList').length).toBe(0);
  });
  test('displays a description', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardAll} />
      </App>,
    );
    expect(wrapper.find('.card-description').length).toBe(1);
  });
  test('does not display description if none exist', () => {
    const wrapper = mount(
      <App context={{ insertCss: () => {}, fetch: () => {} }}>
        <InsuranceCard data={testCardNone} />
      </App>,
    );
    expect(wrapper.find('.card-description').length).toBe(0);
  });
});
