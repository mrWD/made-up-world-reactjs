import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import PropTypes from 'prop-types';

import Logo from '../../assets/images/logo.svg';

import { Btn } from '../../components/btn';
import { Svgicon } from '../../components/svgicon/Svgicon';

import { Nav } from './nav';
import { Menu } from './menu';

import './index.sass';

interface State {
  isMobileMenuVisible: boolean;
}

interface Props extends PropTypes.InferProps<typeof propTypes> {}

const propTypes = {
  className: PropTypes.string,
  authInfo: PropTypes.shape({ login: PropTypes.string }).isRequired,
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  getAuthInfo: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired,
};

export class Header extends React.Component<Props, State> {
  propTypes = propTypes;

  constructor(props: Props) {
    super(props);

    this.state = {
      isMobileMenuVisible: false,
    };
  }

  componentDidMount() {
    this.props.getAuthInfo();
  }

  toggleMenu = (value?: boolean) => {
    this.setState({
      isMobileMenuVisible: typeof value === 'boolean' ? value : !this.state.isMobileMenuVisible,
    });
  }

  render() {
    const contentClass = classNames('header__content', {
      'header__content_visible': this.state.isMobileMenuVisible,
    });

    return (
      <header className="header">
        <div className="header__inner">
          <div className="header__logo-wrapper">
            <Link to="/">
              <img
                className="header__logo"
                src={Logo}
                alt="Made Up World Logo"
              />
            </Link>
          </div>

          <div className="header__mobile">
            <Btn onClick={this.toggleMenu}>
              <Svgicon icon={this.state.isMobileMenuVisible ? 'cross' : 'burger'}></Svgicon>
            </Btn>
          </div>

          <div className={contentClass}>
            <Nav className="header__nav" />

            <OutsideClickHandler onOutsideClick={() => this.toggleMenu(false)}>
              <Menu
                closeMenu={this.toggleMenu}
                authInfo={this.props.authInfo}
                clearList={this.props.clearList}
                signUp={this.props.signUp}
                signIn={this.props.signIn}
                signOut={this.props.signOut}
              />
            </OutsideClickHandler>
          </div>
        </div>
      </header>
    );
  }
}
