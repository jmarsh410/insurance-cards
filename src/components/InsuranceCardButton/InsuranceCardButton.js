/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InsuranceCardButton.scss';
/* eslint-enable */

/**
 * Button for insurance cards
 *
 * @param     {Object}  props   component props
 * @returns   {JSX}     JSX component
 */
const InsuranceCardButton = props => {
  const button =
    props.type === 0 || props.type === 1
      ? InsuranceCardButton.blueButton(`//${props.link}`)
      : InsuranceCardButton.orangeButton(`//${props.link}`);
  return button;
};

InsuranceCardButton.blueButton = link => (
  <a
    className={`${s.blue} ${s.button}`}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg className={s.btnIcon}>
      <use xlinkHref="symbol-defs.svg#icon-IconArrowDown" />
    </svg>
    Get Quote
  </a>
);

InsuranceCardButton.orangeButton = link => (
  <a
    className={`${s.orange} ${s.button}`}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg className={s.btnIcon}>
      <use xlinkHref="symbol-defs.svg#icon-IconBoltWhite" />
    </svg>
    Buy Now
  </a>
);

InsuranceCardButton.propTypes = {
  type: PropTypes.number,
  link: PropTypes.string,
};

InsuranceCardButton.defaultProps = {
  type: null,
  link: 'google.com',
};

export default withStyles(s)(InsuranceCardButton);
