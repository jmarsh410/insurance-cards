/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Select.scss';
/* eslint-enable */

/**
 * Simple select element
 *
 * @param     {Object}  props   props for the select
 * @returns   {JSX}     JSX component
 */
const Select = props => {
  const options = Object.entries(props.options).map(keyVal => (
    <option key={keyVal[0]} value={keyVal[0]}>
      {keyVal[1]}
    </option>
  ));
  return (
    <label className={s.label} htmlFor={props.id}>
      {props.label}
      <div className={s.selectContainer}>
        <select
          className={s.select}
          onChange={props.handleChange}
          name={props.id}
          id={props.id}
        >
          {options}
        </select>
      </div>
    </label>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.string),
};

Select.defaultProps = {
  id: 'select',
  handleChange: () => {},
  label: 'Select',
  options: {},
};

export default withStyles(s)(Select);
