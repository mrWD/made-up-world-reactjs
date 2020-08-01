import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof Nav.propTypes> {}

const Nav = (props: Props) => (
  <nav className={classNames('navigation', props.className)}>
    <ul className="navigation__list">
      <li className="navigation__el">
        <Link className="navigation__btn" to="/">Stories</Link>
      </li>

      <li className="navigation__el">
        <Link className="navigation__btn" to="/user-list">Users</Link>
      </li>
    </ul>
  </nav>
);

Nav.propTypes = {
  className: PropTypes.string,
};

export { Nav }
