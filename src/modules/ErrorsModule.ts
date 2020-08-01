import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Errors } from '../views/errors';

import * as requestActions from '../actions/requests';

const mapStateToProps = (state: any) => ({
  errors: state.requestStatus.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeError: bindActionCreators(requestActions.removeError, dispatch),
});

export const ErrorsModule = connect(mapStateToProps, mapDispatchToProps)(Errors);
