import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.scss';

/**
 * Footer component. Includes name and attribution for the generator
 */
function Footer() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <span>Made by Jered Marshall with </span>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/kriasoft/react-starter-kit"
        >
          React Starter Kit
        </a>
      </div>
    </div>
  );
}

export default withStyles(s)(Footer);
