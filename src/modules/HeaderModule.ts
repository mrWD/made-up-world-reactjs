import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Header } from '../views/header';

import * as authActions from '../actions/auth';
import * as storiesActions from '../actions/stories';

const mapStateToProps = (state: any) => ({
  authInfo: state.auth.authInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAuthInfo: bindActionCreators(authActions.getAuthInfo, dispatch),
  signUp: bindActionCreators(authActions.signUp, dispatch),
  signIn: bindActionCreators(authActions.signIn, dispatch),
  signOut: bindActionCreators(authActions.signOut, dispatch),
  clearList: bindActionCreators(storiesActions.clearList, dispatch),
});

export const HeaderModule = connect(mapStateToProps, mapDispatchToProps)(Header);
