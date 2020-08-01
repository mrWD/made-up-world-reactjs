import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { StoryList } from '../views/story-list';

import * as storiesActions from '../actions/stories';

const mapStateToProps = (state: any) => ({
  pageNumber: state.stories.pageNumber,
  pageCount: state.stories.pageCount,
  storyList: state.stories.storyList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getStoryList: bindActionCreators(storiesActions.getStoryList, dispatch),
});

export const StoryListModule = connect(mapStateToProps, mapDispatchToProps)(StoryList);
