import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Story } from '../views/story';

import * as storiesActions from '../actions/stories';

const mapStateToProps = (state: any) => ({
  currentStory: state.stories.currentStory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getStory: bindActionCreators(storiesActions.getStory, dispatch),
});

export const StoryModule = connect(mapStateToProps, mapDispatchToProps)(Story);
