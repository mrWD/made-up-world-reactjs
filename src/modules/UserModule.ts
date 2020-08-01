import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { User } from '../views/user';

import * as storiesActions from '../actions/stories';
import * as usersActions from '../actions/users';

const mapStateToProps = (state: any) => ({
  authInfo: state.auth.authInfo,

  userInfo: state.users.userInfo,
  destination: state.users.destination,

  storyList: state.stories.storyList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserInfo: bindActionCreators(usersActions.getUserInfo, dispatch),
  follow: bindActionCreators(usersActions.follow, dispatch),
  unfollow: bindActionCreators(usersActions.unfollow, dispatch),
  
  getStoryList: bindActionCreators(storiesActions.getStoryList, dispatch),
  removeStory: bindActionCreators(storiesActions.removeStory, dispatch),
  publishStory: bindActionCreators(storiesActions.publishStory, dispatch),
  unpublishStory: bindActionCreators(storiesActions.unpublishStory, dispatch),
});

export const UserModule = connect(mapStateToProps, mapDispatchToProps)(User);
