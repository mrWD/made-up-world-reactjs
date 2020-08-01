import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { UserList } from '../views/user-list';

import * as usersActions from '../actions/users';

const mapStateToProps = (state: any) => ({
  destination: state.users.destination,
  pageCount: state.users.pageCount,
  pageNumber: state.users.pageNumber,
  userList: state.users.userList,
  authInfo: state.auth.authInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserList: bindActionCreators(usersActions.getUserList, dispatch),
  follow: bindActionCreators(usersActions.follow, dispatch),
});

export const UserListModule = connect(mapStateToProps, mapDispatchToProps)(UserList);
