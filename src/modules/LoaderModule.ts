import { connect } from 'react-redux';

import { Loader } from '../views/loader';

const mapStateToProps = (state: any) => ({
  isLoading: state.requestStatus.isLoading,
});

export const LoaderModule = connect(mapStateToProps)(Loader);
