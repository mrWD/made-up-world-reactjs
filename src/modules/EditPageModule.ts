import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { EditPage } from '../views/edit-page';

import * as storiesActions from '../actions/stories';
import * as editingActions from '../actions/editing';

const mapStateToProps = (state: any) => ({
  pageList: state.stories.pageList,
  currentStory: state.stories.currentStory,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getStory: bindActionCreators(storiesActions.getStory, dispatch),
  savePage: bindActionCreators(editingActions.savePage, dispatch),
});

export const EditPageModule = connect(mapStateToProps, mapDispatchToProps)(EditPage);
