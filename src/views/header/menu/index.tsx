import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';

import { Btn } from '../../../components/btn';

import { AuthMenu } from './auth-menu';
import { SignUp } from './sign-up';

import './index.sass';

interface State {
  isMenuVisible: boolean;
  formType: 'signin' | 'signup' | '';
}

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  className: PropTypes.string,
  authInfo: PropTypes.shape({ login: PropTypes.string }),
  closeMenu: PropTypes.func,
  signUp: PropTypes.func,
  signIn: PropTypes.func,
  signOut: PropTypes.func,
  clearList: PropTypes.func,
};

class Menu extends React.Component<PropTypes.InferProps<Props>, State> {
  static propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      isMenuVisible: false,
      formType: '',
    };
  }

  showAuth = (formType: 'signin' | 'signup' | '' = '') => {
    this.setState({ formType });
  }

  toggleMenu = (value: boolean) => {
    return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.preventDefault();

      this.setState({ isMenuVisible: value });
    };
  }

  get menuClass() {
    return classNames('menu', this.props.className);
  }

  get authMenuClass() {
    return classNames('menu__auth', {
      'menu__auth_visible': this.state.isMenuVisible,
    });
  }

  render() {
    if (this.props.authInfo) {
      return (
        <div className={this.menuClass}>
          <OutsideClickHandler onOutsideClick={this.toggleMenu(false)}>
            <Btn
              className="menu__tablet-btn"
              isText
              onClick={this.toggleMenu(!this.state.isMenuVisible)}
            >
              {this.props.authInfo.login}
            </Btn>

            <AuthMenu
              className={this.authMenuClass}
              login={this.props.authInfo.login}
              onClick={this.props.closeMenu}
              clearList={this.props.clearList}
              handleSignOut={this.props.signOut}
            />
          </OutsideClickHandler>
        </div>
      );
    }

    return (
      <div className={this.menuClass}>
        <Btn
          className="menu__btn"
          isText
          onClick={() => this.showAuth('signin')}
        >
          Sign In
        </Btn>

        <Btn
          className="menu__btn"
          isText
          onClick={() => this.showAuth('signup')}
        >
          Sign Up
        </Btn>

        { this.state.formType && (
          <OutsideClickHandler onOutsideClick={() => this.showAuth()}>
            <SignUp
              className="menu__sign-up"
              formType={this.state.formType}
              close={this.showAuth}
              signUp={this.props.signUp}
              signIn={this.props.signIn}
              signOut={this.props.signOut}
            />
          </OutsideClickHandler>
        )}
      </div>
    )
  }
}

export { Menu }
