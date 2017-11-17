/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InsuranceCard.scss';
import Button from '../InsuranceCardButton';
import placeholderLogo from '../../../public/logo-carrier-sm-default.png';
import '../../../public/symbol-defs.svg';
/* eslint-enable */

/**
 * Get an array of JSX star svgs
 *
 * @param     {Obj}      props   component props
 * @returns   {Array}    an array of star svg's
 */
function getStars(props) {
  if (props.data.stars && typeof props.data.stars === 'number') {
    const starArray = [];
    for (let i = 1; i < 6; i += 1) {
      if (props.data.stars && props.data.stars < i) {
        starArray.push(
          <svg key={i} className={s.starIcon}>
            <use xlinkHref="symbol-defs.svg#icon-IconStarWhite" />
          </svg>,
        );
      } else {
        starArray.push(
          <svg key={i} className={s.starIcon}>
            <use xlinkHref="symbol-defs.svg#icon-IconStarGold" />
          </svg>,
        );
      }
    }
    return starArray;
  }
  return null;
}

/**
 * Return all the feature icons
 *
 * @param     {Object}  props   component props
 * @returns   {Array}   Array of JSX elements
 */
function getFeatureIcons(props) {
  return props.data.features
    ? props.data.features.map(feature => {
        const iconName = `symbol-defs.svg#icon-${feature.icon}`;
        return (
          <span key={feature.name}>
            <svg className={s.featureIcon}>
              <use xlinkHref={iconName} />
            </svg>
          </span>
        );
      })
    : null;
}

/**
 * InsuranceCard Component. Displays information on an insurance company
 *
 * @param     {Object}  props   component prosp
 * @returns   {JSX}     JSX component
 */
const InsuranceCard = props => {
  const featureIcons = getFeatureIcons(props);
  const logo = props.data.logo || placeholderLogo;
  const stars = getStars(props);
  const rate = props.data.rate ? props.data.rate.toFixed(0) : null;
  const cornerTag = props.data.corner_tag ? (
    <div className={s.cornerTag}>
      <svg className={s.cornerIcon}>
        <use xlinkHref="symbol-defs.svg#icon-IconStarWhite" />
      </svg>
    </div>
  ) : null;
  const verified = props.data.tag ? (
    <span className={s.verified}>{props.data.tag}</span>
  ) : null;
  const payment = props.data.rate ? (
    <div className={`card-payment ${s.payment}`}>
      {verified}
      <span className={s.price}>
        <span className={s.dollar}>$</span>
        {rate}
      </span>
      <span className={s.month}>/mo</span>
    </div>
  ) : null;
  const button =
    props.data.type === 2 ? null : (
      <Button type={props.data.type} link={props.data.action.link} />
    );
  const featuresList =
    props.data.features_html && props.data.features_html.length > 0 ? (
      <div className={s.drawerSection}>
        <div className={s.drawerTitle}>
          <svg className={s.drawerIcon}>
            <use xlinkHref="symbol-defs.svg#icon-IconCarrierDefault" />
          </svg>
          Features
        </div>
        <div
          className="card-featuresList"
          dangerouslySetInnerHTML={{ __html: props.data.features_html[0] }}
        />
      </div>
    ) : null;
  const description = props.data.detail_body ? (
    <div className={s.drawerSection}>
      <div className={s.drawerTitle}>
        <svg className={s.drawerIcon}>
          <use xlinkHref="symbol-defs.svg#icon-IconCarrierDefault" />
        </svg>
        Why {props.data.name}?
      </div>
      <p className="card-description">{props.data.detail_body}</p>
    </div>
  ) : null;

  return (
    <div
      className={`card-container ${s.container}`}
      data-open={props.data.isOpen}
    >
      {cornerTag}
      <div className={s.main}>
        <div className={s.imageNameContainer}>
          <div className={s.image}>
            <img alt={`Logo for ${props.data.name}`} src={logo} />
          </div>
          <div>
            <h2 className={`card-name ${s.name}`}>{props.data.name}</h2>
            <div className={s.starFeatureContainer}>
              <div className={`card-stars ${s.stars}`}>{stars}</div>
              <div className={`card-features ${s.features}`}>
                {featureIcons}
              </div>
            </div>
          </div>
        </div>
        <div className={s.details}>
          {payment}
          {button}
        </div>
      </div>
      <div className={s.drawer}>
        {featuresList}
        {description}
      </div>
      <button onClick={props.clickHandler} className={s.drawerButton}>
        <svg className={s.drawerIcon}>
          <use xlinkHref="symbol-defs.svg#icon-IconChevronDown" />
        </svg>
      </button>
    </div>
  );
};

InsuranceCard.propTypes = {
  clickHandler: PropTypes.func,
  data: PropTypes.shape({
    corner_tag: PropTypes.bool,
    name: PropTypes.string,
    features: PropTypes.array,
    features_html: PropTypes.array,
    logo: PropTypes.string,
    stars: PropTypes.number,
    rate: PropTypes.number,
    type: PropTypes.number,
    action: PropTypes.shape({
      link: PropTypes.string,
      link_text: PropTypes.string,
      type: PropTypes.string,
    }),
    detail_body: PropTypes.string,
    tag: PropTypes.string,
    isOpen: PropTypes.bool,
  }),
};

InsuranceCard.defaultProps = {
  clickHandler: null,
  data: {},
};

export default withStyles(s)(InsuranceCard);
