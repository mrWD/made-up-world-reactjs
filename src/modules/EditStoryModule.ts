import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { EditStory } from '../views/edit-story';

import * as storiesActions from '../actions/stories';
import * as editingActions from '../actions/editing';

const mapStateToProps = (state: any) => ({
  pageList: state.stories.pageList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getStory: bindActionCreators(storiesActions.getStory, dispatch),
  saveStory: bindActionCreators(storiesActions.saveStory, dispatch),
  removeStory: bindActionCreators(storiesActions.removeStory, dispatch),
  publishStory: bindActionCreators(storiesActions.publishStory, dispatch),
  unpublishStory: bindActionCreators(storiesActions.unpublishStory, dispatch),

  removePage: bindActionCreators(editingActions.removePage, dispatch),
});

export const EditStoryModule = connect(mapStateToProps, mapDispatchToProps)(EditStory);
