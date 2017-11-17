import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';

/**
 * Header with title
 */
function Header() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div className={s.banner}>
          <h1 className={s.bannerTitle}>Insurance Cards</h1>
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Header);
