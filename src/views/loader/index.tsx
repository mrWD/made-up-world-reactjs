import React from 'react';
import PropTypes from 'prop-types';

import './index.sass';

interface Props extends PropTypes.InferProps<typeof Loader.propTypes> {}

const Loader = (props: Props) => {
  if (!props.isLoading) {
    return null;
  }

  return (
    <div className="loader">
      <div className="loader__img"></div>
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

Loader.defaultProps = {
  isLoading: false,
};

export { Loader }
