import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Btn } from '../../../../components/btn';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof AuthMenu.propTypes> {}

const AuthMenu = (props: Props) => {
  const history = useHistory();
  const classList = classNames('auth-menu', props.className);

  const createNewStory = () => {
    props.clearList();

    props.onClick();

    history.push('/edit-page');
  };

  return (
    <ul className={classList}>
      <li className="auth-menu__item">
        <Link
          className="auth-menu__btn auth-menu__link"
          to={`/user/${props.login}`}
          onClick={props.onClick}
        >
          My Info
        </Link>
      </li>

      <li className="auth-menu__item">
        <Btn
          className="auth-menu__btn"
          isText
          onClick={createNewStory}
        >
          New Story
        </Btn>
      </li>

      <li className="auth-menu__item">
        <Btn
          className="auth-menu__btn"
          isText
          onClick={props.handleSignOut}
        >
          Logout
        </Btn>
      </li>
    </ul>
  );
};

AuthMenu.propTypes = {
  className: PropTypes.string,
  login: PropTypes.string.isRequired,
  clearList: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export { AuthMenu }
